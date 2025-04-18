import tinyColor from 'tinycolor2';

export const getCalendarStyles = (theme: any) => {
  const primaryColor = theme.colors.primary500;
  const eventBgColor = theme.colors.primary600;
  const bgButtonColor = theme.colors.neutral0;
  const hoverBgButtonColor = theme.colors.neutral100;
  const borderButtonColor = theme.colors.neutral200;
  const disabledBackgroundColor = theme.colors.danger500;

  const tableBorderColor = tinyColor(theme.colors.neutral200)
    .spin(5)
    .saturate(3)
    .darken(11)
    .toHexString();

  const todayBgColor = tinyColor(primaryColor).spin(-1).desaturate(65).darken(46).toHexString();
  const disabledBgColor = tinyColor(disabledBackgroundColor)
    .spin(-47)
    .desaturate(64)
    .darken(47)
    .toHexString();

  return `
    :root {
      --fc-border-color: ${tableBorderColor};
      --fc-page-bg-color: transparent;
      --fc-button-bg-color: ${bgButtonColor};
      --fc-button-active-bg-color: ${primaryColor};
      --fc-button-active-border-color: ${primaryColor};
      --fc-button-hover-bg-color: ${hoverBgButtonColor};
      --fc-button-border-color: ${borderButtonColor};
      --fc-button-hover-border-color: ${borderButtonColor};
      --fc-event-border-color: ${eventBgColor};
      --fc-event-bg-color: ${eventBgColor};
      --fc-event-text-color: ${theme.colors.neutral0};
      --fc-today-bg-color: ${tinyColor(primaryColor).setAlpha(0.1).toString()};
      --fc-disabled-bg-color: ${tinyColor(disabledBackgroundColor).setAlpha(0.1).toString()};
    }

    .fc {
      font-size: 1.4em;
    }

    .fc-button, .fc-toolbar-title, .fc-col-header-cell-cushion {
      text-transform: capitalize !important;
    }

    .fc-toolbar-title {
      font-weight: bold !important;
    }

    .fc-button-group {
      gap: 0.5rem !important;
    }

    .fc-button {
      height: 4rem !important;
      padding: 0rem 1rem !important;
      border-radius: ${theme.borderRadius} !important;
      transition: all 0.1s ease-in-out !important;
    }

    .fc-button > span.fc-icon {
      vertical-align: baseline !important;
    }

    .fc-day-today {
      background-color: ${todayBgColor} !important;
    }

    .fc-day-disabled {
      background-color: ${disabledBgColor} !important;
    }

    .fc-timegrid-slots tr {
      height: 4em;
    }

    .fc-daygrid-day-frame {
      min-height: 12em !important;
    }

    /* Event styling */
    .fc-event {
      padding: 3px 6px !important;
      border-radius: 4px !important;
    }

    .fc-event-time-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
      flex-wrap: nowrap;
      width: 100%;
      gap: 10px;
    }

    .fc-timegrid-event .fc-event-time {
      font-size: 12px;
      letter-spacing: .1px;
      line-height: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-font-smoothing: antialiased;
      flex-shrink: 0;
    }

    .fc .fc-timegrid-slot-minor {
      border-top-style: hidden !important;
    }

    .fc-event-client-name {
      font-size: 1.1em;
      opacity: 0.9;
      font-style: italic;
      margin-left: 6px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-shrink: 1;
      max-width: calc(100% - 65px);
    }

    .fc-event-title {
      font-size: 12px;
      letter-spacing: .1px;
      font-weight: 500;
      line-height: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-font-smoothing: antialiased;
    }

    .fc-event-title strong {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      display: block;
    }

    /* Appointment badge */
    .fc-event-new-badge {
      position: absolute;
      bottom: 0;
      right: -.3em;
      background-color: white;
      color: ${theme.colors.primary500};
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.8em;
      font-weight: bold;
      white-space: nowrap;
      flex-shrink: 0;
      z-index: 1;
    }

    /* Styling for new appointment in the appointment creation flow */
    .fc-event[data-event-id="new-appointment"] {
      background-color: ${eventBgColor} !important;
      border-color: ${eventBgColor} !important;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2) !important;
      cursor: move !important;
    }

    .fc-event[data-event-id="new-appointment"]:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
      transform: translateY(-1px) !important;
      transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out !important;
    }

    /* Highlight available slots with a subtle background when hovering */
    .fc-timegrid-col:hover .fc-timegrid-col-bg {
      background-color: ${tinyColor(primaryColor).setAlpha(0.05).toString()} !important;
    }

    /* Make sure events don't get cut off */
    .fc-timegrid-event-harness {
      overflow: visible !important;
    }

    .fc-timegrid-event {
      overflow: hidden !important;
    }

    .fc-daygrid-day-events a,
    .fc-daygrid-day-events a:hover,
    .fc-daygrid-day-events a:visited,
    .fc-daygrid-day-events a:active {
      color: ${theme.colors.neutral1000};
    }

    .fc-theme-standard td,
    .fc-theme-standard th {
      border-color: ${tableBorderColor} !important;
    }

    .fc-theme-standard .fc-scrollgrid {
      border-color: ${tableBorderColor} !important;
    }

    .fc-col-header-cell {
      background-color: ${theme.colors.neutral100};
      padding: 0.5rem;
    }

    .fc-col-header-cell-cushion {
      font-weight: 500;
      color: ${theme.colors.neutral700};
    }

    /* Now indicator styling */
    .fc-timegrid-now-indicator-line {
      border-color: ${theme.colors.danger500} !important;
    }

    .fc-timegrid-now-indicator-arrow {
      border-color: ${theme.colors.danger500} !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
    }

    /* Make background events non-interactive */
    .fc .fc-bg-event {
      cursor: not-allowed !important;
    }
  `;
};
