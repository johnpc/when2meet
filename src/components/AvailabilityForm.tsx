"use client";

import { useState } from "react";
import { useCreateAvailability } from "@/hooks/useAvailability";
import { Weekend } from "@/lib/weekends";

interface AvailabilityFormProps {
  pollId: string;
  weekends: Weekend[];
}

export function AvailabilityForm({ pollId, weekends }: AvailabilityFormProps) {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const createAvailability = useCreateAvailability(pollId);

  function toggleWeekend(saturday: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(saturday)) {
        next.delete(saturday);
      } else {
        next.add(saturday);
      }
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || selected.size === 0) return;

    createAvailability.mutate(
      { name: name.trim(), weekends: Array.from(selected) },
      {
        onSuccess: () => {
          setName("");
          setSelected(new Set());
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Your name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-600"
          required
        />
      </div>

      <div>
        <p className="text-sm font-medium mb-3">
          Select weekends you&apos;re available
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {weekends.map((w) => (
            <button
              key={w.saturday}
              type="button"
              onClick={() => toggleWeekend(w.saturday)}
              className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                selected.has(w.saturday)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-zinc-700 border-zinc-300 hover:border-blue-400 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-600"
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={
          !name.trim() ||
          selected.size === 0 ||
          createAvailability.isPending
        }
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {createAvailability.isPending ? "Submitting..." : "Submit Availability"}
      </button>
    </form>
  );
}
