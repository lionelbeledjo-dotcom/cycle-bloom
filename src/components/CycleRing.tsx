type Phase = "menstruation" | "follicular" | "ovulation" | "luteal";

interface Props {
  day: number;
  cycleLength: number;
  periodLength?: number;
  ovulationDay?: number;
  fertileStart?: number;
  fertileEnd?: number;
}

export function CycleRing({
  day,
  cycleLength,
  periodLength = 5,
  ovulationDay = 14,
  fertileStart = 11,
  fertileEnd = 16,
}: Props) {
  const size = 320;
  const stroke = 28;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  const segments: { from: number; to: number; color: string; phase: Phase }[] = [
    { from: 0, to: periodLength, color: "var(--rose-vif)", phase: "menstruation" },
    { from: periodLength, to: fertileStart, color: "var(--rose-poudre)", phase: "follicular" },
    { from: fertileStart, to: fertileEnd, color: "var(--violet-doux)", phase: "ovulation" },
    { from: fertileEnd, to: cycleLength, color: "var(--lavande)", phase: "luteal" },
  ];

  const angleFor = (d: number) => (d / cycleLength) * 360;

  const currentPhase: Phase =
    day <= periodLength
      ? "menstruation"
      : day >= fertileStart && day <= fertileEnd
      ? day === ovulationDay
        ? "ovulation"
        : "ovulation"
      : day < fertileStart
      ? "follicular"
      : "luteal";

  const phaseLabel: Record<Phase, string> = {
    menstruation: "Menstruation",
    follicular: "Phase folliculaire",
    ovulation: "Fenêtre fertile",
    luteal: "Phase lutéale",
  };

  return (
    <div className="relative mx-auto flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Glow */}
      <div
        className="absolute inset-6 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--rose-pastel), transparent 70%)" }}
      />

      <svg width={size} height={size} className="relative -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--lavande)" strokeWidth={stroke} fill="none" />
        {segments.map((s, i) => {
          const len = ((s.to - s.from) / cycleLength) * c;
          const offset = (s.from / cycleLength) * c;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke={s.color}
              strokeWidth={stroke}
              fill="none"
              strokeDasharray={`${len} ${c}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
              opacity={0.9}
            />
          );
        })}
        {/* Marker for current day */}
        <g
          style={{
            transformOrigin: `${size / 2}px ${size / 2}px`,
            transform: `rotate(${angleFor(day)}deg)`,
          }}
        >
          <circle cx={size / 2} cy={stroke / 2} r={14} fill="white" stroke="var(--rose-vif)" strokeWidth={4} />
        </g>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-xs uppercase tracking-[0.25em] text-violet-doux">Jour</div>
        <div className="font-display text-7xl font-bold text-gradient-bloom leading-none">{day}</div>
        <div className="mt-2 text-sm font-medium text-foreground/80">{phaseLabel[currentPhase]}</div>
        <div className="mt-1 text-xs text-muted-foreground">/ {cycleLength} jours</div>
      </div>
    </div>
  );
}
