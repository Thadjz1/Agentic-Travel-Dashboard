import Link from "next/link";

// Appending a fixed UTC time avoids the classic bug where parsing a plain
// "YYYY-MM-DD" string rolls the date back a day in negative-UTC timezones.
function toDateNum(dateString) {
  return new Date(`${dateString}T12:00:00Z`).getTime();
}

export default function Timeline({ trips }) {
  if (!trips || trips.length === 0) return null;

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayNum = toDateNum(todayStr);

  const allDates = trips.flatMap((trip) => [
    toDateNum(trip.arrival_date),
    toDateNum(trip.departure_date),
  ]);
  allDates.push(todayNum);

  let rangeStart = Math.min(...allDates);
  let rangeEnd = Math.max(...allDates);

  const oneDay = 24 * 60 * 60 * 1000;
  if (rangeEnd - rangeStart < oneDay * 30) {
    rangeEnd = rangeStart + oneDay * 30;
  }
  const padding = (rangeEnd - rangeStart) * 0.08;
  rangeStart -= padding;
  rangeEnd += padding;

  function percentFor(dateNum) {
    return ((dateNum - rangeStart) / (rangeEnd - rangeStart)) * 100;
  }

  return (
    <div className="mb-10">
      <h2 className="mb-8 font-medium">Timeline</h2>
      <div className="relative h-px bg-black/20">
        <div
          className="absolute top-0 flex -translate-x-1/2 -translate-y-full flex-col items-center"
          style={{ left: `${percentFor(todayNum)}%` }}
        >
          <span className="mb-1 text-xs text-black/60">Today</span>
          <div className="h-3 w-px bg-black" />
        </div>

        {trips.map((trip) => (
          <Link
            key={trip.id}
            href={`/dashboard/trips/${trip.id}`}
            className="absolute top-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${percentFor(toDateNum(trip.arrival_date))}%` }}
          >
            <div className="h-3 w-3 rounded-full border-2 border-white bg-blue-600" />
            <span className="mt-2 whitespace-nowrap text-xs">
              {trip.city ? `${trip.city}, ${trip.country}` : trip.country}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
