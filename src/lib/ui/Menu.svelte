<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  console.log(loggedInUser.email);
  console.log(loggedInUser._id);
</script>


<nav class="navbar is-dark is-spaced shadow-lg">
  <div class="container">

    <!-- LOGO / TITLE -->

    <div class="navbar-brand">

          <a class="navbar-item" href="/dashboard">

              <span class="icon mr-2">
          
              </span>

              <span class="has-text-weight-bold is-size-5">
                Blackrock POI Guide
              </span>

          </a>

    </div>

    <!-- MENU LINKS -->

    <div class="navbar-menu">

      <div class="navbar-end">

        <!-- DASHBOARD -->

        <a class="navbar-item" href="/dashboard">
          Dashboard
        </a>

        <!-- MAPS -->

        <a class="navbar-item" href="/maps">
          Maps
        </a>

        <a class="navbar-item" href="/analytics">
          Analytics
        </a>

        <!-- USER -->

        <div class="navbar-item">
           {loggedInUser.name}
        </div>

        <!-- LOGOUT -->

        <a href="/logout" data-sveltekit-preload-data="tap" >
          Logout
        </a>

        <a class="navbar-item" href="/maps">
          Maps
        </a>

      </div>

    </div>

  </div>
</nav>
