import type { RiskLevel } from '../types/intel';

interface Props {
  score: number;
  risk: RiskLevel;
  label?: string;
}

const RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ARC_LENGTH = CIRCUMFERENCE * (270 / 360);
const GAP = CIRCUMFERENCE - ARC_LENGTH;

const RISK_COLORS: Record<RiskLevel, string> = {
  safe:   'var(--color-risk-safe)',
  warn:   'var(--color-risk-warn)',
  danger: 'var(--color-risk-danger)',
};

const RISK_LABELS: Record<RiskLevel, string> = {
  safe:   'Clean',
  warn:   'Suspicious',
  danger: 'Malicious',
};

const RISK_TEXT: Record<RiskLevel, string> = {
  safe:   'text-risk-safe',
  warn:   'text-risk-warn',
  danger: 'text-risk-danger',
};

export function ScoreGauge({ score, risk, label = 'Confidence Score' }: Props) {
  const clamped = Math.max(0, Math.min(100, score));
  const progressLength = (clamped / 100) * ARC_LENGTH;
  const progressGap = CIRCUMFERENCE - progressLength;
  const color = RISK_COLORS[risk];

  return (
    <div className="flex items-center gap-4">
      <svg
        viewBox="0 0 110 110"
        width="110"
        height="110"
        className="flex-shrink-0"
        aria-label={`${label}: ${clamped} out of 100, ${RISK_LABELS[risk]}`}
        role="img"
      >
        <circle
          cx="55" cy="55" r={RADIUS}
          fill="none"
          stroke="var(--color-surface-2)"
          strokeWidth="8"
          strokeDasharray={`${ARC_LENGTH} ${GAP}`}
          strokeLinecap="round"
          transform="rotate(135 55 55)"
        />
        <circle
          cx="55" cy="55" r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${progressLength} ${progressGap}`}
          strokeLinecap="round"
          transform="rotate(135 55 55)"
          className="gauge-progress"
        />
        <text
          x="55" y="51"
          textAnchor="middle"
          dominantBaseline="central"
          fill={color}
          fontFamily="var(--font-mono)"
          fontWeight="600"
          fontSize="22"
        >
          {clamped}
        </text>
        <text
          x="55" y="67"
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--color-ink-faint)"
          fontFamily="var(--font-mono)"
          fontSize="10"
        >
          /100
        </text>
      </svg>

      <div className="flex flex-col gap-1">
        <span className={`text-[17px] font-semibold tracking-[-0.01em] ${RISK_TEXT[risk]}`}>
          {RISK_LABELS[risk]}
        </span>
        <span className="text-[11px] text-ink-faint uppercase tracking-[0.05em]">{label}</span>
      </div>
    </div>
  );
}
