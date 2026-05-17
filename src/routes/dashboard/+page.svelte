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

<section class="hero is-primary mb-5">
  <div class="hero-body">

    <p class="title">
      Blackrock → SETU POI Explorer
    </p>

    <p class="subtitle">
      Discover local places between Blackrock and SETU
    </p>

  </div>
</section>

<div class="columns mb-5">

  <div class="column">

    <div class="box has-text-centered">
      <p class="heading">Categories</p>

      <p class="title">
        {currentPlaylists.playlists.length}
      </p>
    </div>

  </div>

  <div class="column">

    <div class="box has-text-centered">
      <p class="heading">Placemarks</p>

      <p class="title">
        {currentPlacemarks.placemarks.length}
      </p>
    </div>

  </div>

  <div class="column">

    <div class="box has-text-centered">
      <p class="heading">Logged In User</p>

      <p class="title is-5">
        {loggedInUser.name}
      </p>
    </div>

  </div>

</div>

<div class="columns">

  <div class="column is-4">

    <Card title="POI Categories">

      {#if currentPlaylists.playlists.length > 0}

        <div class="content">

          <ul>

            {#each currentPlaylists.playlists as playlist}

              <li class="mb-3">
                 <strong>{playlist.title}</strong>
              </li>

            {/each}

          </ul>

        </div>

      {:else}

        <p>No categories available.</p>

      {/if}

    </Card>

    <div class="mt-5">
      <Card title="Add New POI Category">
        <Dashboard />
      </Card>
    </div>

  </div>

  <div class="column">

    <Card title="Recent Placemarks">

      {#if currentPlacemarks.placemarks.length > 0}

        <div class="columns is-multiline">

          {#each currentPlacemarks.placemarks as placemark}

            <div class="column is-6">

              <div class="card">

                <div class="card-content">

                  <p class="title is-5">
                    {placemark.name}
                  </p>

                  <p class="content">
                    {placemark.description}
                  </p>

                  <p>
                     {placemark.latitude},
                    {placemark.longitude}
                  </p>

                </div>

              </div>

            </div>

          {/each}

        </div>

      {:else}

        <p>No placemarks available.</p>

      {/if}

    </Card>

  </div>

</div>