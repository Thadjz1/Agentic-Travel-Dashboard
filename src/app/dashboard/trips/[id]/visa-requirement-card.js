"use client";

import { useState } from "react";
import { visaInfoForCountry } from "@/data/visa-catalog";
import AddSuggestedDocumentButton from "./add-suggested-document-button";

export default function VisaRequirementCard({ tripId, country, alreadyAdded }) {
  const [expanded, setExpanded] = useState(false);
  const visa = visaInfoForCountry(country);

  return (
    <div className="rounded-lg border border-black/10 p-3">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full flex-wrap items-center gap-2 text-left"
      >
        <span className="font-medium">Visa / Entry Requirements</span>
        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">
          Required
        </span>
        <span className="ml-auto text-xs text-black/40">
          {expanded ? "Hide details ▲" : "Show details ▼"}
        </span>
      </button>

      {expanded && (
        <div className="mt-2 space-y-2">
          <p className="text-sm text-black/70">
            For {country}: <span className="font-medium">{visa.requirement}</span>
          </p>
          <p className="text-xs text-black/40">
            Based on typical rules for US passport holders — depends on your actual
            nationality and can change over time. Confirm before booking.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            {visa.applyUrl && (
              <a
                href={visa.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Official application site →
              </a>
            )}
            <a
              href={visa.searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Check U.S. State Dept. info →
            </a>
          </div>
        </div>
      )}

      <div className="mt-2">
        {alreadyAdded ? (
          <span className="text-sm text-black/40">✓ Already in your list</span>
        ) : (
          <AddSuggestedDocumentButton
            tripId={tripId}
            name="Visa / Entry Requirements"
            level="required"
          />
        )}
      </div>
    </div>
  );
}
