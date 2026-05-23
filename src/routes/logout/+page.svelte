<script lang="ts">

  import { goto }
    from "$app/navigation";

  import {
    loggedInUser,
    currentPlaylists,
    currentPlacemarks
  } from "$lib/runes.svelte";

  loggedInUser.email = "";
  loggedInUser.name = "";
  loggedInUser.token = "";
  loggedInUser._id = "";

  currentPlaylists.playlists = [];
  currentPlacemarks.placemarks = [];

  goto("/");

</script>
