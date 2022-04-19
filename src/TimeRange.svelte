<script lang="ts">
  import TimePicker from './TimePicker.svelte';

  export let startTime: string;
  export let endTime: string;

  $: console.log('TimeRange.svelte x: startTime =', startTime);
  const errorMessage = 'start time must be before end time';

  let startMinutes: number;
  $: startMinutes = getMinutes(startTime);
  $: endMinutes = getMinutes(endTime);

  let message = '';
  $: message = startMinutes <= endMinutes ? '' : errorMessage;

  function getMinutes(time: string): number {
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 60 + parseInt(minutes);
  }
</script>

<div class="time-range">
  <TimePicker bind:time={startTime} />
  <TimePicker bind:time={endTime} />
  {#if message}
    <div class="message">
      {message}
    </div>
  {/if}
</div>

<style>
  .message {
    color: red;
  }

  .time-range {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    font-family: sans-serif;
  }
</style>
