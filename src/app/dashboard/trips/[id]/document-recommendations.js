import { documentRecommendationsForCountry } from "@/data/document-catalog";
import AddSuggestedDocumentButton from "./add-suggested-document-button";

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

export default function DocumentRecommendations({ tripId, country, existingDocuments }) {
  const recommendations = documentRecommendationsForCountry(country);

  return (
    <div className="space-y-3">
      <p className="text-xs text-black/40">
        General reference info, not legal advice — always confirm current entry
        requirements for your nationality before booking.
      </p>

      {recommendations.map((rec) => {
        const alreadyAdded = existingDocuments.some(
          (d) => d.title.toLowerCase() === rec.name.toLowerCase()
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
            <div className="mt-2">
              {alreadyAdded ? (
                <span className="text-sm text-black/40">✓ Already in your list</span>
              ) : (
                <AddSuggestedDocumentButton tripId={tripId} name={rec.name} level={rec.level} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
