export function Logo({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Coffee cup */}
      <path
        d="M25 35 C25 35 25 75 25 75 C25 82 30 87 37 87 L63 87 C70 87 75 82 75 75 L75 35 Z"
        fill="#FFC0CB"
        stroke="#FFB6C1"
        strokeWidth="2"
      />
      
      {/* Cup handle */}
      <path
        d="M75 45 C80 45 85 50 85 55 C85 60 80 65 75 65"
        stroke="#FFB6C1"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Cup rim */}
      <ellipse
        cx="50"
        cy="35"
        rx="25"
        ry="5"
        fill="#FFD1DC"
      />
      
      {/* Steam */}
      <path
        d="M40 25 Q35 15 40 10"
        stroke="#FFB6C1"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M50 22 Q45 12 50 7"
        stroke="#FFB6C1"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M60 25 Q55 15 60 10"
        stroke="#FFB6C1"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Heart decoration */}
      <path
        d="M45 55 C45 52 42 50 40 52 C38 50 35 52 35 55 C35 58 40 62 45 55 Z"
        fill="#fff"
        opacity="0.7"
      />
      <path
        d="M60 62 C60 60 58 58 56 60 C54 58 52 60 52 62 C52 64 56 67 60 62 Z"
        fill="#fff"
        opacity="0.7"
      />
    </svg>
  );
}
