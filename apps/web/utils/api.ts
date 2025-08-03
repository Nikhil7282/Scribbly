import { contract } from "@repo/contract/client";
import { logout } from "./helpers";
import { initQueryClient } from "@ts-rest/react-query";
import { tsRestFetchApi } from "@ts-rest/core";
import Cookies from "js-cookie";
import { BASE_URL } from "./constants";

const queryClient = (authToken: string | undefined) => {
  return initQueryClient(contract, {
    baseUrl: BASE_URL,
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
