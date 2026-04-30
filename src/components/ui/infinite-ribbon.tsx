'use client';

export function InfiniteRibbon() {
  const slogan = "EVERY EGG, EVERY DAY, DONE RIGHT • ";
  const repeatedText = slogan.repeat(12); // Sufficient length for the scroll animation

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none opacity-20"
      aria-hidden="true"
    >
      <svg 
        className="w-full h-full object-cover min-w-[1400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
        viewBox="0 0 1920 1080" 
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path 
            id="squiggly-ribbon-path" 
            d="M -200,1100 C 200,1100 400,950 800,850 C 1200,750 1400,600 1700,400 C 1900,266 2000,100 2200,-100" 
            fill="transparent" 
          />
        </defs>
        
        {/* Soft blur copy for a glow effect */}
        <text className="text-[36px] md:text-[48px] font-extrabold uppercase tracking-widest fill-brand-gold/40" style={{ filter: 'blur(8px)' }}>
          <textPath href="#squiggly-ribbon-path" startOffset="0%">
            {repeatedText}
            <animate 
              attributeName="startOffset" 
              from="0%" 
              to="-200%" 
              begin="0s" 
              dur="180s" 
              repeatCount="indefinite" 
            />
          </textPath>
        </text>

        {/* Sharp core text */}
        <text className="text-[16px] md:text-[28px] font-extrabold uppercase tracking-widest fill-brand-gold/50">
          <textPath href="#squiggly-ribbon-path" startOffset="0%">
            {repeatedText}
            <animate 
              attributeName="startOffset" 
              from="0%" 
              to="-200%" 
              begin="0s" 
              dur="180s" 
              repeatCount="indefinite" 
            />
          </textPath>
        </text>
      </svg>
    </div>
  );
}
