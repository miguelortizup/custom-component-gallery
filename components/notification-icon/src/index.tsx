import { Retool } from '@tryretool/custom-component-support';
import { useRef, useState, useEffect } from 'react';

const BellIcon = ({ size, color = '#333' }: { size: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-label="bell"
    role="img"
    style={{ display: 'block' }}
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export const NotificationIcon = () => {
  Retool.useComponentSettings({
    defaultHeight: 4,
    defaultWidth: 3,
  });

  const [notificationCount] = Retool.useStateNumber({
    name: 'notificationCount',
    initialValue: 0,
    description: 'Number to show in the badge. Badge is hidden when 0 or not set.',
  });

  const [iconColor] = Retool.useStateString({
    name: 'iconColor',
    initialValue: '#333333',
    description: 'Color of the icon.',
  });

  const [maxSize] = Retool.useStateNumber({
    name: 'maxSize',
    initialValue: 64,
    description:
      'Maximum size of the icon in pixels. The icon scales to fill the component but never exceeds this value.',
  });

  // Measure the actual rendered container to compute a correct icon size at any bounds
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        // Use the shorter side so the icon always fits without overflow
        setContainerSize(Math.floor(Math.min(width, height)));
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const iconSize = Math.min(containerSize > 0 ? containerSize : maxSize, maxSize);

  const showBadge = typeof notificationCount === 'number' && notificationCount > 0;
  const badgeLabel = notificationCount > 99 ? '99+' : String(notificationCount);

  // Badge dimensions scale with the icon
  const badgeDiameter = Math.max(14, Math.round(iconSize * 0.36));
  const badgeFontSize = Math.max(8, Math.round(iconSize * 0.22));

  return (
    // Outer wrapper: fills the full Retool component area with no scrollbars
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Icon + badge: square, sized to the measured container (capped at maxSize) */}
      <div style={{ position: 'relative', width: iconSize, height: iconSize, flexShrink: 0 }}>
        <BellIcon size={iconSize} color={iconColor} />

        {showBadge && (
          <span
            aria-label={`${notificationCount} notifications`}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              // Centre the badge circle on the top-right corner of the icon
              transform: 'translate(50%, -50%)',
              minWidth: badgeDiameter,
              height: badgeDiameter,
              borderRadius: 9999,
              backgroundColor: '#e53e3e',
              color: '#ffffff',
              fontSize: badgeFontSize,
              fontWeight: 700,
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: `0 ${Math.max(3, Math.round(badgeDiameter * 0.25))}px`,
              boxSizing: 'border-box',
              pointerEvents: 'none',
              fontFamily: 'sans-serif',
            }}
          >
            {badgeLabel}
          </span>
        )}
      </div>
    </div>
  );
};
