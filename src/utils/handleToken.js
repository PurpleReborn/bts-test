import * as jwt from "jwt-decode";

export const isTokenExpired = (token) => {
  try {
    const decodedToken = jwt(token);
    if (!decodedToken) {
      return true;
    }

    const currentTime = Date.now()
    if (decodedToken.exp < currentTime.getTime()) {
      return true;
    }

    return false;
  } catch (error) {
    return true;
  }
};
