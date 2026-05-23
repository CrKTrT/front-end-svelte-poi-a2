// Created SSR for Maps page
import type { PageServerLoad } from "./$types";
import { playlistService } from "$lib/services/playlist-service";
import { placemarkService } from "$lib/services/placemark-service";

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
        await playlistService.getPlaylists(
          session.token
        ),

      placemarks:
        await placemarkService.getPlacemarks(
          session.token
        )

    };

};