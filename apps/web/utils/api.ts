import { contract } from "@repo/contract/client";
import { getApiUrl } from "./env";
import { logout } from "./helpers";
import { initQueryClient } from "@ts-rest/react-query";
import { tsRestFetchApi } from "@ts-rest/core";
import Cookies from "js-cookie";

const queryClient = (authToken: string | undefined) => {
  return initQueryClient(contract, {
    baseUrl: getApiUrl(),
    baseHeaders: {
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    api: async (args) => {
      const response = await tsRestFetchApi(args);

      if (response.status === 401) {
        Cookies.remove("userToken");
        logout(true);
      }
      return response;
    },
  });
};

export const getQueryClient = () => {
  const token = Cookies.get("userToken");
  return queryClient(token);
};
