//This file created for SSR to load the session cookie and make it available to all pages in the app.
import type { LayoutServerLoad } from "./$types";
import type { Session } from "$lib/types/playtime-types";

export const load: LayoutServerLoad = ({ cookies }) => {

  const cookieStr =
    cookies.get("playtime-user");

  if (cookieStr) {

    //const session =
      //JSON.parse(cookieStr) as Session;

    return {
      session: JSON.parse(cookieStr) as Session
    };

  }

  return {
    session: null
  };

};