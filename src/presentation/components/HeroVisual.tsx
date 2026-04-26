export function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-visual__badge">Execution map</div>

      <svg viewBox="0 0 560 420" role="img" aria-label="Abstract illustration of signal flow and execution">
        <defs>
          <linearGradient id="flowLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(104, 146, 255, 0.15)" />
            <stop offset="50%" stopColor="rgba(126, 168, 255, 0.95)" />
            <stop offset="100%" stopColor="rgba(95, 229, 208, 0.85)" />
          </linearGradient>
          <linearGradient id="surface" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(25, 42, 72, 0.95)" />
            <stop offset="100%" stopColor="rgba(8, 15, 28, 0.88)" />
          </linearGradient>
        </defs>

        <rect x="16" y="18" width="528" height="384" rx="28" fill="url(#surface)" stroke="rgba(156, 179, 255, 0.18)" />

        <path
          d="M64 292 C124 292, 150 180, 216 180 S308 250, 360 250 428 120, 496 120"
          stroke="url(#flowLine)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />

        <circle cx="110" cy="292" r="9" fill="#7d9eff" />
        <circle cx="250" cy="199" r="9" fill="#8aa8ff" />
        <circle cx="392" cy="228" r="9" fill="#98b4ff" />
        <circle cx="496" cy="120" r="11" fill="#62e0ca" />

        <g>
          <rect x="58" y="74" width="126" height="78" rx="18" fill="rgba(13, 24, 42, 0.92)" stroke="rgba(144, 168, 255, 0.18)" />
          <text x="78" y="106" fill="#9ab1e8" fontSize="13" fontFamily="Inter, sans-serif">
            SOURCES
          </text>
          <text x="78" y="132" fill="#e7eefc" fontSize="24" fontFamily="Inter, sans-serif" fontWeight="700">
            Collect
          </text>
        </g>

        <g>
          <rect x="214" y="250" width="136" height="88" rx="18" fill="rgba(13, 24, 42, 0.92)" stroke="rgba(144, 168, 255, 0.18)" />
          <text x="236" y="282" fill="#9ab1e8" fontSize="13" fontFamily="Inter, sans-serif">
            DECISION LAYER
          </text>
          <text x="236" y="308" fill="#e7eefc" fontSize="24" fontFamily="Inter, sans-serif" fontWeight="700">
            Score
          </text>
        </g>

        <g>
          <rect x="378" y="54" width="128" height="84" rx="18" fill="rgba(10, 27, 33, 0.94)" stroke="rgba(98, 224, 202, 0.28)" />
          <text x="400" y="86" fill="#97ddcf" fontSize="13" fontFamily="Inter, sans-serif">
            EXECUTION
          </text>
          <text x="400" y="112" fill="#effffb" fontSize="24" fontFamily="Inter, sans-serif" fontWeight="700">
            Execute
          </text>
        </g>

        <g opacity="0.9">
          <rect x="86" y="340" width="88" height="20" rx="10" fill="rgba(108, 136, 214, 0.18)" />
          <rect x="188" y="340" width="122" height="20" rx="10" fill="rgba(108, 136, 214, 0.12)" />
          <rect x="324" y="340" width="94" height="20" rx="10" fill="rgba(108, 136, 214, 0.18)" />
        </g>
      </svg>
    </div>
  );
}
