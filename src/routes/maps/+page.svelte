<script lang="ts">

  import { onMount } from "svelte";

  import { currentPlacemarks, subTitle } from "$lib/runes.svelte";

  import Card from "$lib/ui/Card.svelte";

  import LeafletMap
    from "$lib/ui/LeafletMap.svelte";

  subTitle.text =
    "Multi-Map Dashboard";

  let allMap: LeafletMap;

  let categoryMap: LeafletMap;

  let satelliteMap: LeafletMap;

  onMount(async () => {

    // wait for maps to fully mount

    setTimeout(async () => {

      // ALL MAP

      for (const placemark of currentPlacemarks.placemarks) {

        await allMap.addMarker(

          placemark.latitude,

          placemark.longitude,

          placemark.name

        );

      }

      // CATEGORY MAP

      for (const placemark of currentPlacemarks.placemarks) {

        await categoryMap.addMarker(

          placemark.latitude,

          placemark.longitude,

          placemark.description

        );

      }

      // SATELLITE MAP

      for (const placemark of currentPlacemarks.placemarks) {

        await satelliteMap.addMarker(

          placemark.latitude,

          placemark.longitude,

          placemark.name

        );

      }

      // MOVE MAPS

      const first =
        currentPlacemarks.placemarks[0];

      if (first) {

        await allMap.moveTo(
          first.latitude,
          first.longitude
        );

        await categoryMap.moveTo(
          first.latitude,
          first.longitude
        );

        await satelliteMap.moveTo(
          first.latitude,
          first.longitude
        );

      }

    }, 500);

  });

</script>

<section class="hero is-info mb-5">

  <div class="hero-body">

    <p class="title">
      Multi-Map Dashboard
    </p>

    <p class="subtitle">
      Explore placemarks across multiple map views
    </p>

  </div>

</section>

<div class="columns">

  <div class="column">

    <Card title="All Placemarks">

      <LeafletMap
        height={45}
        bind:this={allMap}
      />

    </Card>

  </div>

  <div class="column">

    <Card title="Category Map">

      <LeafletMap
        height={45}
        bind:this={categoryMap}
      />

    </Card>

  </div>

</div>

<div class="mt-5">

  <Card title="Satellite Overview">

    <LeafletMap
      height={50}
      activeLayer="Satellite"
      bind:this={satelliteMap}
    />

  </Card>

</div>