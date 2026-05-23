import { currentPlaylists, currentPlacemarks, loggedInUser} from "$lib/runes.svelte";
import type { Playlist, Placemark } from "$lib/types/playtime-types";
import LeafletMap from "$lib/ui/LeafletMap.svelte";

export function refreshPlaytimeState(
  playlists: Playlist[],
  placemarks: Placemark[]
) {

  currentPlaylists.playlists = playlists;
  currentPlacemarks.placemarks = placemarks;

}

export function clearPlaytimeState() {

  currentPlaylists.playlists = [];
  currentPlacemarks.placemarks = [];

  loggedInUser.email = "";
  loggedInUser.name = "";
  loggedInUser.token = "";
  loggedInUser._id = "";

}

export async function refreshPlacemarkMap(
  map: LeafletMap
) {

  map.clearMarkers();

  currentPlacemarks.placemarks.forEach(
    async (placemark: Placemark) => {

      if (
        placemark.latitude &&
        placemark.longitude
      ) {

        await map.addMarker(
          placemark.latitude,
          placemark.longitude,

          `
          <strong>${placemark.name}</strong>
          <br/>
          ${placemark.description}
          `
        );

      }

    }
  );

}
