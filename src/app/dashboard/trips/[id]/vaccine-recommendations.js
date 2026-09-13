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
  existingImmunizations,
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
        const doses = rec.doses.map((dose, index) => {
          const requiredByDate = subtractWeeks(arrivalDate, dose.weeksBeforeTravel);
          return {
            doseNumber: index + 1,
            requiredByDate,
            days: daysUntil(requiredByDate),
          };
        });
        const alreadyImmune = existingImmunizations.some(
          (im) => im.vaccine_name.toLowerCase() === rec.name.toLowerCase()
        );
        const alreadyAdded = existingVaccines.some(
          (v) => v.name.toLowerCase() === rec.name.toLowerCase()
        );

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

            {alreadyImmune ? (
              <p className="mt-2 text-sm text-green-700">
                ✓ Already have this, from your{" "}
                <a href="/dashboard/immunizations" className="underline">
                  immunization history
                </a>
              </p>
            ) : (
              <>
                <div className="mt-2 space-y-0.5 text-sm text-black/60">
                  {doses.map((dose) => (
                    <div key={dose.doseNumber}>
                      {multiDose && <span>Dose {dose.doseNumber} of {doses.length}: </span>}
                      Get by <span className="font-medium text-black">{formatDate(dose.requiredByDate)}</span>{" "}
                      {dose.days < 0 ? (
                        <span className="text-red-600">— window has passed</span>
                      ) : (
                        <span>({Math.ceil(dose.days / 7)} wks away)</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-2">
                  {alreadyAdded ? (
                    <span className="text-sm text-black/40">✓ Already in your list</span>
                  ) : (
                    <AddSuggestedVaccineButton tripId={tripId} name={rec.name} doses={doses} />
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
