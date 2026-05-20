<script lang="ts">

  import { onMount } from "svelte";
  import { currentPlaylists, currentPlacemarks, subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";

  subTitle.text =
    "Interactive POI Maps";

  let allMap: LeafletMap;
  let filteredMap: LeafletMap;
  let satelliteMap: LeafletMap;
  let selectedCategory = $state("");

  onMount(async () => {

    loadAllMarkers();
    loadFilteredMarkers();
    loadSatelliteMarkers();

  });

  async function loadAllMarkers() {
    for (const placemark of currentPlacemarks.placemarks) {
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

  async function loadFilteredMarkers() {

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

  async function loadSatelliteMarkers() {
    for (const placemark of currentPlacemarks.placemarks) {
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

</script>

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

<!-- CATEGORY FILTER -->

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

<!-- MAPS -->

<div class="columns mt-5">
  <div class="column">
    <Card title="All POIs Map">

      <LeafletMap
        height={45}
        bind:this={allMap}
      />
    </Card>
  </div>

  <div class="column">
    <Card title="Filtered POIs">

      <LeafletMap
        height={45}
        bind:this={filteredMap}
      />

    </Card>
  </div>
</div>

<div class="mt-5">
  <Card title="Satellite View">

    <LeafletMap
      height={55}
      activeLayer="Satellite"
      bind:this={satelliteMap}
    />
  </Card>
</div>