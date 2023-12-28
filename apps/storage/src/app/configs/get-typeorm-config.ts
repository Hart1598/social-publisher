import config from "./typeorm.config";

export const getTypeormConfig = () => {
  return {
    inject: [],
    useFactory: async () => {
      return config;
    },
  }
}
