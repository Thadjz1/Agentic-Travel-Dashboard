import Link from "next/link";

// Appending a fixed UTC time avoids the classic bug where parsing a plain
// "YYYY-MM-DD" string rolls the date back a day in negative-UTC timezones.
function toDateNum(dateString) {
  return new Date(`${dateString}T12:00:00Z`).getTime();
}

// Picks a month step (1, 3, 6, or 12) so the axis shows a handful of
// readable ticks regardless of whether the trips span months or years.
function monthTicks(rangeStart, rangeEnd) {
  const start = new Date(rangeStart);
  const end = new Date(rangeEnd);

  const totalMonths =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    (end.getUTCMonth() - start.getUTCMonth());

  let step = 1;
  if (totalMonths > 8) step = 3;
  if (totalMonths > 20) step = 6;
  if (totalMonths > 40) step = 12;

  const ticks = [];
  let year = start.getUTCFullYear();
  let month = start.getUTCMonth();

  while (true) {
    const time = Date.UTC(year, month, 1, 12);
    if (time > rangeEnd) break;
    if (time >= rangeStart) {
      ticks.push({
        time,
        label: new Date(time).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        }),
      });
    }
    month += step;
    year += Math.floor(month / 12);
    month = month % 12;
  }

  return ticks;
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

  const ticks = monthTicks(rangeStart, rangeEnd);

  return (
    <div className="mb-20">
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

        {ticks.map((tick) => (
          <div
            key={tick.time}
            className="absolute top-10 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${percentFor(tick.time)}%` }}
          >
            <div className="h-2 w-px bg-black/30" />
            <span className="mt-1 whitespace-nowrap text-[10px] text-black/50">
              {tick.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
