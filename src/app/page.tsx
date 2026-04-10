"use client";

import { CreatePollForm } from "@/components/CreatePollForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-lg mx-auto px-4 py-12">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight">when2meet</h1>
          <p className="text-zinc-500 mt-2">
            Find a weekend that works for everyone
          </p>
        </header>

        <section className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Create a new poll</h2>
          <CreatePollForm />
        </section>
      </div>
    </div>
  );
}
