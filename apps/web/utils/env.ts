const publicRuntimeConfig =
  require("next/config").default().publicRuntimeConfig;

const { apiUrl, env } = publicRuntimeConfig;

export const getApiUrl = () => {
  return apiUrl;
};

export const getEnv = () => {
  return env;
};
