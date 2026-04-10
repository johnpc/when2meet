"use client";

import {
  useAvailabilityList,
  useDeleteAvailability,
} from "@/hooks/useAvailability";
import { Weekend } from "@/lib/weekends";

interface ResultsGridProps {
  pollId: string;
  weekends: Weekend[];
}

export function ResultsGrid({ pollId, weekends }: ResultsGridProps) {
  const { data: responses, isLoading, error } = useAvailabilityList(pollId);
  const deleteAvailability = useDeleteAvailability(pollId);

  if (isLoading) return <p className="text-zinc-500">Loading responses...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (!responses || responses.length === 0) {
    return (
      <p className="text-zinc-500 text-center py-8">
        No responses yet. Be the first to add your availability!
      </p>
    );
  }

  const countByWeekend = new Map<string, number>();
  for (const r of responses) {
    for (const w of r.weekends ?? []) {
      if (w) countByWeekend.set(w, (countByWeekend.get(w) ?? 0) + 1);
    }
  }

  const maxCount = Math.max(...countByWeekend.values(), 1);
  const totalPeople = responses.length;

  function heatColor(count: number): string {
    if (count === 0) return "bg-zinc-100 dark:bg-zinc-800";
    const ratio = count / maxCount;
    if (ratio >= 0.8) return "bg-green-500 text-white";
    if (ratio >= 0.5) return "bg-green-300 dark:bg-green-700";
    if (ratio >= 0.25) return "bg-yellow-200 dark:bg-yellow-800";
    return "bg-yellow-100 dark:bg-yellow-900";
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">
          Availability heatmap ({totalPeople}{" "}
          {totalPeople === 1 ? "person" : "people"})
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {weekends.map((w) => {
            const count = countByWeekend.get(w.saturday) ?? 0;
            return (
              <div
                key={w.saturday}
                className={`px-3 py-2 text-sm rounded-lg text-center ${heatColor(count)}`}
              >
                <div className="font-medium">{w.label}</div>
                <div className="text-xs opacity-75">
                  {count}/{totalPeople}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Responses</h3>
        <ul className="space-y-2">
          {responses.map((r) => (
            <li
              key={r.id}
              className="flex items-center justify-between px-3 py-2 bg-zinc-50 rounded-lg dark:bg-zinc-800"
            >
              <div>
                <span className="font-medium">{r.name}</span>
                <span className="text-zinc-500 text-sm ml-2">
                  {(r.weekends ?? []).length} weekends
                </span>
              </div>
              <button
                onClick={() => deleteAvailability.mutate(r.id)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
