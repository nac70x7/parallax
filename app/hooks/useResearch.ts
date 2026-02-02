import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ResearchResult } from "@/lib/types";

/**
 * Hook for fetching a single research result
 */
export function useResearch(id: string | undefined) {
  return useQuery({
    queryKey: ["research", id],
    queryFn: () => api.research.get(id!),
    enabled: !!id,
  });
}

/**
 * Hook for fetching research list
 */
export function useResearchList() {
  return useQuery({
    queryKey: ["research", "list"],
    queryFn: () => api.research.list(),
  });
}

/**
 * Hook for creating a new research query
 */
export function useCreateResearch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (query: string) => api.research.create(query),
    onSuccess: () => {
      // Invalidate and refetch research list
      queryClient.invalidateQueries({ queryKey: ["research", "list"] });
    },
  });
}

/**
 * Hook for checking API health
 */
export function useApiHealth() {
  return useQuery({
    queryKey: ["health"],
    queryFn: () => api.health(),
    refetchInterval: 30000, // Check every 30s
    retry: 1,
  });
}
