// src/types.ts
export interface ReportSimple {
  id: string;
  title: string;
  reporterName: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reportedAt?: string | null; // LocalDateTime 문자열
}

export interface ConclusionDetail {
  id: string;
  aiConclusion: string[];
  confidence?: number | null;
  date?: string | null;            
  detectedBrand?: string | null;
  gpsInfo?: string | null;
  imageUrl?: string | null;
  region?: string | null;
  reportImgUrl?: string | null;
  result?: string | null;
  userId?: string | null;
  violation?: string | null;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface Manager {
  name: string;
  affiliation: string;
}