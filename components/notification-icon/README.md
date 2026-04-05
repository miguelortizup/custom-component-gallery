# NotificationIcon

A Retool Custom Component that renders a bell icon with an optional notification badge. The badge is a small red circle with a white number that overlays the top-right corner of the icon — identical to the notification indicators seen in most mobile and web apps.

## Features

- 🔔 Bell icon rendered as an inline SVG (no extra dependencies)
- 🔴 Red badge with white number appears when `notificationCount > 0`
- ❌ Badge is hidden automatically when count is `0` or not provided
- 🎨 Configurable icon color and max size via component props
- 💯 Badge label caps at `99+` to avoid overflow

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `notificationCount` | number | `0` | Number shown in the badge. Badge hidden when `0`. |
| `iconColor` | string | `"#333333"` | Stroke color of the icon. |
| `maxSize` | number | `64` | Maximum icon size in pixels. The icon scales to fill the component container but never exceeds this value. |

## Installation

1. In your Retool app, add a **Custom Component** from the component panel.
2. Import this component library:
   - Open the Custom Component settings panel.
   - Under **"Import"**, paste the URL of this component's `src/index.tsx` or follow the Retool custom component import flow for GitHub-hosted components.
3. The component will appear as **NotificationIcon** in the component library.

## Usage

### Basic — badge visible

Set `notificationCount` to any positive integer to show the badge:

```
notificationCount = 5
```

The component renders a bell with a red badge showing **5**.

### No badge

Leave `notificationCount` at `0` (the default) or do not bind it. The bell renders cleanly with no badge.

### Custom size and color

```
maxSize = 48
iconColor = "#1a73e8"
notificationCount = 12
```

### Badge overflow

When `notificationCount` exceeds `99`, the badge displays **99+**.

## Example Retool wiring

Bind `notificationCount` to a query result that counts unread items:

```js
// Model / transformer
{{ unreadMessages.data.count }}
```

When the count updates, the badge updates automatically.

## Author

Created by [@MiguelOrtiz](https://community.retool.com/u/MiguelOrtiz) for the Retool community.
