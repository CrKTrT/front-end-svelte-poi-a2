<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import { donationService } from "$lib/services/donation-service";
  import Heading from "$lib/ui/Heading.svelte";
  import Menu from "$lib/ui/Menu.svelte";
  import { onMount } from "svelte";

  onMount(async () => {
    await donationService.restoreSession();
  });
</script>

<div class="has-background-light" style="min-height:100vh;">

  {#if loggedInUser.email}

    <nav class="navbar is-dark">
      <div class="navbar-brand">

        <div class="navbar-item has-text-weight-bold is-size-4">
          Blackrock → SETU POI Guide
        </div>

      </div>

      <div class="navbar-end mr-5">

        <div class="navbar-item">
          Welcome {loggedInUser.name}
        </div>

      </div>
    </nav>

    <Menu />
    <Heading />

  {/if}

  <div class="container p-5">
    <slot />
  </div>

</div>