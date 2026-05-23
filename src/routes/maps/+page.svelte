<script lang="ts">

  import { onMount, tick } from "svelte";
  import { currentPlaylists, currentPlacemarks, subTitle } from "$lib/runes.svelte";
  // import { donationService } from "$lib/services/donation-service";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import type { PageProps } from "./$types";

let { data }: PageProps = $props();

$effect(() => {

  currentPlaylists.playlists =
    data.playlists;

  currentPlacemarks.placemarks =
    data.placemarks;

});
  
  subTitle.text =  "Interactive POI Maps";

  let allMap: LeafletMap;
  let filteredMap: LeafletMap;
  let satelliteMap: LeafletMap;
  let selectedCategory = $state("");

  // =========================
  // LOAD EVERYTHING
  // =========================

  onMount(async () => {

    // // await donationService.restoreSession();

    await tick();

    setTimeout(async () => {

      await loadAllMarkers();
      await loadFilteredMarkers();
      await loadSatelliteMarkers();

    }, 500);

  });

  // =========================
  // ALL MAP
  // =========================

  async function loadAllMarkers() {

    if (!allMap) {
      return;
    }

    allMap.clearMarkers();

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

  // =========================
  // FILTERED MAP
  // =========================

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

  // =========================
  // SATELLITE MAP
  // =========================

  async function loadSatelliteMarkers() {

    if (!satelliteMap) {
      return;
    }

    satelliteMap.clearMarkers();

    for (const placemark of currentPlacemarks.placemarks) {

      if (
        placemark.latitude &&
        placemark.longitude
      ) {

        await satelliteMap.addMarker(

          placemark.latitude,
          placemark.longitude,

          `
            <div style="width:220px">

              ${
                placemark.image
                  ? `
                    <img
                      src="${placemark.image}"
                      style="
                        width:100%;
                        height:120px;
                        object-fit:cover;
                        border-radius:8px;
                        margin-bottom:8px;
                      "
                    />
                  `
                  : ""
              }

              <strong>${placemark.name}</strong>

              <br/>

              ${placemark.description}

            </div>
          `
        );

      }

    }

    // =========================
    // HEATMAP
    // =========================

    satelliteMap.addHeatmap(
      currentPlacemarks.placemarks
    );

  }

</script>

<!-- HERO -->

<section class="hero is-primary mb-5">

  <div class="hero-body">

    <p class="title">
      Interactive POI Maps
    </p>

    <p class="subtitle">
      Explore Blackrock & SETU locations
    </p>

  </div>

</section>

<!-- FILTER -->

<Card title="Filter by Category">

  <div class="field">

    <label class="label">
      Select Category
    </label>

    <div class="select is-fullwidth">

      <select
        bind:value={selectedCategory}
        onchange={() => loadFilteredMarkers()}
      >

        <option value="">
          All Categories
        </option>

        {#each currentPlaylists.playlists as playlist}

          <option value={playlist._id}>
            {playlist.title}
          </option>

        {/each}

      </select>

    </div>

  </div>

</Card>

<!-- MAP GRID -->

<div class="columns mt-5">

  <!-- ALL POI -->

  <div class="column">

    <Card title="All POIs Map">

      <LeafletMap
        height={45}
        bind:this={allMap}
      />

    </Card>

  </div>

  <!-- FILTERED -->

  <div class="column">

    <Card title="Filtered POIs">

      <LeafletMap
        height={45}
        bind:this={filteredMap}
      />

    </Card>

  </div>

</div>

<!-- SATELLITE -->

<div class="mt-5">

  <Card title="Satellite View">

    <LeafletMap
      height={55}
      activeLayer="Satellite"
      bind:this={satelliteMap}
    />

  </Card>

</div>