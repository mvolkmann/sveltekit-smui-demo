<script lang="ts">
  import Autocomplete from '@smui-extra/autocomplete';
  import Button from '@smui/button';
  import MultiSelect from 'svelte-multiselect';
  import {TimePicker} from 'svelte-time-picker';

  import DateInput from '../DateInput.svelte';
  import TimePicker2 from '../TimePicker.svelte';
  import TimeRange from '../TimeRange.svelte';
  import {
    dateTo24HourTime,
    formatDateShort,
    timeFrom24Hour
  } from '../date-utils';

  const animals = ['Bird', 'Cat', 'Cow', 'Dog', 'Horse', 'Rabbit', 'Snake'];
  const currentTime = dateTo24HourTime(new Date());
  console.log('index.svelte x: currentTime =', currentTime);

  let bedtime = '';
  let selectedAnimal = '';
  let selectedAnimals = [];
  let selectedDate = new Date();
  let startTime = currentTime;
  let endTime = currentTime;
  let vacationEndDate: Date | null = null;
  let vacationStartDate: Date | null = null;

  $: selectedDateValue = formatDateShort(selectedDate);

  $: formattedBedtime = timeFrom24Hour('en-US', bedtime);

  function onTimeChange(event) {
    const time = event.detail; // a Date object
    console.log('index.svelte onTimeChange: time =', time);
  }
</script>

<h1>Welcome to SvelteKit</h1>

<div>
  <Button on:click={() => alert('It worked!')} variant="raised">
    Click Me!
  </Button>
  <Button
    color="secondary"
    on:click={() => alert('It worked!')}
    variant="raised"
  >
    Click Me!
  </Button>
</div>

<Autocomplete
  combobox
  label="Favorite Animal"
  options={animals}
  bind:value={selectedAnimal}
/>

<div class="row">
  <p>Favorite Animals</p>
  <MultiSelect bind:selected={selectedAnimals} options={animals} />
</div>

<div>
  <h2>Birthday (input type="date")</h2>
  <input type="date" bind:value={selectedDateValue} />
</div>

<div>
  <h2>Birthday (DatePicker)</h2>
  <DateInput bind:date={selectedDate} />
</div>

<div>
  <h2>Vacation Date Range</h2>
  <DateInput
    range
    bind:date={vacationStartDate}
    bind:endDate={vacationEndDate}
  />
</div>

<div>
  <h2>Bedtime</h2>
  <TimePicker2 bind:time={bedtime} />
  <p>Your bedtime is {formattedBedtime}.</p>
</div>

<TimeRange {startTime} {endTime} />

<br />

<TimePicker on:change={onTimeChange} />

<style>
  input[type='date'] {
    border: 1px solid lightgray;
    border-radius: 0.5rem;
    font-size: 1rem;
    padding: 0.5rem;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 1rem;

    font-family: sans-serif;
  }
</style>
