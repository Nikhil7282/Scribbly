import Cookies from "js-cookie";

export const logout = (isUnauthorised: boolean = false) => {
  if (Cookies.get("userToken")) {
    Cookies.remove("userToken");
  }
  window.location.href = "/login?ua=" + isUnauthorised;
};
