import { notificationEnvSchema } from "@app/validators";
import { envFilePath } from "./env.config";
import dotenv from 'dotenv';
import { envPath } from './env.config';

dotenv.config({ path: envPath });

export const getConfigModule = () => {
  return {
    envFilePath,
    validate: () => {
      return notificationEnvSchema.parse(process.env);
    },
    isGlobal: true,
  }
}
