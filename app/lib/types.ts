/**
 * TypeScript types for Parallax
 * 
 * These are placeholders - update based on your backend models
 */

export interface ResearchQuery {
  id: string;
  query: string;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
}

export interface ResearchResult {
  id: string;
  query: string;
  results: {
    model: string;
    response: string;
    confidence?: number;
  }[];
  claims?: Claim[];
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
}

export interface Claim {
  id: string;
  text: string;
  verified: boolean;
  sources?: string[];
  confidence?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  details?: any;
}
