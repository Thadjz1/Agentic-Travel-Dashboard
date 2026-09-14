"use client";

import { useState } from "react";
import { visaInfoForCountry } from "@/data/visa-catalog";
import AddSuggestedDocumentButton from "./add-suggested-document-button";

const US_ALIASES = ["united states", "usa", "us", "united states of america"];

export default function VisaRequirementCard({ tripId, country, nationality, alreadyAdded }) {
  const [expanded, setExpanded] = useState(false);
  const visa = visaInfoForCountry(country);

  const isUS = nationality && US_ALIASES.includes(nationality.trim().toLowerCase());
  const nationalitySet = !!nationality;

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
          {nationalitySet && !isUS ? (
            <p className="text-sm text-amber-700">
              This data is based on <span className="font-medium">US</span> passport
              holders, but your profile says your nationality is{" "}
              <span className="font-medium">{nationality}</span> — these specific
              requirements likely do not apply to you. Check official sources for your
              own nationality.
            </p>
          ) : (
            <>
              <p className="text-sm text-black/70">
                For {country}: <span className="font-medium">{visa.requirement}</span>
              </p>
              <p className="text-xs text-black/40">
                Based on typical rules for US passport holders — depends on your
                actual nationality and can change over time. Confirm before booking.
              </p>
            </>
          )}

          {!nationalitySet && (
            <p className="text-xs text-black/40">
              Haven&apos;t set your nationality yet?{" "}
              <a href="/dashboard/profile" className="underline">
                Set it in your profile
              </a>{" "}
              so this can be more accurate.
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-sm">
            {isUS && visa.applyUrl && (
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
