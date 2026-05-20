<script lang="ts">

  import { onMount } from "svelte";
  import * as echarts from "echarts";
  import { currentPlaylists, currentPlacemarks, subTitle } from "$lib/runes.svelte";

  subTitle.text =
    "POI Analytics Dashboard";

  let categoryChart: HTMLDivElement;
  let coordinateChart: HTMLDivElement;
  let trendsChart: HTMLDivElement;
  let growthChart: HTMLDivElement;

  onMount(() => {

    renderCategoryChart();
    renderCoordinateChart();
    renderTrendChart();
    renderGrowthProjectionChart();

  });

  // CATEGORY DISTRIBUTION

  function renderCategoryChart() {

    const chart =
      echarts.init(categoryChart);

    const categoryCounts =
      currentPlaylists.playlists.map(
        (playlist) => {

          const count =
            currentPlacemarks.placemarks.filter(
              (placemark) =>
                placemark.playlistid ===
                playlist._id
            ).length;

          return {
            value: count,
            name: playlist.title
          };
        }
      );

    chart.setOption({

      tooltip: {
        trigger: "item"
      },

      series: [
        {
          type: "pie",

          radius: "70%",

          data: categoryCounts
        }
      ]

    });

  }

  // COORDINATE DISTRIBUTION

  function renderCoordinateChart() {

    const chart =
      echarts.init(coordinateChart);

    const data =
      currentPlacemarks.placemarks.map(
        (placemark) => [
          placemark.longitude,
          placemark.latitude
        ]
      );

    chart.setOption({

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

          symbolSize: 18,

          data: data
        }
      ]

    });

  }

  // TRENDS

  function renderTrendChart() {

    const chart =
      echarts.init(trendsChart);

    const names =
      currentPlacemarks.placemarks.map(
        (p) => p.name
      );

    const values =
      currentPlacemarks.placemarks.map(
        (_, i) => i + 1
      );

    chart.setOption({

      tooltip: {},

      xAxis: {
        type: "category",
        data: names
      },

      yAxis: {
        type: "value"
      },

      series: [
        {
          data: values,

          type: "line",

          smooth: true
        }
      ]

    });

  }

  // GROWTH PROJECTIONS

  function renderGrowthProjectionChart() {

    const chart =
      echarts.init(growthChart);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun"
    ];

    const projected =
      months.map(
        (_, i) =>
          currentPlacemarks
            .placemarks.length + i * 2
      );

    chart.setOption({

      tooltip: {},

      xAxis: {
        type: "category",
        data: months
      },

      yAxis: {
        type: "value"
      },

      series: [
        {
          data: projected,

          type: "bar"
        }
      ]

    });

  }

</script>

<!-- HERO -->

<section class="hero is-primary mb-5">

  <div class="hero-body">

    <p class="title">
      POI Analytics Dashboard
    </p>

    <p class="subtitle">
      Trends, projections & insights
    </p>

  </div>

</section>

<!-- TOP CHARTS -->

<div class="columns">

  <div class="column">

    <div class="box">

      <h2 class="title is-5">

        📂 Category Distribution

      </h2>

      <div
        bind:this={categoryChart}
        style="height: 400px;"
      ></div>

    </div>

  </div>

  <div class="column">

    <div class="box">

      <h2 class="title is-5">

        Coordinate Distribution

      </h2>

      <div
        bind:this={coordinateChart}
        style="height: 400px;"
      ></div>

    </div>

  </div>

</div>

<!-- TRENDS -->

<div class="box mt-5">

  <h2 class="title is-5">

    Placemark Trends

  </h2>

  <div
    bind:this={trendsChart}
    style="height: 400px;"
  ></div>

</div>

<!-- PROJECTIONS -->

<div class="box mt-5">

  <h2 class="title is-5">

    Growth Projections

  </h2>

  <div
    bind:this={growthChart}
    style="height: 400px;"
  ></div>

</div>