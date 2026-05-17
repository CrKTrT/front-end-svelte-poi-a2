<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import { donationService } from "$lib/services/donation-service";
  //import type { Donation } from "$lib/types/donation-types";
  //import Coordinates from "$lib/ui/Coordinates.svelte";

  //let amount = $state(0);
  //let lat = $state(52.160858);
  //let lng = $state(-7.15242);
  //let selectedCandidate = $state("Simpson, Lisa");
  //let paymentMethods = ["paypal", "direct"];
  //let selectedMethod = $state("paypal");
  let title = $state("");
  let message = $state("");

  async function addPlaylist() {
    if (!title) {
      message = "Please enter a category title";
      return;
    }

    try {

      const response = await fetch("http://localhost:3000/api/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + loggedInUser.token
        },
        body: JSON.stringify({
          title: title
        })
      });

      if (response.ok) {
        message = "Category added successfully";
        title = "";

        await donationService.refreshAppData();

      } else {
        message = "Error adding category";
      }

    } catch (error) {
      console.log(error);
      message = "Server error";
    }
  }
</script>

<div class="box">

  <div class="field">
    <label class="label">POI Category Name</label>

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
      <button onclick={() => addPlaylist()} class="button is-primary">
        Add Category
      </button>
    </div>
  </div>

  <div class="content has-text-centered">
    {message}
  </div>

</div>
