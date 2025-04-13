import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { CalendarIcon, PlusIcon, SettingsIcon } from './components/icons';

export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}/calendar`,
      icon: CalendarIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.calendar`,
        defaultMessage: 'Calendar',
      },
      Component: async () => {
        const { CalendarPage } = await import('./pages/calendar');

        return CalendarPage;
      },
    });

    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}/new-appointment`,
      icon: PlusIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.new-appointment`,
        defaultMessage: 'New Appointment',
      },
      Component: async () => {
        const { NewAppointmentPage } = await import('./pages/new-appointment');

        return NewAppointmentPage;
      },
    });

    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}/settings`,
      icon: SettingsIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.settings`,
        defaultMessage: 'Settings',
      },
      Component: async () => {
        const { SettingsPage } = await import('./pages/settings');

        return SettingsPage;
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
