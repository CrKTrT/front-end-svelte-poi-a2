//Created for SSR in SvelteKit, this file is used to load data on the server before rendering the page. 
//It exports a `load` function that fetches playlists and placemarks for the authenticated user.
// If there is no session, it returns empty arrays for both playlists and placemarks.
import { donationService }from "$lib/services/donation-service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = 
  async ({ parent }) => {

    const { session } =
      await parent();

    if (!session) {

      return {
        playlists: [],
        placemarks: []
      };

    }

    return {

      playlists:
        await donationService.getPlaylists(
          session.token
        ),

      placemarks:
        await donationService.getPlacemarks(
          session.token
        )

    };

};