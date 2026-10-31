// Codyssey writing, fetched at build time for the homepage's Talks & Writing
// section and the /writing page. The Codyssey API only allows CORS requests
// from codyssey.dev, so a browser-side fetch from this domain would be
// blocked. Fetching here avoids that and gives crawlers real links. A daily
// cron in wrangler.toml rebuilds the site so newly published content shows up
// without a push.

const API_URL = 'https://core.codyssey.dev/api';
const SITE_URL = 'https://codyssey.dev';
const PROFILE_URL = `${API_URL}/author-profiles/davor-minchorov`;

interface CodysseyItem {
  title: string;
  slug: string;
  publish_date: string;
  published: boolean;
}

interface CodysseyProfile {
  author_courses?: CodysseyItem[];
  author_insights?: CodysseyItem[];
  author_learning_paths?: CodysseyItem[];
  author_code_reviews?: CodysseyItem[];
  author_quick_tips?: CodysseyItem[];
  author_projects?: CodysseyItem[];
}

interface CodysseyLesson {
  title: string;
  slug: string;
  status: string;
  publish_date: string;
}

interface CodysseyCourse {
  course_chapters?: {
    title: string;
    status: string;
    publish_date: string;
    course_chapter_lessons?: CodysseyLesson[];
  }[];
}

export interface WritingItem {
  title: string;
  date: Date;
  href: string;
  type: string;
}

export interface CourseChapter {
  title: string;
  lessons: WritingItem[];
}

export interface CourseWriting extends WritingItem {
  chapters: CourseChapter[];
}

export interface WritingGroup {
  heading: string;
  items: WritingItem[];
}

export interface AllWriting {
  courses: CourseWriting[];
  groups: WritingGroup[];
}

// A Codyssey outage should not take the whole deploy down (the site also
// rebuilds daily). Fall back to an empty result and warn.
const fetchJson = async <T>(url: string, fallback: T, what: string): Promise<T> => {
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return ((await res.json()) as { data?: T }).data ?? fallback;
  } catch (error) {
    console.warn(`Codyssey ${what} request failed, rendering without it: ${error}`);
    return fallback;
  }
};

let profile: Promise<CodysseyProfile> | undefined;
const loadProfile = () => (profile ??= fetchJson<CodysseyProfile>(PROFILE_URL, {}, 'author profile'));

// Scheduled entries can carry a future date; only list what is live at build time.
const isLive = (date: string) => new Date(date).getTime() <= Date.now();
const isPublished = (item: CodysseyItem) => item.published && isLive(item.publish_date);

const toItem = (item: CodysseyItem, type: string, pathPrefix: string): WritingItem => ({
  title: item.title,
  date: new Date(item.publish_date),
  href: `${SITE_URL}/${pathPrefix}/${item.slug}`,
  type,
});

const mapItems = (arr: CodysseyItem[] | undefined, type: string, pathPrefix: string): WritingItem[] =>
  (arr ?? []).filter(isPublished).map((item) => toItem(item, type, pathPrefix));

const newestFirst = (a: WritingItem, b: WritingItem) => b.date.getTime() - a.date.getTime();

let latest: Promise<WritingItem[]> | undefined;

// The 10 newest published items, newest first.
export const latestWriting = () =>
  (latest ??= loadProfile().then((data) =>
    [
      ...mapItems(data.author_courses, 'Course', 'courses'),
      ...mapItems(data.author_insights, 'Insight', 'insights'),
      ...mapItems(data.author_learning_paths, 'Learning Path', 'learning-paths'),
      ...mapItems(data.author_code_reviews, 'Code Review', 'code-reviews'),
      ...mapItems(data.author_quick_tips, 'Quick Tip', 'quick-tips'),
    ]
      .sort(newestFirst)
      .slice(0, 10),
  ));

// The author profile lists courses but not their lessons, so each course is
// fetched on its own. A failed course fetch still lists the course itself.
const loadCourse = async (course: CodysseyItem): Promise<CourseWriting> => {
  const data = await fetchJson<CodysseyCourse>(`${API_URL}/courses/${course.slug}`, {}, `course ${course.slug}`);
  const chapters = (data.course_chapters ?? [])
    .filter((chapter) => chapter.status === 'published' && isLive(chapter.publish_date))
    .map((chapter) => ({
      title: chapter.title,
      lessons: (chapter.course_chapter_lessons ?? [])
        .filter((lesson) => lesson.status === 'published' && isLive(lesson.publish_date))
        .map((lesson) => ({
          title: lesson.title,
          date: new Date(lesson.publish_date),
          href: `${SITE_URL}/courses/${course.slug}/${lesson.slug}`,
          type: 'Lesson',
        })),
    }))
    .filter((chapter) => chapter.lessons.length > 0);
  return { ...toItem(course, 'Course', 'courses'), chapters };
};

let all: Promise<AllWriting> | undefined;

// Everything published, for the /writing page. Courses run oldest first so a
// series reads in order; every other group is newest first.
export const allWriting = () =>
  (all ??= loadProfile().then(async (data) => {
    const courses = await Promise.all((data.author_courses ?? []).filter(isPublished).map(loadCourse));
    courses.sort((a, b) => a.date.getTime() - b.date.getTime());

    const groups: WritingGroup[] = [
      { heading: 'Insights', items: mapItems(data.author_insights, 'Insight', 'insights') },
      { heading: 'Code Reviews', items: mapItems(data.author_code_reviews, 'Code Review', 'code-reviews') },
      { heading: 'Quick Tips', items: mapItems(data.author_quick_tips, 'Quick Tip', 'quick-tips') },
      { heading: 'Learning Paths', items: mapItems(data.author_learning_paths, 'Learning Path', 'learning-paths') },
      { heading: 'Guided Projects', items: mapItems(data.author_projects, 'Guided Project', 'projects') },
    ].map((group) => ({ ...group, items: group.items.sort(newestFirst) }));

    return { courses, groups: groups.filter((group) => group.items.length > 0) };
  }));

export const formatWritingDate = (date: Date) =>
  date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
