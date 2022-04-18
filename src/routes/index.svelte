<script lang="ts">
  import Autocomplete from '@smui-extra/autocomplete';
  import Button, {Label} from '@smui/button';

  import DateInput from '../DateInput.svelte';
  import {formatDateShort} from '../date-util';

  const animals = ['Bird', 'Cat', 'Cow', 'Dog', 'Horse', 'Rabbit', 'Snake'];
  let selectedAnimal = '';
  let selectedDate = new Date();

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

<div>
  <h2>Birthday (input type="date")</h2>
  <input type="date" bind:value={selectedDateValue} />
</div>

<div>
  <h2>Birthday (DatePicker)</h2>
  <DateInput bind:date={selectedDate} />
</div>

<style>
  input[type='date'] {
    border: 1px solid lightgray;
    border-radius: 0.5rem;
    font-size: 1rem;
    padding: 0.5rem;
  }
</style>
