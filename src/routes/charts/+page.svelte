<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import EChart from "$lib/ui/EChart.svelte";

  import {
    currentPlaylists,
    currentPlacemarks
  } from "$lib/runes.svelte";

  // CATEGORY ANALYTICS

  let categoryLabels: string[] = [];
  let categoryCounts: number[] = [];

  $effect(() => {

    categoryLabels = [];
    categoryCounts = [];

    currentPlaylists.playlists.forEach((playlist) => {

      categoryLabels.push(playlist.title);

      const count =
        currentPlacemarks.placemarks.filter(
          (placemark) =>
            placemark.playlistid === playlist._id
        ).length;

      categoryCounts.push(count);

    });

  });

  // BAR CHART

  $: barOptions = {
    tooltip: {},
    xAxis: {
      type: "category",
      data: categoryLabels
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: categoryCounts,
        type: "bar"
      }
    ]
  };

  // PIE CHART

  $: pieOptions = {
    tooltip: {
      trigger: "item"
    },
    series: [
      {
        type: "pie",
        radius: "70%",
        data: categoryLabels.map((label, i) => ({
          value: categoryCounts[i],
          name: label
        }))
      }
    ]
  };

  // SCATTER CHART

  $: scatterOptions = {
    tooltip: {},
    xAxis: {
      name: "Longitude"
    },
    yAxis: {
      name: "Latitude"
    },
    series: [
      {
        type: "scatter",
        symbolSize: 15,
        data:
          currentPlacemarks.placemarks.map(
            (placemark) => [
              placemark.longitude,
              placemark.latitude
            ]
          )
      }
    ]
  };
</script>

<section class="hero is-info mb-5">

  <div class="hero-body">

    <p class="title">
      Blackrock POI Analytics
    </p>

    <p class="subtitle">
      Apache ECharts Analytics Dashboard
    </p>

  </div>

</section>

<div class="columns">

  <div class="column">

    <Card title="POIs per Category">

      <EChart
        options={barOptions}
      />

    </Card>

  </div>

  <div class="column">

    <Card title="Category Distribution">

      <EChart
        options={pieOptions}
      />

    </Card>

  </div>

</div>

<div class="columns mt-5">

  <div class="column">

    <Card title="Placemark Coordinate Distribution">

      <EChart
        options={scatterOptions}
        height="500px"
      />

    </Card>

  </div>

</div>