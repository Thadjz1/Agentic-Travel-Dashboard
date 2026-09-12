// Displays a "YYYY-MM-DD" date string as "M/D/YYYY".
// Parsed as plain text (not `new Date(...)`) so it can't shift by a day
// depending on the viewer's timezone.
export function formatDate(dateString) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split("-");
  return `${Number(month)}/${Number(day)}/${year}`;
}

// Subtracts `weeks` from a "YYYY-MM-DD" string, returning a "YYYY-MM-DD"
// string. Uses a fixed UTC time internally so it can't drift a day from
// the viewer's timezone.
export function subtractWeeks(dateString, weeks) {
  const time = new Date(`${dateString}T12:00:00Z`).getTime();
  const result = new Date(time - weeks * 7 * 24 * 60 * 60 * 1000);
  return result.toISOString().slice(0, 10);
}

// Whole days from today until `dateString` (negative if it's in the past).
export function daysUntil(dateString) {
  const todayNum = new Date(`${new Date().toISOString().slice(0, 10)}T12:00:00Z`).getTime();
  const targetNum = new Date(`${dateString}T12:00:00Z`).getTime();
  return Math.round((targetNum - todayNum) / (24 * 60 * 60 * 1000));
}
