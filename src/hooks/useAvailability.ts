"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/../amplify/data/resource";

const client = generateClient<Schema>();

export function useAvailabilityList(pollId: string) {
  return useQuery({
    queryKey: ["availability", pollId],
    queryFn: async () => {
      const { data, errors } = await client.models.Availability.list({
        filter: { pollId: { eq: pollId } },
      });
      if (errors) throw new Error(errors.map((e) => e.message).join(", "));
      return data;
    },
  });
}

export function useCreateAvailability(pollId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { name: string; weekends: string[] }) => {
      const { data, errors } = await client.models.Availability.create({
        ...input,
        pollId,
      });
      if (errors) throw new Error(errors.map((e) => e.message).join(", "));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["availability", pollId] });
    },
  });
}

export function useDeleteAvailability(pollId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { errors } = await client.models.Availability.delete({ id });
      if (errors) throw new Error(errors.map((e) => e.message).join(", "));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["availability", pollId] });
    },
  });
}
