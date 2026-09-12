import { recommendationsForCountry } from "@/data/vaccine-catalog";
import { formatDate, subtractWeeks, daysUntil } from "@/utils/format-date";
import AddSuggestedVaccineButton from "./add-suggested-vaccine-button";

const levelStyles = {
  required: "bg-red-100 text-red-700",
  recommended: "bg-blue-100 text-blue-700",
  conditional: "bg-yellow-100 text-yellow-700",
};

const levelLabels = {
  required: "Required",
  recommended: "Recommended",
  conditional: "Depends on your trip",
};

export default function VaccineRecommendations({
  tripId,
  country,
  arrivalDate,
  existingVaccines,
}) {
  const recommendations = recommendationsForCountry(country);

  if (recommendations.length === 0) {
    return (
      <p className="text-sm text-black/60">
        No reference recommendations for &quot;{country}&quot; yet in this app — check the
        CDC Travel Health site or a travel clinic, then log what you need manually below.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-black/40">
        General reference info, not medical advice — confirm with a doctor or travel
        clinic for your specific trip and health history.
      </p>

      {recommendations.map((rec) => {
        const multiDose = rec.doses.length > 1;

        return (
          <div key={rec.name} className="rounded-lg border border-black/10 p-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">{rec.name}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${levelStyles[rec.level]}`}>
                {levelLabels[rec.level]}
              </span>
            </div>
            <p className="mt-1 text-sm text-black/70">{rec.description}</p>
            <p className="mt-1 text-xs text-black/50">Caused by: {rec.cause}</p>

            <div className="mt-2 space-y-1">
              {rec.doses.map((dose, index) => {
                const doseNumber = index + 1;
                const targetDate = subtractWeeks(arrivalDate, dose.weeksBeforeTravel);
                const days = daysUntil(targetDate);
                const alreadyLogged = existingVaccines.some(
                  (v) =>
                    v.name.toLowerCase() === rec.name.toLowerCase() &&
                    (multiDose ? v.dose_number === doseNumber : true)
                );

                return (
                  <div key={doseNumber} className="flex flex-wrap items-center gap-2 text-sm">
                    {multiDose && (
                      <span className="text-black/60">
                        Dose {doseNumber} of {rec.doses.length}:
                      </span>
                    )}
                    <span>
                      Get by <span className="font-medium">{formatDate(targetDate)}</span>
                    </span>
                    {days < 0 ? (
                      <span className="text-red-600">— window has passed</span>
                    ) : (
                      <span className="text-black/60">({Math.ceil(days / 7)} wks away)</span>
                    )}
                    {alreadyLogged ? (
                      <span className="text-black/40">✓ In your list</span>
                    ) : (
                      <AddSuggestedVaccineButton
                        tripId={tripId}
                        name={rec.name}
                        requiredByDate={targetDate}
                        doseNumber={multiDose ? doseNumber : null}
                        totalDoses={multiDose ? rec.doses.length : null}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
