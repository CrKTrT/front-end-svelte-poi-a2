<script lang="ts">

  import { onMount } from "svelte";
  import { subTitle, currentPlaylists, currentPlacemarks, loggedInUser } from "$lib/runes.svelte";
  import { donationService } from "$lib/services/donation-service";
  import Card from "$lib/ui/Card.svelte";
  import Dashboard from "./Dashboard.svelte";

  subTitle.text =
    "Blackrock to SETU Travel POI Dashboard";

  // EDIT MODAL STATE

  let editingPlacemark = $state<any | null>(null);
  let editName = $state("");
  let editDescription = $state("");
  let editLatitude = $state(0);
  let editLongitude = $state(0);

  // FILTER STATE
  let selectedCategory = $state("");

  onMount(async () => {
    await donationService.restoreSession();
  });

  // DELETE CATEGORY
  async function deletePlaylist(id: string) {
    try {
      const response =
        await fetch(
          `http://localhost:3000/api/playlists/${id}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                "Bearer " +
                loggedInUser.token
            }
          }
        );

      if (response.ok) {
        await donationService.refreshAppData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // DELETE PLACEMARK

  async function deletePlacemark(id: string) {
    try {
      const response =
        await fetch(
          `http://localhost:3000/api/tracks/${id}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                "Bearer " +
                loggedInUser.token
            }
          }
        );

      if (response.ok) {
        await donationService.refreshAppData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // OPEN EDIT MODAL

  function openEditModal(placemark: any) {

    editingPlacemark = placemark;
    editName = placemark.name;
    editDescription = placemark.description;
    editLatitude = placemark.latitude;
    editLongitude = placemark.longitude;

  }

  // UPDATE PLACEMARK

  async function updatePlacemark() {
    if (!editingPlacemark) {
      return;
    }
    try {
      const response =
        await fetch(
          `http://localhost:3000/api/tracks/${editingPlacemark._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",

              Authorization:  "Bearer " + loggedInUser.token

            },

            body: JSON.stringify({
              name: editName,
              description: editDescription,
              latitude: editLatitude,
              longitude: editLongitude

            })
          }
        );

      if (response.ok) {
        editingPlacemark = null;
        await donationService.refreshAppData();
      }
    } catch (error) {
      console.log(error);
    }
  }

</script>

<div class="dashboard-wrapper">

<!-- HERO -->

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

<!-- MAIN CONTAINER -->

<div class="container is-fluid px-5 dashboard-container">

  <!-- STATS -->

  <div class="columns is-variable is-5 mb-5">

    <div class="column">

      <div class="box has-text-centered stats-card">

        <p class="heading">
          Categories
        </p>

        <p class="title">
          {currentPlaylists.playlists.length}
        </p>

      </div>

    </div>

    <div class="column">

      <div class="box has-text-centered stats-card">

        <p class="heading">
          Placemarks
        </p>

        <p class="title">
          {currentPlacemarks.placemarks.length}
        </p>

      </div>

    </div>

    <div class="column">

      <div class="box has-text-centered stats-card">

        <p class="heading">
          Logged In User
        </p>

        <p class="title is-5">
          {loggedInUser.name}
        </p>

      </div>

    </div>

  </div>

  <!-- MAIN CONTENT -->

  <div class="columns is-variable is-5">

    <!-- LEFT COLUMN -->

    <div class="column is-4-desktop is-12-tablet">

      <!-- CATEGORIES -->

      <Card title=" POI Categories">

        {#if currentPlaylists.playlists.length > 0}

          {#each currentPlaylists.playlists as playlist}

            <div class="box mb-3">

              <div class="level">

                <div class="level-left">

                  <strong>
                    {playlist.title}
                  </strong>

                </div>

                  <div class="level-right">

                    <button
                      class="button is-small is-danger"
                      onclick={() => deletePlaylist(playlist._id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

            </div>

            {/each}

          {:else}

            <p>No categories available.</p>

        {/if}

      </Card>

      <!-- ADD CATEGORY / PLACEMARK -->

      <div class="mt-5">

        <Card title=" Add New POI">

          <Dashboard />

        </Card>

      </div>

    </div>

    <!-- RIGHT COLUMN -->

    <div class="column is-8-desktop is-12-tablet">

      <Card title=" Recent Placemarks">

        <div class="content-wrapper">

          {#if currentPlacemarks.placemarks.length > 0}

            <div class="columns is-multiline">

              {#each currentPlacemarks.placemarks as placemark}

                <div class="column is-6">

                  <div class="card dashboard-card">

                    <!-- IMAGE -->

                    {#if placemark.image}

                      <div class="card-image">

                        <figure class="image">

                          <img
                            src={placemark.image}
                            alt={placemark.name}
                            style="
                              object-fit: cover;
                              max-height: 240px;
                              width: 100%;
                            "
                          />

                        </figure>

                      </div>

                    {/if}

                    <!-- CONTENT -->

                    <div class="card-content">

                      <p class="title is-5">
                        {placemark.name}
                      </p>

                      <p class="content">
                        {placemark.description}
                      </p>

                      <p class="mb-4">

                        <strong>Lat:</strong>
                        {placemark.latitude}

                        <br />

                        <strong>Lng:</strong>
                        {placemark.longitude}

                      </p>

                      <div class="buttons">

                        <button
                          class="button is-small is-danger"
                          onclick={() => deletePlacemark(placemark._id!)}
                        >
                          Delete Placemark
                        </button>

                        <button
                          class="button is-small is-info"
                          onclick={() => openEditModal(placemark)}
                        >
                          Edit Placemark
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              {/each}

            </div>

          {:else}

            <p>No placemarks available.</p>

          {/if}

        </div>

      </Card>

    </div>

  </div>

</div>

<!-- EDIT MODAL -->

{#if editingPlacemark}

  <div class="modal is-active">

    <div
      class="modal-background"
      onclick={() => editingPlacemark = null}
    ></div>

    <div class="modal-card">

      <header class="modal-card-head">

        <p class="modal-card-title">
          Edit Placemark
        </p>

        <button
          class="delete"
          aria-label="close"
          onclick={() => editingPlacemark = null}
        ></button>

      </header>

      <section class="modal-card-body">

        <div class="field">

          <label class="label">
            Name
          </label>

          <input
            bind:value={editName}
            class="input"
            type="text"
          />

        </div>

        <div class="field">

          <label class="label">
            Description
          </label>

          <textarea
            bind:value={editDescription}
            class="textarea"
          ></textarea>

        </div>

        <div class="field">

          <label class="label">
            Latitude
          </label>

          <input
            bind:value={editLatitude}
            class="input"
            type="number"
            step="any"
          />

        </div>

        <div class="field">

          <label class="label">
            Longitude
          </label>

          <input
            bind:value={editLongitude}
            class="input"
            type="number"
            step="any"
          />

        </div>

      </section>

      <footer class="modal-card-foot">

        <button
          class="button is-success"
          onclick={() => updatePlacemark()}
        >
          Save Changes
        </button>

        <button
          class="button"
          onclick={() => editingPlacemark = null}
        >
          Cancel
        </button>

      </footer>

    </div>

  
</div>

{/if}
</div>

<style>

  .dashboard-wrapper {

    max-width: 1400px;

    margin: auto;

    padding: 1.5rem;

  }

  .hero-section {

    border-radius: 18px;

    overflow: hidden;

    box-shadow:
      0 8px 20px rgba(0,0,0,0.08);

  }

  .stats-card {

    border-radius: 16px;

    transition: 0.3s ease;

    box-shadow:
      0 4px 12px rgba(0,0,0,0.08);

  }

  .stats-card:hover {

    transform: translateY(-4px);

  }

  .dashboard-card {

    border-radius: 18px;

    overflow: hidden;

    height: 100%;

    display: flex;

    flex-direction: column;

    transition: 0.3s ease;

    box-shadow:
      0 6px 18px rgba(0,0,0,0.08);

  }

  .dashboard-card:hover {

    transform: translateY(-5px);

  }

  .dashboard-card img {

    height: 240px;

    object-fit: cover;

    width: 100%;

  }

  .card-content {

    flex-grow: 1;

  }

  .sticky-panel {

    position: sticky;

    top: 20px;

    align-self: flex-start;

  }

  @media screen and (max-width: 768px) {

    .dashboard-wrapper {

      padding: 0.75rem;

    }

    .sticky-panel {

      position: relative;

      top: 0;

    }

  }

</style>