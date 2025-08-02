export interface Report {
  id: number;
  title: string;
  description: string;
  reporterName: string;
  targetName: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reportedAt: string;
  address: string;
  gps: string;
  reason: string;
  fine: number;
  brand: string;
  approvedAt?: string;
  aiResult: string;
  detectedBrand: string;
  location: string;
  reportContent: string;
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