"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/../amplify/data/resource";

const client = generateClient<Schema>();

export function usePoll(pollId: string) {
  return useQuery({
    queryKey: ["poll", pollId],
    queryFn: async () => {
      const { data, errors } = await client.models.Poll.get({ id: pollId });
      if (errors) throw new Error(errors.map((e) => e.message).join(", "));
      if (!data) throw new Error("Poll not found");
      return data;
    },
  });
}

export function useCreatePoll() {
  return useMutation({
    mutationFn: async (input: {
      title: string;
      startDate: string;
      endDate: string;
    }) => {
      const { data, errors } = await client.models.Poll.create(input);
      if (errors) throw new Error(errors.map((e) => e.message).join(", "));
      return data;
    },
  });
}
