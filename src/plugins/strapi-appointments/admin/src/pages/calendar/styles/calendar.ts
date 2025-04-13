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
      font-size: 1.3em;
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
      height: 3.5em;
    }

    .fc-daygrid-day-frame {
      min-height: 10em !important;
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

    .fc-daygrid-day {
      background-color: ${theme.colors.neutral0};
    }

    .fc-timegrid-slot {
      background-color: ${theme.colors.neutral0};
    }

    .fc-timegrid-slot-lane {
      background-color: ${theme.colors.neutral0};
    }

    .fc-timegrid-axis {
      background-color: ${theme.colors.neutral100};
    }
  `;
};
