interface Props {
  malicious: number;
  harmless: number;
  undetected: number;
  total?: number;
}

export function StatBadges({ malicious, harmless, undetected, total }: Props) {
  return (
    <div className="flex flex-col gap-2.5">
      {total !== undefined && (
        <p className="text-[11px] text-ink-faint">
          Analysed by <span className="font-mono text-ink-muted">{total}</span> vendors
        </p>
      )}
      <div className="grid grid-cols-3 gap-2">
        <div className={`bg-surface-2 border border-border-subtle rounded-md p-3 text-center flex flex-col gap-1 ${malicious === 0 ? '' : 'bg-risk-danger-bg border-risk-danger-border'}`}>
          <span className={`font-mono text-2xl font-semibold leading-none ${malicious === 0 ? 'text-risk-safe' : 'text-risk-danger'}`}>
            {malicious}
          </span>
          <span className="text-[11px] uppercase tracking-[0.05em] text-ink-faint">Malicious</span>
        </div>
        <div className="bg-surface-2 border border-border-subtle rounded-md p-3 text-center flex flex-col gap-1">
          <span className="font-mono text-2xl font-semibold leading-none text-risk-safe">{harmless}</span>
          <span className="text-[11px] uppercase tracking-[0.05em] text-ink-faint">Harmless</span>
        </div>
        <div className="bg-surface-2 border border-border-subtle rounded-md p-3 text-center flex flex-col gap-1">
          <span className="font-mono text-2xl font-semibold leading-none text-ink-muted">{undetected}</span>
          <span className="text-[11px] uppercase tracking-[0.05em] text-ink-faint">Undetected</span>
        </div>
      </div>
    </div>
  );
}
