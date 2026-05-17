<script lang="ts">
  //import { subTitle } from "$lib/runes.svelte";
  //import Card from "$lib/ui/Card.svelte";
  //import DonateForm from "./Dashboard.svelte";
  //import DonationList from "$lib/ui/DonationList.svelte";

  import { onMount } from "svelte";
  import { subTitle, currentPlaylists, currentPlacemarks, loggedInUser } from "$lib/runes.svelte";
  import { donationService } from "$lib/services/donation-service";
  import Card from "$lib/ui/Card.svelte";

  subTitle.text = "Blackrock to SETU Travel POI Dashboard";
  onMount(async () => {
    await donationService.restoreSession();
  });
  
</script>

<div class="columns">
  <div class="column">
    <Card title="Donations to Date">
      <DonationList />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <DonateForm />
    </Card>
  </div>
</div>
