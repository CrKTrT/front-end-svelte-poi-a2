<script lang="ts">
  //import { subTitle } from "$lib/runes.svelte";
  //import Card from "$lib/ui/Card.svelte";
  //import DonateForm from "./Dashboard.svelte";
  //import DonationList from "$lib/ui/DonationList.svelte";

  import { onMount } from "svelte";
  import { subTitle, currentPlaylists, currentPlacemarks, loggedInUser } from "$lib/runes.svelte";
  import { donationService } from "$lib/services/donation-service";
  import Card from "$lib/ui/Card.svelte";
  import Dashboard from "./Dashboard.svelte";

  subTitle.text = "Blackrock to SETU Travel POI Dashboard";
  onMount(async () => {
    await donationService.restoreSession();
  });

</script>

<h1 class="title">Blackrock to SETU Travel POI Dashboard</h1> //HEading added.

<h2 class="subtitle">
  Welcome {loggedInUser.name}
</h2>

<div class="columns">

  <div class="column">
    <Card title="POI Categories">

      {#if currentPlaylists.playlists.length > 0}

        <div class="content">
          <ul>
            {#each currentPlaylists.playlists as playlist}
              <li>
                <strong>{playlist.title}</strong>
              </li>
            {/each}
          </ul>
        </div>

      {:else}

        <p>No categories available.</p>

      {/if}

    </Card>
  </div>

  <div class="column">
    <Card title="Placemarks">

      {#if currentPlacemarks.placemarks.length > 0}

        <div class="content">
          <ul>
            {#each currentPlacemarks.placemarks as placemark}
              <li>
                <strong>{placemark.name}</strong><br />
                {placemark.description}<br />
                Lat: {placemark.latitude},
                Lng: {placemark.longitude}
              </li>
              <br />
            {/each}
          </ul>
        </div>

      {:else}

        <p>No placemarks available.</p>

      {/if}

    </Card>
  </div>
  <div class="mt-5">
    <Card title="Add New POI Category">
      <Dashboard />
    </Card>
  </div>
</div>