<script lang="ts">

  import "leaflet/dist/leaflet.css";
  import "leaflet.markercluster/dist/MarkerCluster.css";
  import "leaflet.markercluster/dist/MarkerCluster.Default.css";

  import { onMount } from "svelte";
  import type { Map as LeafletMapType } from "leaflet";

  let {
    height = 50,
    activeLayer = "Terrain"
  } = $props();

  let id =
    "map-" +
    Math.random()
      .toString(36)
      .substring(2, 9);

  let location = {
    lat: 52.2605,
    lng: -7.0724
  };

  let zoom = 12;

  let imap: LeafletMapType;

  let markersLayer: any;

  let L: any;

  onMount(async () => {

    const leaflet = await import("leaflet");

    await import("leaflet.markercluster");

    await import("leaflet.heat");

    L = leaflet.default;

    const terrainLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        attribution:
          "© OpenStreetMap contributors"
      }
    );

    const satelliteLayer = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles © Esri"
      }
    );

    const selectedLayer =
      activeLayer === "Satellite"
        ? satelliteLayer
        : terrainLayer;

    imap = L.map(id, {
      center: [
        location.lat,
        location.lng
      ],
      zoom: zoom,
      layers: [selectedLayer]
    });

    const baseMaps = {
      Terrain: terrainLayer,
      Satellite: satelliteLayer
    };

    L.control.layers(baseMaps).addTo(imap);

    // MARKER CLUSTER

    markersLayer = L.markerClusterGroup();

    imap.addLayer(markersLayer);

    setTimeout(() => {
      imap.invalidateSize();
    }, 500);

  });

  // =========================
  // ADD MARKER
  // =========================

  export async function addMarker(
    lat: number,
    lng: number,
    popupText: string
  ) {

    if (!imap || !markersLayer) {
      return;
    }

    const marker =
      L.marker([lat, lng]);

    marker.bindPopup(popupText);

    markersLayer.addLayer(marker);

  }

  // =========================
  // CLEAR MARKERS
  // =========================

  export function clearMarkers() {

    if (markersLayer) {

      markersLayer.clearLayers();

    }

  }

  // =========================
  // HEATMAP
  // =========================

  export function addHeatmap(points: any[]) {

    if (!imap || !L.heatLayer) {
      return;
    }

    const heatPoints = points.map((p) => [

      p.latitude,

      p.longitude,

      1

    ]);

    L.heatLayer(heatPoints, {

      radius: 25,

      blur: 18

    }).addTo(imap);

  }

</script>

<div
  {id}
  class="map-container"
  style="height:{height}vh"
></div>

<style>

  .map-container {

    width: 100%;

    border-radius: 14px;

    overflow: hidden;

  }

</style>