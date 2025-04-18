import { CalendarProvider } from './contexts/calendar-context';
import { CalendarContent } from './components/calendar-content';

const CalendarPage = () => {
  return (
    <CalendarProvider>
      <CalendarContent />
    </CalendarProvider>
  );
};

export { CalendarPage };
