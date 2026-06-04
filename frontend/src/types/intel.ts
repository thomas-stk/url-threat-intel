export interface AbuseIPDBData {
  ipAddress: string;
  abuseConfidenceScore: number;
  totalReports: number;
  numDistinctUsers: number;
  isTor: boolean;
  countryCode: string;
  isp: string;
  domain: string;
  lastReportedAt: string | null;
  isWhitelisted: boolean | null;
  usageType: string;
}

export interface VTAnalysisStats {
  malicious: number;
  harmless: number;
  suspicious: number;
  undetected: number;
  timeout: number;
}

export interface VTIPAttributes {
  country: string;
  as_owner: string;
  reputation: number;
  last_analysis_stats: VTAnalysisStats;
}

export interface VTURLAttributes {
  url: string;
  title: string;
  reputation: number;
  last_analysis_stats: VTAnalysisStats;
  categories: Record<string, string>;
}

export interface AbuseIPDBResponse {
  data: AbuseIPDBData;
}

export interface VTIPResponse {
  data: {
    id: string;
    type: string;
    attributes: VTIPAttributes;
  };
}

export interface VTURLResponse {
  data: {
    id: string;
    type: string;
    attributes: VTURLAttributes;
  };
}

export interface AnalyseIPResponse {
  target: string;
  type: 'ip';
  results: {
    abuseipdb: AbuseIPDBResponse;
    virustotal: VTIPResponse;
  };
}

export interface AnalyseURLResponse {
  target: string;
  type: 'url';
  results: {
    virustotal: VTURLResponse;
  };
}

export type AnalyseResponse = AnalyseIPResponse | AnalyseURLResponse;

export type RiskLevel = 'safe' | 'warn' | 'danger';

export function scoreToRisk(score: number): RiskLevel {
  if (score < 30) return 'safe';
  if (score < 70) return 'warn';
  return 'danger';
}

export function vtMaliciousToRisk(malicious: number): RiskLevel {
  if (malicious === 0) return 'safe';
  if (malicious <= 3) return 'warn';
  return 'danger';
}
