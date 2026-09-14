// Small helpers shared by the homepage sections and the CV page so the two
// never disagree on dates or on the years-of-experience figure.

// First professional role started June 2015. The figure is computed at build
// time, and the deploy workflow rebuilds the site daily, so it stays current.
const CAREER_START = { year: 2015, month: 6 };

export const yearsOfExperience = (now = new Date()) =>
  now.getUTCFullYear() - CAREER_START.year - (now.getUTCMonth() + 1 < CAREER_START.month ? 1 : 0);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "2023-08" -> "Aug 2023", "2023" -> "2023", null -> "Present"
export const formatMonth = (value: string | null) => {
  if (!value) return 'Present';
  const [year, month] = value.split('-');
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
};

// Stable display order for skill groups; groups not listed fall to the end.
const SKILL_CATEGORY_ORDER = ['Core', 'Architecture', 'Also comfortable with'];

const skillOrderOf = (category: string) => {
  const index = SKILL_CATEGORY_ORDER.indexOf(category);
  return index === -1 ? SKILL_CATEGORY_ORDER.length : index;
};

export const sortSkillGroups = <T extends { data: { category: string; items: string[] } }>(groups: T[]) =>
  groups
    .filter((group) => group.data.items.length > 0)
    .sort((a, b) => skillOrderOf(a.data.category) - skillOrderOf(b.data.category));
