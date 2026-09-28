import React, { useEffect, useRef, useState, useCallback } from 'react';
import whiteBallImg from '../../assets/cricket_ball_white2.png';

export const CustomCursor = () => {
  const ballRef = useRef(null);
  const posRef = useRef({ mx: -100, my: -100, rx: -100, ry: -100 });
  const [activeShot, setActiveShot] = useState(null);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer:fine)').matches;
    setIsFinePointer(fine);

    const pos = posRef.current;
    let animId;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isTouchSwiping = false;
    let lastTouchShotTime = 0;

    const handleMouseMove = (e) => {
      pos.mx = e.clientX;
      pos.my = e.clientY;
    };

    const triggerShot = (clientX, clientY, target) => {
      if (isAnimatingRef.current) return;
      if (target && target.closest && target.closest('button, a, input, select, textarea, [role="button"]')) return;

      isAnimatingRef.current = true;

      const isSix = Math.random() > 0.45;
      const dist = isSix ? Math.floor(Math.random() * 28) + 98 : null;

      const angle = (Math.random() * 60 - 30) * (Math.PI / 180);
      const speed = isSix ? 20 + Math.random() * 6 : 15 + Math.random() * 4;

      setActiveShot({
        id: Date.now(),
        x: clientX,
        y: clientY,
        isSix,
        dist,
        vx: Math.sin(angle) * speed,
        vy: -(speed * 0.95 + Math.random() * 3),
      });
    };

    const handleClick = (e) => {
      // Prevent synthetic click duplicate right after a touch tap
      if (Date.now() - lastTouchShotTime < 500) return;
      triggerShot(e.clientX, e.clientY, e.target);
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
        isTouchSwiping = false;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        if (Math.hypot(dx, dy) > 8) {
          isTouchSwiping = true;
        }
      }
    };

    const handleTouchEnd = (e) => {
      if (isTouchSwiping) return; // User was scrolling/swiping!
      const duration = Date.now() - touchStartTime;
      if (duration > 350) return; // Long press/hold, not a tap

      if (e.changedTouches && e.changedTouches[0]) {
        const touch = e.changedTouches[0];
        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;
        if (Math.hypot(dx, dy) <= 8) {
          lastTouchShotTime = Date.now();
          triggerShot(touch.clientX, touch.clientY, e.target);
        }
      }
    };

    if (fine) {
      const loop = () => {
        pos.rx += (pos.mx - pos.rx) * 0.22;
        pos.ry += (pos.my - pos.ry) * 0.22;
        if (ballRef.current) {
          ballRef.current.style.transform = `translate3d(${pos.rx}px, ${pos.ry}px, 0) translate(-50%, -50%)`;
        }
        animId = requestAnimationFrame(loop);
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      animId = requestAnimationFrame(loop);
    }

    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      if (fine) {
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animId);
      }
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };

  }, []);

  const onShotDone = useCallback(() => {
    setActiveShot(null);
    isAnimatingRef.current = false;
  }, []);

  return (
    <>
      {/* Desktop Mouse Ball Cursor (Only on fine pointer devices) */}
      {isFinePointer && (
        <div
          ref={ballRef}
          className="fixed top-0 left-0 pointer-events-none z-[999999]"
          style={{ willChange: 'transform' }}
        >
          <div className="w-7 h-7 rounded-full overflow-hidden">
            <img
              src={whiteBallImg}
              alt=""
              className="w-full h-full object-cover rounded-full pointer-events-none select-none cursor-ball-spin"
              draggable={false}
            />
          </div>
        </div>
      )}

      {/* Shot Launch & Score Badge (Fires on both desktop and mobile on empty area click/tap) */}
      {activeShot && (
        <ShotScene key={activeShot.id} shot={activeShot} onDone={onShotDone} />
      )}
    </>
  );
};

/* ─── Shot Launch: Shockwave, Sparks, Flying Ball & Score Badge ─── */
const ShotScene = ({ shot, onDone }) => {
  const ballEl = useRef(null);
  const badgeEl = useRef(null);
  const impactRingEl = useRef(null);
  const sparksRef = useRef([]);

  useEffect(() => {
    const TOTAL_FRAMES = shot.isSix ? 65 : 52;

    let px = shot.x;
    let py = shot.y;
    let vx = shot.vx;
    let vy = shot.vy;
    const gravity = shot.isSix ? 0.35 : 0.48;
    const drag = 0.991;
    let rotation = 0;
    const spinRate = (1500 + Math.random() * 800) * (Math.random() > 0.5 ? 1 : -1);

    // Sweet-spot sparks bursting outwards
    const sparkParticles = Array.from({ length: 6 }).map((_, i) => {
      const angle = (i / 6) * Math.PI * 2 + Math.random() * 0.4;
      const spd = 4 + Math.random() * 6;
      return {
        x: shot.x,
        y: shot.y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 2,
        opacity: 1,
      };
    });

    let frame = 0;
    let animId;

    const animate = () => {
      frame++;
      const t = frame / TOTAL_FRAMES;

      /* ── 1. Impact Shockwave & Sparks (first 10 frames) ── */
      if (frame <= 10) {
        const impactT = frame / 10;
        if (impactRingEl.current) {
          const ringScale = 0.3 + impactT * 2.4;
          const ringOpacity = (1 - impactT) * 0.9;
          impactRingEl.current.style.transform = `translate3d(${shot.x}px, ${shot.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
          impactRingEl.current.style.opacity = ringOpacity;
        }

        sparkParticles.forEach((sp, i) => {
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.vy += 0.3;
          sp.opacity = Math.max(0, 1 - impactT * 1.4);
          const el = sparksRef.current[i];
          if (el) {
            el.style.transform = `translate3d(${sp.x}px, ${sp.y}px, 0) translate(-50%, -50%) scale(${1 - impactT * 0.5})`;
            el.style.opacity = sp.opacity;
          }
        });
      } else {
        if (impactRingEl.current) impactRingEl.current.style.opacity = 0;
        sparksRef.current.forEach((el) => {
          if (el) el.style.opacity = 0;
        });
      }

      /* ── 2. Ball Flight Trajectory ── */
      vx *= drag;
      vy += gravity;
      vy *= drag;
      px += vx;
      py += vy;
      rotation += spinRate * 0.016;

      const scale = Math.max(0.18, 1 - t * 0.76);
      const ballOpacity = t < 0.7 ? 1 : Math.max(0, 1 - (t - 0.7) / 0.3);

      if (ballEl.current) {
        ballEl.current.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`;
        ballEl.current.style.opacity = ballOpacity;
      }

      /* ── 3. Aesthetic Score Badge (Distance shown only for SIX) ── */
      if (badgeEl.current) {
        const fadeIn = Math.min(1, frame / 6);
        const fadeOut = t > 0.65 ? Math.max(0, 1 - (t - 0.65) / 0.35) : 1;
        const badgeY = shot.y - t * 55;
        const badgeScale = frame < 10 ? 0.75 + (frame / 10) * 0.3 : 1.05 - t * 0.1;

        badgeEl.current.style.opacity = fadeIn * fadeOut;
        badgeEl.current.style.transform = `translate3d(${shot.x}px, ${badgeY}px, 0) translate(-50%, -50%) scale(${badgeScale})`;
      }

      if (frame < TOTAL_FRAMES) {
        animId = requestAnimationFrame(animate);
      } else {
        onDone();
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [shot, onDone]);

  return (
    <>
      {/* Impact Shockwave Ring */}
      <div
        ref={impactRingEl}
        className="fixed top-0 left-0 pointer-events-none z-[999997] w-12 h-12 rounded-full border border-white/80"
        style={{
          willChange: 'transform, opacity',
          opacity: 0,
          boxShadow: shot.isSix
            ? '0 0 16px rgba(230,0,0,0.8), inset 0 0 8px rgba(255,255,255,0.8)'
            : '0 0 12px rgba(255,255,255,0.9)',
        }}
      />

      {/* Sparks bursting from click point */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (sparksRef.current[i] = el)}
          className="fixed top-0 left-0 pointer-events-none z-[999997] w-1.5 h-1.5 rounded-full"
          style={{
            willChange: 'transform, opacity',
            opacity: 0,
            background: i % 2 === 0 ? '#FFFFFF' : (shot.isSix ? '#FF4D4D' : '#FFD700'),
            boxShadow: '0 0 4px rgba(255,255,255,0.9)',
          }}
        />
      ))}

      {/* Flying White Match Ball */}
      <div
        ref={ballEl}
        className="fixed top-0 left-0 pointer-events-none z-[999997] w-7 h-7 rounded-full overflow-hidden"
        style={{ willChange: 'transform, opacity', opacity: 0 }}
      >
        <img
          src={whiteBallImg}
          alt=""
          className="w-full h-full object-cover rounded-full pointer-events-none select-none"
          draggable={false}
        />
      </div>

      {/* Aesthetic Minimal Score Badge (Distance shown only for SIX) */}
      <div
        ref={badgeEl}
        className="fixed top-0 left-0 pointer-events-none z-[999999] flex items-center gap-1.5 rounded-full font-mono font-bold uppercase tracking-widest select-none shadow-lg"
        style={{
          padding: '4px 12px',
          fontSize: '11px',
          backgroundColor: shot.isSix ? '#E60000' : '#FFFFFF',
          color: shot.isSix ? '#FFFFFF' : '#000000',
          border: shot.isSix ? '1px solid #FF4D4D' : '1px solid #E60000',
          boxShadow: shot.isSix
            ? '0 2px 16px rgba(230,0,0,0.5)'
            : '0 2px 12px rgba(0,0,0,0.2)',
          opacity: 0,
          willChange: 'transform, opacity',
        }}
      >
        <span>{shot.isSix ? 'SIX!' : 'FOUR!'}</span>
        {shot.isSix && shot.dist && (
          <span style={{ fontSize: '9px', opacity: 0.75 }}>{shot.dist}m</span>
        )}
      </div>
    </>
  );
};
