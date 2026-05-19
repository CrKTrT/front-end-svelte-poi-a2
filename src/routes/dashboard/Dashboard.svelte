<script lang="ts">
  import { loggedInUser, currentPlaylists } from "$lib/runes.svelte";
  import { donationService } from "$lib/services/donation-service";
  
  //Main Category State
  let title = $state("");
  let categoryMessage = $state("");

  // PLacemark addition

  let selectedPlaylist = $state("");
  let name = $state("");
  let description = $state("");
  let latitude = $state(0);
  let longitude = $state(0);
  let imageFile: File | null = null;
  let placemarkMessage = $state("");

 async function addPlaylist() {

    if (!title) {

      categoryMessage =
        "Please enter a category title";

      return;

    }

    try {

      const response =
        await fetch(
          "http://localhost:3000/api/playlists",
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                "Bearer " +
                loggedInUser.token

            },

            body: JSON.stringify({

              title: title

            })

          }
        );

      if (response.ok) {

        categoryMessage =
          "Category added successfully";

        title = "";

        await donationService.refreshAppData();

      } else {

        categoryMessage =
          "Error adding category";

      }

    } catch (error) {

      console.log(error);

      categoryMessage =
        "Server error";

    }

  }

  // ADD PLACEMARK

  async function addPlacemark() {
    let imageUrl = "";
    
    if (
      !selectedPlaylist ||
      !name ||
      !description
    ) {

      placemarkMessage =
        "Please complete all fields";

      return;

    }

    try {

      //let image = "";
    

      // CLOUDINARY IMAGE UPLOAD

      if (imageFile) {

  const formData =
    new FormData();

  formData.append(
    "imagefile",
    imageFile
  );

  const imageResponse =
    await fetch(
      "http://localhost:3000/api/images",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer " +
            loggedInUser.token
        },
        body: formData
      }
    );

  const uploadedImage =
    await imageResponse.json();

  imageUrl =
    uploadedImage.imageUrl;

}

      // SAVE PLACEMARK

      const response =
        await fetch(
          `http://localhost:3000/api/playlists/${selectedPlaylist}/tracks`,
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                "Bearer " +
                loggedInUser.token

            },

            body: JSON.stringify({

              name,
              description,
              latitude,
              longitude,
              image: imageUrl

            })

          }
        );

      if (response.ok) {

        placemarkMessage =
          "Placemark added successfully";

        // RESET FORM

        name = "";

        description = "";

        latitude = 0;

        longitude = 0;

        imageFile = null;

        await donationService.refreshAppData();

      } else {

        placemarkMessage =
          "Error adding placemark";

      }

    } catch (error) {

      console.log(error);

      placemarkMessage =
        "Server error";

    }

  }

</script>

<!-- CATEGORY SECTION -->

<div class="box mb-5">

  <h2 class="title is-4">
    Add New POI Category
  </h2>

  <div class="field">

    <label class="label">
      Category Name
    </label>

    <div class="control">

      <input
        bind:value={title}
        class="input"
        type="text"
        placeholder="Enter category name"
      />

    </div>

  </div>

  <div class="field">

    <div class="control">

      <button
        onclick={() => addPlaylist()}
        class="button is-primary"
      >
        Add Category
      </button>

    </div>

  </div>

  <div class="content has-text-centered">

    {categoryMessage}

  </div>

</div>

<!-- PLACEMARK SECTION -->

<div class="box">

  <h2 class="title is-4">
     Add New Placemark
  </h2>

  <!-- CATEGORY -->

  <div class="field">

    <label class="label">
      Select Category
    </label>

    <div class="select is-fullwidth">

      <select bind:value={selectedPlaylist}>

        <option value="">
          Choose Category
        </option>

        {#each currentPlaylists.playlists as playlist}

          <option value={playlist._id}>
            {playlist.title}
          </option>

        {/each}

      </select>

    </div>

  </div>

  <!-- NAME -->

  <div class="field">

    <label class="label">
      Placemark Name
    </label>

    <input
      bind:value={name}
      class="input"
      type="text"
      placeholder="Enter placemark name"
    />

  </div>

  <!-- DESCRIPTION -->

  <div class="field">

    <label class="label">
      Description
    </label>

    <textarea
      bind:value={description}
      class="textarea"
      placeholder="Enter description"
    ></textarea>

  </div>

  <!-- LATITUDE -->

  <div class="field">

    <label class="label">
      Latitude
    </label>

    <input
      bind:value={latitude}
      class="input"
      type="number"
      step="any"
    />

  </div>

  <!-- LONGITUDE -->

  <div class="field">

    <label class="label">
      Longitude
    </label>

    <input
      bind:value={longitude}
      class="input"
      type="number"
      step="any"
    />

  </div>

  <!-- IMAGE -->

  <div class="field">

    <label class="label">
    Upload Image
  </label>

  <input
  class="input"
  type="file"
  accept="image/*"
  onchange={(e) => {
    imageFile =
      (e.currentTarget as HTMLInputElement)
        .files?.[0] || null;
  }}
/>

  </div>

  <!-- BUTTON -->

  <div class="field">

    <div class="control">

      <button
        onclick={() => addPlacemark()}
        class="button is-link"
      >
        Add Placemark
      </button>

    </div>

  </div>

  <div class="content has-text-centered">

    {placemarkMessage}

  </div>

</div>