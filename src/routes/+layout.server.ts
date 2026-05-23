//This file created for SSR to load the session cookie and make it available to all pages in the app.
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad =
  async ({ cookies }) => {

    const sessionCookie =
      cookies.get("playtime");

    if (!sessionCookie) {

      return {
        session: null
      };

    }

    return {

      session:
        JSON.parse(sessionCookie)

    };

};