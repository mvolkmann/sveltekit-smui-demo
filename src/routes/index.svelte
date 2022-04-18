<script lang="ts">
  import Autocomplete from '@smui-extra/autocomplete';
  import Button from '@smui/button';
  import MultiSelect from 'svelte-multiselect';

  import DateInput from '../DateInput.svelte';
  import {formatDateShort} from '../date-utils';

  const animals = ['Bird', 'Cat', 'Cow', 'Dog', 'Horse', 'Rabbit', 'Snake'];
  let selectedAnimal = '';
  let selectedAnimals = [];
  let selectedDate = new Date();

  let vacationStartDate: Date | null = null;
  let vacationEndDate: Date | null = null;

  $: selectedDateValue = formatDateShort(selectedDate);
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a>
  to read the documentation
</p>

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
