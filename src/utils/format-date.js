// Displays a "YYYY-MM-DD" date string as "M/D/YYYY".
// Parsed as plain text (not `new Date(...)`) so it can't shift by a day
// depending on the viewer's timezone.
export function formatDate(dateString) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split("-");
  return `${Number(month)}/${Number(day)}/${year}`;
}
