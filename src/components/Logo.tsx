import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  animated?: boolean;
}

const Logo = ({ className = "", animated = true }: LogoProps) => {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      initial={animated ? { opacity: 0, scale: 0.8 } : undefined}
      animate={animated ? { opacity: 1, scale: 1 } : undefined}
      transition={animated ? { duration: 0.5 } : undefined}
    >
      {/* Crescent Moon */}
      <motion.path
        d="M 100 30 A 50 50 0 1 1 100 150 A 40 40 0 1 0 100 30 Z"
        fill="currentColor"
        className="text-[#2d7b7f]"
        initial={animated ? { opacity: 0, rotate: -180, scale: 0 } : undefined}
        animate={animated ? { opacity: 1, rotate: 0, scale: 1 } : undefined}
        transition={animated ? { duration: 0.8, delay: 0.2 } : undefined}
        style={{ originX: "50%", originY: "50%" }}
      />
      
      {/* Mosque Dome */}
      <motion.ellipse
        cx="100"
        cy="90"
        rx="20"
        ry="15"
        fill="#9ca3af"
        initial={animated ? { opacity: 0, y: 20 } : undefined}
        animate={animated ? { opacity: 1, y: 0 } : undefined}
        transition={animated ? { duration: 0.5, delay: 0.5 } : undefined}
      />
      
      {/* Dome Top Decoration */}
      <motion.circle
        cx="100"
        cy="75"
        r="3"
        fill="#2d7b7f"
        initial={animated ? { opacity: 0, scale: 0 } : undefined}
        animate={animated ? { opacity: 1, scale: 1 } : undefined}
        transition={animated ? { duration: 0.3, delay: 0.6 } : undefined}
      />
      <motion.rect
        x="99"
        y="75"
        width="2"
        height="8"
        fill="#2d7b7f"
        initial={animated ? { opacity: 0, scaleY: 0 } : undefined}
        animate={animated ? { opacity: 1, scaleY: 1 } : undefined}
        transition={animated ? { duration: 0.3, delay: 0.65 } : undefined}
        style={{ originY: "0%" }}
      />
      
      {/* Left Minaret */}
      <motion.rect
        x="65"
        y="85"
        width="8"
        height="35"
        fill="#b8bec4"
        rx="1"
        initial={animated ? { opacity: 0, y: 20 } : undefined}
        animate={animated ? { opacity: 1, y: 0 } : undefined}
        transition={animated ? { duration: 0.5, delay: 0.7 } : undefined}
      />
      <motion.rect
        x="64"
        y="83"
        width="10"
        height="3"
        fill="#9ca3af"
        initial={animated ? { opacity: 0, scale: 0 } : undefined}
        animate={animated ? { opacity: 1, scale: 1 } : undefined}
        transition={animated ? { duration: 0.3, delay: 0.75 } : undefined}
      />
      <motion.ellipse
        cx="69"
        cy="82"
        rx="4"
        ry="3"
        fill="#9ca3af"
        initial={animated ? { opacity: 0, scale: 0 } : undefined}
        animate={animated ? { opacity: 1, scale: 1 } : undefined}
        transition={animated ? { duration: 0.3, delay: 0.78 } : undefined}
      />
      <motion.circle
        cx="69"
        cy="78"
        r="2"
        fill="#2d7b7f"
        initial={animated ? { opacity: 0, scale: 0 } : undefined}
        animate={animated ? { opacity: 1, scale: 1 } : undefined}
        transition={animated ? { duration: 0.3, delay: 0.8 } : undefined}
      />
      
      {/* Right Minaret */}
      <motion.rect
        x="127"
        y="85"
        width="8"
        height="35"
        fill="#b8bec4"
        rx="1"
        initial={animated ? { opacity: 0, y: 20 } : undefined}
        animate={animated ? { opacity: 1, y: 0 } : undefined}
        transition={animated ? { duration: 0.5, delay: 0.7 } : undefined}
      />
      <motion.rect
        x="126"
        y="83"
        width="10"
        height="3"
        fill="#9ca3af"
        initial={animated ? { opacity: 0, scale: 0 } : undefined}
        animate={animated ? { opacity: 1, scale: 1 } : undefined}
        transition={animated ? { duration: 0.3, delay: 0.75 } : undefined}
      />
      <motion.ellipse
        cx="131"
        cy="82"
        rx="4"
        ry="3"
        fill="#9ca3af"
        initial={animated ? { opacity: 0, scale: 0 } : undefined}
        animate={animated ? { opacity: 1, scale: 1 } : undefined}
        transition={animated ? { duration: 0.3, delay: 0.78 } : undefined}
      />
      <motion.circle
        cx="131"
        cy="78"
        r="2"
        fill="#2d7b7f"
        initial={animated ? { opacity: 0, scale: 0 } : undefined}
        animate={animated ? { opacity: 1, scale: 1 } : undefined}
        transition={animated ? { duration: 0.3, delay: 0.8 } : undefined}
      />
      
      {/* Main Building */}
      <motion.rect
        x="80"
        y="95"
        width="40"
        height="25"
        fill="#d1d5db"
        rx="2"
        initial={animated ? { opacity: 0, y: 20 } : undefined}
        animate={animated ? { opacity: 1, y: 0 } : undefined}
        transition={animated ? { duration: 0.5, delay: 0.85 } : undefined}
      />
      
      {/* Entrance Arch */}
      <motion.path
        d="M 95 120 L 95 105 A 5 5 0 0 1 105 105 L 105 120 Z"
        fill="#6b7280"
        initial={animated ? { opacity: 0, scale: 0 } : undefined}
        animate={animated ? { opacity: 1, scale: 1 } : undefined}
        transition={animated ? { duration: 0.3, delay: 0.9 } : undefined}
        style={{ originY: "50%", originX: "50%" }}
      />
      
      {/* Text "Et Taqwa" */}
      <motion.text
        x="100"
        y="165"
        fontSize="24"
        fontWeight="600"
        fill="#2d7b7f"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="-0.5"
        initial={animated ? { opacity: 0, y: 10 } : undefined}
        animate={animated ? { opacity: 1, y: 0 } : undefined}
        transition={animated ? { duration: 0.5, delay: 1 } : undefined}
      >
        Et Taqwa
      </motion.text>
    </motion.svg>
  );
};

export default Logo;
