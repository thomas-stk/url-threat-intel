import type { AnalyseURLResponse } from '../types/intel';
import { vtMaliciousToRisk } from '../types/intel';
import { StatBadges } from './StatBadges';
import { MetaGrid, type MetaItem } from './MetaGrid';

interface Props {
  data: AnalyseURLResponse;
}

export function UrlResults({ data }: Props) {
  const vtAttrs = data.results.virustotal.data.attributes;
  const vtStats = vtAttrs.last_analysis_stats;
  const vtTotal = vtStats.malicious + vtStats.harmless + vtStats.undetected + vtStats.suspicious;
  const vtRisk = vtMaliciousToRisk(vtStats.malicious);

  const categories = Object.values(vtAttrs.categories ?? {});
  const uniqueCategories = [...new Set(categories)];

  const vtItems: MetaItem[] = [
    { label: 'URL', value: vtAttrs.url || data.target, mono: true },
    ...(vtAttrs.title ? [{ label: 'Page title', value: vtAttrs.title }] : []),
    {
      label: 'Reputation',
      value: (
        <span className={`font-mono text-[13px] font-semibold ${vtRisk === 'safe' ? 'text-risk-safe' : vtRisk === 'warn' ? 'text-risk-warn' : 'text-risk-danger'}`}>
          {vtAttrs.reputation > 0 ? `+${vtAttrs.reputation}` : vtAttrs.reputation}
        </span>
      ),
    },
    ...(uniqueCategories.length > 0
      ? [{
          label: 'Categories',
          value: (
            <div className="flex flex-wrap gap-1">
              {uniqueCategories.slice(0, 4).map((cat) => (
                <span key={cat} className="text-[11px] text-ink-muted bg-surface-2 border border-border-subtle rounded-[4px] px-1.5 py-0.5 leading-snug lowercase">
                  {cat}
                </span>
              ))}
            </div>
          ),
        }]
      : []),
  ];

  return (
    <section className="w-full max-w-[1100px] flex flex-col gap-6 animate-results-in" aria-label={`Results for ${data.target}`}>
      <div className="flex items-center gap-2.5">
        <span className="text-[11px] font-semibold font-mono tracking-[0.06em] px-2 py-0.5 rounded-[4px] flex-shrink-0 bg-accent/15 text-accent border border-accent/30">
          URL
        </span>
        <code className="font-mono text-[13px] text-ink-muted overflow-hidden text-ellipsis whitespace-nowrap max-w-[600px]">
          {data.target}
        </code>
      </div>

      <div className="flex justify-center ">
        <article className="w-full max-w-[560px] bg-surface border border-border-subtle rounded-[10px] overflow-hidden">
          <header className="px-6 py-4 border-b border-border-subtle">
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
