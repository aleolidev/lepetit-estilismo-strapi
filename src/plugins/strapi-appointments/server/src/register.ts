import type { Core } from '@strapi/strapi';
import { registerComponents } from './utils/components/register';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase
  registerComponents(strapi);
};

export default register;
