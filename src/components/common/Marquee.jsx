import React from 'react';

export const Marquee = () => {
  return (
    <div className="border-b border-[var(--carbon-line)] overflow-hidden bg-willow text-bone py-3.5 flex items-center select-none">
      <div className="animate-marquee whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
        <span>GRADE 1 ENGLISH WILLOW &nbsp;✦&nbsp; SENSOR-CALIBRATED PICKUP &nbsp;✦&nbsp; HAND-PRESSED, NOT MACHINE-STAMPED &nbsp;✦&nbsp; WORLDWIDE DISPATCH &nbsp;✦&nbsp; </span>
        <span>GRADE 1 ENGLISH WILLOW &nbsp;✦&nbsp; SENSOR-CALIBRATED PICKUP &nbsp;✦&nbsp; HAND-PRESSED, NOT MACHINE-STAMPED &nbsp;✦&nbsp; WORLDWIDE DISPATCH &nbsp;✦&nbsp; </span>
      </div>
    </div>
  );
};
