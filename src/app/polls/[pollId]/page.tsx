"use client";

import { use } from "react";
import { usePoll } from "@/hooks/usePoll";
import { useAvailabilityList } from "@/hooks/useAvailability";
import { AvailabilityForm } from "@/components/AvailabilityForm";
import { ResultsGrid } from "@/components/ResultsGrid";
import { getWeekendsBetween } from "@/lib/weekends";

export default function PollPage({
  params,
}: {
  params: Promise<{ pollId: string }>;
}) {
  const { pollId } = use(params);
  const { data: poll, isLoading, error } = usePoll(pollId);
  const { data: responses } = useAvailabilityList(pollId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-500">Loading poll...</p>
      </div>
    );
  }

  if (error || !poll) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <p className="text-red-500">Poll not found</p>
      </div>
    );
  }

  const weekends = getWeekendsBetween(poll.startDate, poll.endDate);
  const respondentCount = responses?.length ?? 0;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight">{poll.title}</h1>
          <p className="text-zinc-500 mt-2">
            {weekends.length} weekends between {poll.startDate} and{" "}
            {poll.endDate}
          </p>
          <p className="text-zinc-400 text-sm mt-1">
            {respondentCount} {respondentCount === 1 ? "response" : "responses"}{" "}
            so far
          </p>
        </header>

        <section className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold mb-4">Add your availability</h2>
          <AvailabilityForm pollId={pollId} weekends={weekends} />
        </section>

        <section className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Results</h2>
          <ResultsGrid pollId={pollId} weekends={weekends} />
        </section>
      </div>
    </div>
  );
}
