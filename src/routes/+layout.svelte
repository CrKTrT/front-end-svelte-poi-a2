<script lang="ts">

import Menu from "$lib/ui/Menu.svelte";
import { loggedInUser, subTitle } from "$lib/runes.svelte";

  let { data, children } = $props();

  $effect(() => {

    if (data?.session) {

      loggedInUser.email =
        data.session.email;

      loggedInUser.name =
        data.session.name;

      loggedInUser.token =
        data.session.token;

      loggedInUser._id =
        data.session._id;

    }

  });

</script>

<div class="app-shell">

  {#if data.session}
    <Menu />
  {/if}

  <main class="main-content">

    <h2>{subTitle.text}</h2>

    {@render children()}

  </main>

</div>