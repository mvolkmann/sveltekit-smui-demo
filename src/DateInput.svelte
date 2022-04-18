<script lang="ts">
  // Also see https://6edesign.github.io/svelte-calendar/.
  import DatePicker from './DatePicker.svelte';
  import Dialog, {Actions, Content, Title} from '@smui/dialog';
  import {Icon} from '@smui/button';

  export let date: Date;

  $: console.log('DateInput.svelte x: date =', date);
  $: console.log(
    'DateInput.svelte x: date instanceof Date =',
    date instanceof Date
  );

  let showDialog = false;

  const toggleDialog = () => (showDialog = !showDialog);
</script>

<div class="date-input">
  <input type="date" bind:value={date} />
  <Icon class="material-icons" on:click={toggleDialog}>event</Icon>
</div>

<Dialog bind:open={showDialog}>
  <DatePicker on:close={() => (showDialog = false)} bind:selectedDate={date} />
</Dialog>

<style>
  .date-input {
    display: inline-block;
    position: relative;
  }

  .date-input :global(.material-icons) {
    position: absolute;
    right: 8px;
    top: 7px;

    background-color: white;
  }

  input {
    border: 1px solid lightgray;
    border-radius: 0.5rem;
    font-size: 1rem;
    padding: 0.5rem;
  }
</style>
