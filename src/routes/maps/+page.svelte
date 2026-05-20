<script lang="ts">

  import { onMount, tick } from "svelte";

  import { currentPlaylists, currentPlacemarks, subTitle } from "$lib/runes.svelte";

  import Card from "$lib/ui/Card.svelte";

  import LeafletMap from "$lib/ui/LeafletMap.svelte";

  subTitle.text =
    "Interactive POI Maps";

  let allMap: LeafletMap;

  let filteredMap: LeafletMap;

  let satelliteMap: LeafletMap;

  let selectedCategory = $state("");

  // LOAD EVERYTHING

  onMount(async () => {

    await tick();

    await loadAllMarkers();

    await loadFilteredMarkers();

    await loadSatelliteMarkers();

  });

  // ALL MAP

  async function loadAllMarkers() {

    for (const placemark of currentPlacemarks.placemarks) {

      if (
        placemark.latitude &&
        placemark.longitude
      ) {

        await allMap.addMarker(

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

  }

  // FILTERED MAP

  async function loadFilteredMarkers() {

    if (!filteredMap) {
      return;
    }

    filteredMap.clearMarkers();

    const filtered =

      selectedCategory

        ? currentPlacemarks.placemarks.filter(
            (placemark) =>
              placemark.playlistid ===
              selectedCategory
          )

        : currentPlacemarks.placemarks;

    for (const placemark of filtered) {

      if (
        placemark.latitude &&
        placemark.longitude
      ) {

        await filteredMap.addMarker(

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

  }

  // SATELLITE MAP

  async function loadSatelliteMarkers() {

    for (const placemark of currentPlacemarks.placemarks) {

      if (
        placemark.latitude &&
        placemark.longitude
      ) {

        await satelliteMap.addMarker(

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

  }

</script>