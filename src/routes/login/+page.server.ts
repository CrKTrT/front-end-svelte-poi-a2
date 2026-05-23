//Created for SSR in SvelteKit, this file defines server-side actions for the login page. It handles user authentication by processing form data, interacting with a playtime service to validate credentials, and managing cookies for session handling. Depending on the authentication outcome, it redirects users to the appropriate page.
import { redirect } from "@sveltejs/kit";
import { dev } from "$app/environment";
//import { playtimeService } from "$lib/services/playtime-service";
import { donationService } from "$lib/services/donation-service";

export const actions = {

  login: async ({ request, cookies }) => {

    const form =
      await request.formData();

    const email =
      form.get("email") as string;

    const password =
      form.get("password") as string;

    const session =
      await donationService.login(
        email,
        password
      );

    if (session) {

      cookies.set(
        "playtime",
        JSON.stringify(session),
        {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: !dev,
          maxAge: 60 * 60 * 24 * 7
        }
      );

      throw redirect(303, "/dashboard");

    }

    throw redirect(303, "/");

  }

};