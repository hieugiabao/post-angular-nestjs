import { Inject } from '@nestjs/common';
import { registerAs, ConfigType } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  host: process.env.APP_HOST || 'localhost',
  port: Number(process.env.APP_PORT) || 3000,
  scheme: process.env.APP_SCHEME || 'http',
  get domain() {
    return `${this.scheme}://${this.host}:${this.port}`;
  }
}));

export type AppConfig = ConfigType<typeof appConfig>;
export const InjectAppConfig = () => Inject(appConfig.KEY);
