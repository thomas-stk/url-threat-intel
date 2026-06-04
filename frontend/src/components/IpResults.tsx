import type { AnalyseIPResponse } from '../types/intel';
import { scoreToRisk, vtMaliciousToRisk } from '../types/intel';
import { ScoreGauge } from './ScoreGauge';
import { StatBadges } from './StatBadges';
import { MetaGrid, type MetaItem } from './MetaGrid';

interface Props {
  data: AnalyseIPResponse;
}

function formatDate(iso: string | null): string {
  if (!iso) return 'Never';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export function IpResults({ data }: Props) {
  const abuse = data.results.abuseipdb.data;
  const vtAttrs = data.results.virustotal.data.attributes;
  const vtStats = vtAttrs.last_analysis_stats;

  const abuseRisk = scoreToRisk(abuse.abuseConfidenceScore);
  const vtTotal = vtStats.malicious + vtStats.harmless + vtStats.undetected + vtStats.suspicious;
  const vtRisk = vtMaliciousToRisk(vtStats.malicious);

  const abuseItems: MetaItem[] = [
    { label: 'Country', value: abuse.countryCode || '—' },
    { label: 'ISP', value: abuse.isp || '—' },
    { label: 'Domain', value: abuse.domain || '—', mono: true },
    { label: 'Reports', value: abuse.totalReports.toLocaleString(), mono: true },
    { label: 'Distinct reporters', value: abuse.numDistinctUsers.toLocaleString(), mono: true },
    { label: 'Last reported', value: formatDate(abuse.lastReportedAt) },
    ...(abuse.isTor ? [{
      label: 'Tor exit node',
      value: (
        <span className="inline-flex text-[11px] font-semibold px-1.5 py-0.5 rounded-[4px] leading-snug bg-risk-warn-bg text-risk-warn border border-risk-warn-border">
          Yes
        </span>
      ),
    }] : []),
  ];

  const vtItems: MetaItem[] = [
    { label: 'Country', value: vtAttrs.country || '—' },
    { label: 'AS owner', value: vtAttrs.as_owner || '—' },
    {
      label: 'Reputation',
      value: (
        <span className={`font-mono text-[13px] font-semibold ${vtRisk === 'safe' ? 'text-risk-safe' : vtRisk === 'warn' ? 'text-risk-warn' : 'text-risk-danger'}`}>
          {vtAttrs.reputation > 0 ? `+${vtAttrs.reputation}` : vtAttrs.reputation}
        </span>
      ),
    },
  ];

  return (
    <section className="w-full max-w-[1100px] flex flex-col gap-6 animate-results-in" aria-label={`Results for ${data.target}`}>
      <div className="flex items-center gap-2.5">
        <span className="text-[11px] font-semibold font-mono tracking-[0.06em] px-2 py-0.5 rounded-[4px] flex-shrink-0 bg-primary/15 text-primary border border-primary/30">
          IP
        </span>
        <code className="font-mono text-[13px] text-ink-muted">{data.target}</code>
      </div>

      <div className="grid grid-cols-2 gap-5 max-[720px]:grid-cols-1">
        <article className="bg-surface border border-border-subtle rounded-[10px] overflow-hidden">
          <header className="px-6 py-4 border-b border-border-subtle flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-[0.06em] uppercase text-ink-faint">AbuseIPDB</span>
          </header>
          <div className="px-6 py-5 flex flex-col gap-5">
            <ScoreGauge score={abuse.abuseConfidenceScore} risk={abuseRisk} />
            <div className="h-px bg-border-subtle" />
            <MetaGrid items={abuseItems} />
          </div>
        </article>

        <article className="bg-surface border border-border-subtle rounded-[10px] overflow-hidden">
          <header className="px-6 py-4 border-b border-border-subtle flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-[0.06em] uppercase text-ink-faint">VirusTotal</span>
          </header>
          <div className="px-6 py-5 flex flex-col gap-5">
            <StatBadges
              malicious={vtStats.malicious}
              harmless={vtStats.harmless}
              undetected={vtStats.undetected}
              total={vtTotal}
            />
            <div className="h-px bg-border-subtle" />
            <MetaGrid items={vtItems} />
          </div>
        </article>
      </div>
    </section>
  );
}
