// Signature element: a schematic tracing the same PROBLEM -> FLOW -> SHIP
// structure used to write up every project in this portfolio (see Projects.jsx).
// Built as static SVG + CSS so it runs at 60fps with no JS animation loop.
export default function BlueprintHero() {
  const nodes = [
    { x: 40, y: 150, label: 'PROBLEM', sub: 'observed friction' },
    { x: 330, y: 150, label: 'FLOW', sub: 'states mapped first' },
    { x: 620, y: 150, label: 'SHIP', sub: 'working build' }
  ];

  return (
    <div className="blueprint-wrap" aria-hidden="true">
      <svg viewBox="0 0 900 300" width="100%" height="100%" style={{ overflow: 'visible' }}>
        <defs>
          <marker id="node-tick" markerWidth="6" markerHeight="6" refX="3" refY="3">
            <circle cx="3" cy="3" r="1.6" fill="var(--signal)" />
          </marker>
        </defs>

        {/* traces */}
        <path
          className="trace"
          d="M 200 150 L 270 150"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />
        <path
          className="trace"
          d="M 490 150 L 560 150"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />

        {/* traveling signal pulse along the full path */}
        <circle r="4" fill="var(--accent)">
          <animateMotion
            dur="4.2s"
            repeatCount="indefinite"
            path="M 200 150 L 270 150 M 490 150 L 560 150"
          />
        </circle>
        <circle r="3.5" fill="var(--accent)" opacity="0.9">
          <animateMotion dur="2.6s" repeatCount="indefinite" path="M 200 150 L 270 150" />
        </circle>
        <circle r="3.5" fill="var(--signal)" opacity="0.9">
          <animateMotion dur="2.6s" begin="1.3s" repeatCount="indefinite" path="M 490 150 L 560 150" />
        </circle>

        {nodes.map((n) => (
          <g key={n.label} transform={`translate(${n.x}, ${n.y - 40})`}>
            <rect
              width={n.label === 'FLOW' ? 220 : 160}
              height="80"
              rx="4"
              fill="var(--bg-panel)"
              stroke="var(--border-strong)"
              strokeWidth="1.2"
            />
            <rect width={n.label === 'FLOW' ? 220 : 160} height="4" fill="var(--signal)" opacity="0.55" />
            <text x="18" y="34" fill="var(--text-primary)" fontFamily="'Space Grotesk', sans-serif" fontSize="17" fontWeight="600">
              {n.label}
            </text>
            <text x="18" y="58" fill="var(--text-dim)" fontFamily="'JetBrains Mono', monospace" fontSize="11">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>

      <style>{`
        .blueprint-wrap {
          width: 100%;
          max-width: 900px;
        }
        .trace { opacity: 0.9; }
        @media (prefers-reduced-motion: reduce) {
          .blueprint-wrap animateMotion { display: none; }
        }
      `}</style>
    </div>
  );
}
