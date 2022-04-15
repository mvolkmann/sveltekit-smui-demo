<script lang="ts">
  import Button, {Label} from '@smui/button';
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a>
  to read the documentation
</p>

<Button on:click={() => alert('It worked!')} variant="raised">Click Me!</Button>
<Button color="secondary" on:click={() => alert('It worked!')} variant="raised">
  Click Me!
</Button>

<style>
  p {
    color: red;
  }
</style>
