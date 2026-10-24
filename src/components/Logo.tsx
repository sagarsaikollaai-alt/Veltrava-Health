import React from 'react';

export type LogoVariant = 'horizontal' | 'circular' | 'symbol' | 'stacked';

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  className = '',
  size = 'md',
  showTagline = false,
}) => {
  // Height classes by size: tuned for mobile clarity while preserving desktop scale
  const heightClasses = {
    sm: 'h-7 sm:h-9',
    md: 'h-8 sm:h-10 md:h-11',
    lg: 'h-10 sm:h-12 md:h-14',
    xl: 'h-14 sm:h-16 md:h-20',
  };

  const symbolHeightClasses = {
    sm: 'h-7 w-7 sm:h-8 sm:w-8',
    md: 'h-8 w-8 sm:h-10 sm:w-10',
    lg: 'h-10 w-10 sm:h-12 sm:w-12',
    xl: 'h-14 w-14 sm:h-16 sm:w-16',
  };

  if (variant === 'circular') {
    return (
      <div className={`flex items-center gap-2.5 sm:gap-3 shrink-0 ${className}`}>
        <img
          src="/assets/brand/veltrava_logo_circular.png"
          alt="VELTRAVA HEALTH — Your RCM Partner Worldwide"
          className={`${symbolHeightClasses[size]} object-contain`}
          loading="eager"
        />
        {showTagline && (
          <span className="hidden sm:inline-block text-xs font-medium text-[#718096] border-l border-[#DCE8F2] pl-3">
            Your RCM Partner Worldwide
          </span>
        )}
      </div>
    );
  }

  if (variant === 'symbol') {
    return (
      <img
        src="/assets/brand/veltrava_symbol.png"
        alt="VELTRAVA HEALTH Emblem"
        className={`${symbolHeightClasses[size]} object-contain ${className}`}
        loading="eager"
      />
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <img
          src="/assets/brand/veltrava_logo_stacked.png"
          alt="VELTRAVA HEALTH — Your RCM Partner Worldwide"
          className={`${heightClasses[size]} w-auto object-contain`}
          loading="eager"
        />
        {showTagline && (
          <span className="text-xs font-medium text-[#718096] mt-2 tracking-wide">
            Your RCM Partner Worldwide
          </span>
        )}
      </div>
    );
  }

  // Default: Horizontal Logo (Website Header, Documents, Footer)
  return (
    <div className={`flex items-center gap-2 sm:gap-3 shrink-0 ${className}`}>
      <img
        src="/assets/brand/veltrava_logo_horizontal.png"
        alt="VELTRAVA HEALTH — Your RCM Partner Worldwide"
        className={`${heightClasses[size]} w-auto max-w-[165px] min-[380px]:max-w-[200px] sm:max-w-[280px] object-contain`}
        loading="eager"
      />
      {showTagline && (
        <span className="hidden xl:inline-block text-xs font-medium text-[#718096] border-l border-[#DCE8F2] pl-3 whitespace-nowrap">
          Your RCM Partner Worldwide
        </span>
      )}
    </div>
  );
};
