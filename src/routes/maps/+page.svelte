<script lang="ts">
  import { subTitle, currentPlacemarks } from "$lib/runes.svelte";
  import { donationService } from "$lib/services/donation-service";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";

  subTitle.text = "Donations Geo Data";
  let map: LeafletMap;

  onMount(async () => {
    await donationService.restoreSession();

    currentPlacemarks.placemarks.forEach((placemark) => {
      const popup = `
        <strong>${placemark.name}</strong><br/>
        ${placemark.description}
      `;

      map.addMarker(
        placemark.latitude,
        placemark.longitude,
        popup
      );
    });

    if (currentPlacemarks.placemarks.length > 0) {
      const first = currentPlacemarks.placemarks[0];

      map.moveTo(
        first.latitude,
        first.longitude
      );
    }
  });
</script>

<Card title="POI Map Explorer">
  <LeafletMap height={75} bind:this={map} />
</Card>