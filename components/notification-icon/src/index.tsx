import { Retool } from '@tryretool/custom-component-support';

const BellIcon = ({ size = 32, color = '#333' }: { size?: number; color?: string }) => (
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

  const [iconSize] = Retool.useStateNumber({
    name: 'iconSize',
    initialValue: 32,
    description: 'Size of the icon in pixels.',
  });

  const showBadge = typeof notificationCount === 'number' && notificationCount > 0;
  const badgeLabel = notificationCount > 99 ? '99+' : String(notificationCount);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: iconSize,
        height: iconSize,
      }}
    >
      <BellIcon size={iconSize} color={iconColor} />

      {showBadge && (
        <span
          aria-label={`${notificationCount} notifications`}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            transform: 'translate(40%, -40%)',
            minWidth: Math.max(16, Math.round(iconSize * 0.5)),
            height: Math.max(16, Math.round(iconSize * 0.5)),
            borderRadius: 9999,
            backgroundColor: '#e53e3e',
            color: '#ffffff',
            fontSize: Math.max(9, Math.round(iconSize * 0.28)),
            fontWeight: 700,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 4px',
            boxSizing: 'border-box',
            pointerEvents: 'none',
            fontFamily: 'sans-serif',
          }}
        >
          {badgeLabel}
        </span>
      )}
    </div>
  );
};
