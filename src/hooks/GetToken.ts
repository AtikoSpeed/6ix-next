import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { authenticate } from "@commercelayer/js-auth";
import { parseEndpoint } from "@/utils/parser";
import { UseGetToken } from "@/typings/commerce";

const clEndpoint = process.env.NEXT_PUBLIC_CL_ENDPOINT as string;
const clientId = process.env.NEXT_PUBLIC_CL_CLIENT_ID as string;
const slug = parseEndpoint(clEndpoint);

export const useGetToken: UseGetToken = ({ scope, countryCode }) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const getCookieToken = Cookies.get(`clAccessToken-${countryCode}`);
    if (
      (!getCookieToken || getCookieToken === "undefined") &&
      clientId &&
      slug &&
      scope
    ) {
      const getToken = async () => {
        const auth = await authenticate("client_credentials", {
          clientId,
          domain: slug,
          scope: `market:${scope}`,
        });
        setToken(auth?.accessToken);
        Cookies.set(`clAccessToken-${countryCode}`, auth?.accessToken, {
          expires: 1,
        });
      };
      getToken();
    } else if (getCookieToken && getCookieToken !== "undefined") {
      setToken(getCookieToken);
    }
  }, [scope, countryCode]);

  return token;
};
