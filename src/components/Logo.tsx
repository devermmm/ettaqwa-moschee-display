const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Crescent Moon */}
      <path
        d="M 100 30 A 50 50 0 1 1 100 150 A 40 40 0 1 0 100 30 Z"
        fill="currentColor"
        className="text-[#2d7b7f]"
      />
      
      {/* Mosque Dome */}
      <ellipse
        cx="100"
        cy="90"
        rx="20"
        ry="15"
        fill="#9ca3af"
      />
      
      {/* Dome Top Decoration */}
      <circle
        cx="100"
        cy="75"
        r="3"
        fill="#2d7b7f"
      />
      <rect
        x="99"
        y="75"
        width="2"
        height="8"
        fill="#2d7b7f"
      />
      
      {/* Left Minaret */}
      <rect
        x="65"
        y="85"
        width="8"
        height="35"
        fill="#b8bec4"
        rx="1"
      />
      <rect
        x="64"
        y="83"
        width="10"
        height="3"
        fill="#9ca3af"
      />
      <ellipse
        cx="69"
        cy="82"
        rx="4"
        ry="3"
        fill="#9ca3af"
      />
      <circle
        cx="69"
        cy="78"
        r="2"
        fill="#2d7b7f"
      />
      
      {/* Right Minaret */}
      <rect
        x="127"
        y="85"
        width="8"
        height="35"
        fill="#b8bec4"
        rx="1"
      />
      <rect
        x="126"
        y="83"
        width="10"
        height="3"
        fill="#9ca3af"
      />
      <ellipse
        cx="131"
        cy="82"
        rx="4"
        ry="3"
        fill="#9ca3af"
      />
      <circle
        cx="131"
        cy="78"
        r="2"
        fill="#2d7b7f"
      />
      
      {/* Main Building */}
      <rect
        x="80"
        y="95"
        width="40"
        height="25"
        fill="#d1d5db"
        rx="2"
      />
      
      {/* Entrance Arch */}
      <path
        d="M 95 120 L 95 105 A 5 5 0 0 1 105 105 L 105 120 Z"
        fill="#6b7280"
      />
      
      {/* Text "Et Taqwa" */}
      <text
        x="100"
        y="165"
        fontSize="24"
        fontWeight="600"
        fill="#2d7b7f"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="-0.5"
      >
        Et Taqwa
      </text>
    </svg>
  );
};

export default Logo;
