import tinyColor from 'tinycolor2';

export const getCalendarStyles = (theme: any) => {
  const primaryColor = theme.colors.primary600;
  const lightPrimaryColor = tinyColor(primaryColor).lighten().toString();

  return `
    :root {
      --fc-page-bg-color: transparent;
      --fc-button-bg-color: ${primaryColor};
      --fc-button-active-bg-color: ${lightPrimaryColor};
      --fc-button-hover-bg-color: ${lightPrimaryColor};
      --fc-button-border-color: ${theme.colors.neutral200};
      --fc-button-active-border-color: ${theme.colors.neutral200};
      --fc-border-color: ${theme.colors.neutral200};
      --fc-event-border-color: ${primaryColor};
      --fc-event-bg-color: ${primaryColor};
      --fc-event-text-color: ${theme.colors.neutral0};
      --fc-today-bg-color: ${tinyColor(primaryColor).setAlpha(0.1).toString()};
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

    .fc-button {
      padding: 0.6em 1.2em !important;
      border-radius: ${theme.borderRadius} !important;
    }

    .fc-day-today {
      background-color: ${tinyColor(primaryColor).setAlpha(0.1).toString()} !important;
    }

    .fc-timegrid-slots tr {
      height: 3.75em;
    }

    .fc-daygrid-day-frame {
      min-height: 10em !important;
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
      font-size: 1.1em;
      opacity: 0.9;
      white-space: nowrap;
      flex-shrink: 0;
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
      font-size: 1.1em;
      font-weight: 600;
      word-wrap: break-word;
      white-space: normal;
      line-height: 1.3;
      overflow-wrap: break-word;
      overflow: hidden;
    }

    .fc-event-title strong {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: normal;
      display: block;
      max-height: 2.6em; /* Approximately 2 lines of text */
    }

    /* Make sure events don't get cut off */
    .fc-timegrid-event-harness {
      overflow: visible !important;
    }

    .fc-timegrid-event {
      overflow: visible !important;
    }

    .fc-daygrid-day-events a,
    .fc-daygrid-day-events a:hover,
    .fc-daygrid-day-events a:visited,
    .fc-daygrid-day-events a:active {
      color: ${theme.colors.neutral1000};
    }

    .fc-theme-standard td,
    .fc-theme-standard th {
      border-color: ${theme.colors.neutral200} !important;
    }

    .fc-theme-standard .fc-scrollgrid {
      border-color: ${theme.colors.neutral200} !important;
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
  `;
};
