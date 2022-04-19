<script lang="ts">
  export let time: string;
</script>

<input type="time" bind:value={time} />

<style>
  input[type='time'] {
    border: 1px solid lightgray;
    border-radius: 0.5rem;
    font-size: 1rem;
    padding: 0.5rem;
  }
</style>
