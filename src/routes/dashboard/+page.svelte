<script lang="ts">

  import { onMount } from "svelte";
  import { subTitle, currentPlaylists, currentPlacemarks, loggedInUser } from "$lib/runes.svelte";
  import { donationService } from "$lib/services/donation-service";
  import Card from "$lib/ui/Card.svelte";
  import Dashboard from "./Dashboard.svelte";

  subTitle.text = "Blackrock to SETU Travel POI Dashboard";

  let editingPlacemark = $state<any>(null);

  let editName = $state("");
  let editDescription = $state("");
  let editLatitude = $state(0);
  let editLongitude = $state(0);

  onMount(async () => {
    await donationService.restoreSession();
  });

  // Delete category function added here to avoid circular imports with Dashboard.svelte

  async function deletePlaylist(id: string) {

    try {

      const response = await fetch(
        `http://localhost:3000/api/playlists/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + loggedInUser.token
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

  // Delete placemark function added here to avoid circular imports with Dashboard.svelte

  async function deletePlacemark(id: string) {

    try {

      const response = await fetch(
        `http://localhost:3000/api/tracks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + loggedInUser.token
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

function openEditModal(placemark: any) {

  editingPlacemark = placemark;

  editName = placemark.name;
  editDescription = placemark.description;
  editLatitude = placemark.latitude;
  editLongitude = placemark.longitude;

  }

async function updatePlacemark() {

  if (!editingPlacemark) {
    return;
  }

  try {

    const response = await fetch(
      `http://localhost:3000/api/tracks/${editingPlacemark._id}`,
      {

        method: "PUT",

        headers: {

          "Content-Type": "application/json",

          Authorization:
            "Bearer " +
            loggedInUser.token

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

<!-- STATS -->

<div class="columns mb-5">

  <div class="column">

    <div class="box has-text-centered">

      <p class="heading">
        Categories
      </p>

      <p class="title">
        {currentPlaylists.playlists.length}
      </p>

    </div>

  </div>

  <div class="column">

    <div class="box has-text-centered">

      <p class="heading">
        Placemarks
      </p>

      <p class="title">
        {currentPlacemarks.placemarks.length}
      </p>

    </div>

  </div>

  <div class="column">

    <div class="box has-text-centered">

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

<div class="columns">

  <!-- LEFT COLUMN -->

  <div class="column is-4">

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

  <div class="column">

    <Card title=" Recent Placemarks">

      {#if currentPlacemarks.placemarks.length > 0}

        <div class="columns is-multiline">

          {#each currentPlacemarks.placemarks as placemark}

            <div class="column is-6">

              <div class="card">

                <!-- IMAGE -->

                {#if placemark.image}

                  <div class="card-image">

                    <figure class="image mb-3">

                        <img
                          src={placemark.image}
                          alt={placemark.name}
                          style="
                            border-radius: 12px;
                            object-fit: cover;
                            max-height: 220px;
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

                <p class="mb-3">

                    <strong>Lat:</strong>
                    {placemark.latitude}

                    <br />

                    <strong>Lng:</strong>
                    {placemark.longitude}

                 </p>

                  <button
                    class="button is-small is-danger"
                    onclick={() => deletePlacemark(placemark._id!)}
                  >
                    Delete Placemark
                  </button>

                  <button
                    class="button is-small is-info ml-2"
                    onclick={() => openEditModal(placemark)}
                  >
                    Edit Placemark
                  </button>
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