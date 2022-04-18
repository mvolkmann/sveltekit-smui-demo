<script lang="ts">
  // Also see https://6edesign.github.io/svelte-calendar/.
  import DatePicker from './DatePicker.svelte';
  import Dialog, {Actions, Content, Title} from '@smui/dialog';
  import {Icon} from '@smui/button';
  import {formatDateShort} from './date-util';

  export let date: Date;
  export let endDate: Date = null;
  export let range = false;

  let startValue: string;
  $: startValue = formatDateShort(date);

  let endValue: string;
  $: endValue = formatDateShort(endDate);

  let dateRange: string;
  $: dateRange = range ? startValue + ' to ' + endValue : '';

  let showDialog = false;

  const closeDialog = () => (showDialog = false);
  const toggleDialog = () => (showDialog = !showDialog);
</script>

<div class="date-input" class:range>
  {#if range}
    <input type="text" value={dateRange} />
  {:else}
    <input type="date" bind:value={startValue} />
  {/if}
  <Icon class="material-icons" on:click={toggleDialog}>event</Icon>
</div>

<Dialog bind:open={showDialog}>
  <DatePicker
    on:close={closeDialog}
    on:select={() => {
      if (!range) closeDialog();
    }}
    {range}
    bind:date
    bind:endDate
  />
</Dialog>

<style>
  .date-input {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    position: relative;
  }

  .date-input.range > input {
    width: 12rem;
  }

  .date-input:not(.range) :global(.material-icons) {
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
