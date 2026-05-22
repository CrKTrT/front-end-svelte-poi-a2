<script lang="ts">

  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import type { Control, Map as LeafletMapType } from "leaflet";

  let {
    height = 50,
    activeLayer = "Terrain"
  } = $props();

  // UNIQUE MAP ID

  let id =
    "map-" +
    Math.random()
      .toString(36)
      .substring(2, 9);

  // DEFAULT LOCATION (BLACKROCK)

  let location = {
    lat: 52.2605,
    lng: -7.0724
  };

  let zoom = 12;
  let minZoom = 7;
  let imap: LeafletMapType;
  let markersLayer: any;
  let overlays: Control.LayersObject = {};
  let baseLayers: any;
  let L: any;

  onMount(async () => {

    const leaflet = await import("leaflet");

    L = leaflet.default;

    // TILE LAYERS

    baseLayers = {

      Terrain: leaflet.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 18,

          attribution:
            'Map data © OpenStreetMap contributors'
        }
      ),

      Satellite: leaflet.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles © Esri"
        }
      )

    };

    const defaultLayer =
      baseLayers[activeLayer];

    // CREATE MAP

    imap = leaflet.map(id, {

      center: [
        location.lat,
        location.lng
      ],

      zoom,

      minZoom,

      layers: [defaultLayer]

    });

    // MARKERS LAYER

    markersLayer =
      leaflet.layerGroup().addTo(imap);

    // LAYER CONTROL

    leaflet.control
      .layers(baseLayers, overlays)
      .addTo(imap);

    // FIX EMPTY MAP ISSUE

    setTimeout(() => {
      imap.invalidateSize();
    }, 300);

  });

  // ADD MARKER

  export async function addMarker(
    lat: number,
    lng: number,
    popupText: string
  ) {

    if (!imap || !markersLayer) {
      return;
    }

    const leaflet = await import("leaflet");

    L = leaflet.default;

    const marker =
      L.marker([lat, lng]);

    marker.bindPopup(popupText);

    marker.addTo(markersLayer);

  }

  // CLEAR MARKERS

  export function clearMarkers() {

    if (markersLayer) {

      markersLayer.clearLayers();

    }

  }

  // MOVE MAP

  export async function moveTo(
    lat: number,
    lng: number
  ) {

    if (!imap) {
      return;
    }

    imap.flyTo(
      [lat, lng],
      13
    );

  }

</script>

<div
  {id}
  class="map-container"
  style="height: {height}vh"
></div>

<style>

  .map-container {

    width: 100%;

    border-radius: 12px;

    overflow: hidden;

  }

</style>