import { CorsOptions } from 'cors';

export const configCors: CorsOptions = {
  origin: [process.env.CONFIG_CORS_ORIGIN!],
  credentials: true,
};
