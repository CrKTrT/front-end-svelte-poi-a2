<script lang="ts">
  import { onMount } from "svelte";
  import * as echarts from "echarts";

  let chartContainer: HTMLDivElement;

  let {
    options,
    height = "400px"
  } = $props();

  let chart: any;

  onMount(() => {

    chart = echarts.init(chartContainer);

    chart.setOption(options);

    window.addEventListener("resize", () => {
      chart.resize();
    });

  });

  $effect(() => {

    if (chart) {
      chart.setOption(options);
    }

  });
</script>

<div
  bind:this={chartContainer}
  style="width: 100%; height: {height};"
></div>