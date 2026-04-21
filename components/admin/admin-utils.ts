export const monthToIndex: Record<string, number> = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatStorageDate(date: Date) {
  return date
    .toLocaleDateString("en-US", { month: "short", day: "2-digit" })
    .toUpperCase()
    .replace(",", "");
}

export function formatDisplayDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function parseStoredEventDate(date: string, year: string): Date | undefined {
  const [month, day] = date.trim().toUpperCase().split(/\s+/);

  if (!month || !day || !(month in monthToIndex)) {
    return undefined;
  }

  const yearNumber = Number.parseInt(year.trim(), 10);
  const dayNumber = Number.parseInt(day, 10);

  if (!Number.isFinite(yearNumber) || !Number.isFinite(dayNumber)) {
    return undefined;
  }

  return new Date(yearNumber, monthToIndex[month], dayNumber);
}
