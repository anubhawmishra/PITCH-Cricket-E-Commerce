import React from 'react';

export const SeamDivider = () => {
  return (
    <div className="seam-divider absolute top-0 left-0 right-0">
      <svg viewBox="0 0 400 10" preserveAspectRatio="none">
        <path
          d="M0 5 Q 10 0, 20 5 T 40 5 T 60 5 T 80 5 T 100 5 T 120 5 T 140 5 T 160 5 T 180 5 T 200 5 T 220 5 T 240 5 T 260 5 T 280 5 T 300 5 T 320 5 T 340 5 T 360 5 T 380 5 T 400 5"
          stroke="#FF0000"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 4"
        />
      </svg>
    </div>
  );
};
