import path from 'path';

const envsPath = path.resolve('envs');

export const appName = 'external-auth';

const env = process.env.NODE_ENV;

export const localEnvPath = `${envsPath}/.env.${appName}.${env}.local`

export const envPath = `${envsPath}/.env.${appName}.${env}`;

export const envFilePath = [localEnvPath, envPath];
