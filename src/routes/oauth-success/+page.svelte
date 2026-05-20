<script lang="ts">

  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { loggedInUser } from "$lib/runes.svelte";

  onMount(() => {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const token =
      params.get("token");

    const name =
      params.get("name");

    if (token) {

      // UPDATE STORE

      loggedInUser.token =
        token;

      loggedInUser.name =
        name || "GitHub User";

      // SAVE USING EXISTING FORMAT

      localStorage.playtime =
        JSON.stringify({

          email:
            "github@oauth.com",

          name:
            loggedInUser.name,

          token:
            loggedInUser.token,

          _id:
            "github-user"

        });

      // REDIRECT

      goto("/dashboard");

    }

  });

</script>

<section class="hero is-fullheight">

  <div class="hero-body">

    <div class="container has-text-centered">

      <h1 class="title">

        Logging in with GitHub...

      </h1>

    </div>

  </div>

</section>