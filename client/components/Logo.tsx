import React from "react";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ showText = true, size = "md" }) => {
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const textSizeMap = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${sizeMap[size]} bg-gradient-to-br from-muted-blue to-natural-green rounded-lg flex items-center justify-center flex-shrink-0`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="w-full h-full p-1 text-white"
        >
          {/* Handshake mark - representing connection between workers and employers */}
          <path
            d="M4 14c0-1.105.895-2 2-2h5v2H6v12h6v-3h2v3h6V14h-5v-2h5c1.105 0 2 .895 2 2v12c0 1.105-.895 2-2 2H6c-1.105 0-2-.895-2-2V14z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path
            d="M11 10c1.105 0 2 .895 2 2v10h-4v-3h-2v3c0 1.105.895 2 2 2h4c1.105 0 2-.895 2-2V12c0-1.105.895-2 2-2s2 .895 2 2v10h2v-10c0-2.209-1.791-4-4-4s-4 1.791-4 4v10h-2V12c0-1.105.895-2 2-2z"
            fill="currentColor"
          />
        </svg>
      </div>
      {showText && (
        <span className={`${textSizeMap[size]} font-bold text-foreground`}>
          Zipity
        </span>
      )}
    </div>
  );
};

export default Logo;
