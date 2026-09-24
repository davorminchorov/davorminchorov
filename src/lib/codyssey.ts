// The latest Codyssey writing, fetched at build time for the homepage's Talks &
// Writing section. The Codyssey API only allows CORS requests from
// codyssey.dev, so a browser-side fetch from this domain would be blocked.
// Fetching here avoids that and gives crawlers real links. The deploy workflow
// runs on a daily schedule so newly published content shows up without a push.

const PROFILE_URL = 'https://core.codyssey.dev/api/author-profiles/davor-minchorov';

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
}

export interface WritingItem {
  title: string;
  date: Date;
  href: string;
  type: string;
}

// A Codyssey outage should not take the whole deploy down (the workflow
// also rebuilds daily on a schedule). Fall back to an empty list and warn.
const loadProfile = async (): Promise<CodysseyProfile> => {
  try {
    const res = await fetch(PROFILE_URL, { headers: { Accept: 'application/json' } });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return ((await res.json()) as { data?: CodysseyProfile }).data ?? {};
  } catch (error) {
    console.warn(`Codyssey author profile request failed, rendering without writing: ${error}`);
    return {};
  }
};

const mapItems = (arr: CodysseyItem[] | undefined, type: string, pathPrefix: string): WritingItem[] =>
  (arr ?? [])
    .filter((item) => item.published)
    .map((item) => ({
      title: item.title,
      date: new Date(item.publish_date),
      href: `https://codyssey.dev/${pathPrefix}/${item.slug}`,
      type,
    }));

let cached: Promise<WritingItem[]> | undefined;

// The 10 newest published items, newest first.
export const latestWriting = () =>
  (cached ??= loadProfile().then((profile) =>
    [
      ...mapItems(profile.author_courses, 'Course', 'courses'),
      ...mapItems(profile.author_insights, 'Insight', 'insights'),
      ...mapItems(profile.author_learning_paths, 'Learning Path', 'learning-paths'),
      ...mapItems(profile.author_code_reviews, 'Code Review', 'code-reviews'),
      ...mapItems(profile.author_quick_tips, 'Quick Tip', 'quick-tips'),
    ]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10),
  ));

export const formatWritingDate = (date: Date) =>
  date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
