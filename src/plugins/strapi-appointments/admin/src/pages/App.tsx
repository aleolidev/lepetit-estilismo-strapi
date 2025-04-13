import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';

import { CalendarPage } from './calendar';
import { NewAppointmentPage } from './new-appointment';
import { EditAppointmentPage } from './edit-appointment';
import { SettingsPage } from './settings';

const App = () => {
  return (
    <Routes>
      <Route index element={<CalendarPage />} />
      <Route path="calendar" element={<CalendarPage />} />
      <Route path="new-appointment" element={<NewAppointmentPage />} />
      <Route path="edit-appointment/:id" element={<EditAppointmentPage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="*" element={<Page.Error />} />
    </Routes>
  );
};

export { App };
