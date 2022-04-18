<script lang="ts">
  import {createEventDispatcher} from 'svelte';
  import {DAYS, MONTH_NAMES} from './date-utils';

  export let selectedDate: Date;
  export let maxYear = (selectedDate || new Date()).getFullYear() + 10;
  export let minYear = (selectedDate || new Date()).getFullYear() - 10;
  export let preventFuture = false;
  export let preventPast = false;

  const dispatch = createEventDispatcher();

  const today = new Date();
  let currentDay = today.getDate();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  // Initial date whose month should be displayed.
  let date = new Date(selectedDate);

  let daySets: string[][] = [];

  let month: number;
  $: month = date.getMonth();

  let year: number;
  $: year = date.getFullYear();

  $: setDaySets(date);

  let disablePrevious = false;
  $: disablePrevious =
    preventPast &&
    (year < currentYear || (year === currentYear && month <= currentMonth));

  let disableNext = false;
  $: disableNext =
    preventFuture &&
    (year > currentYear || (year === currentYear && month >= currentMonth));

  function changeMonth(event: Event) {
    const target = event.target as HTMLSelectElement;
    date.setMonth(Number(target.value));
    date = date; // trigger reactivity
  }

  function changeYear(event: Event) {
    const target = event.target as HTMLSelectElement;
    date.setFullYear(Number(target.value));
    date = date; // trigger reactivity
  }

  function getDateSuffix(year: number, month: number, day: number): string {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'b'; // for before
    }

    if (year > currentYear || (year === currentYear && month > currentMonth)) {
      return 'a'; // for after
    }

    if (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    ) {
      return 't'; // for today
    }

    const currentDay = date.getDate();
    if (year === currentYear && month === currentMonth && day === currentDay) {
      return 's'; // for selected
    }

    return '';
  }

  function getLastDayInCurrentMonth(): number {
    const d = new Date(year, month + 1, 1); // 1st of next month
    d.setDate(d.getDate() - 1);
    return d.getDate();
  }

  function getLastDayInPreviousMonth(): number {
    const d = new Date(year, month, 1); // 1st of current month
    d.setDate(d.getDate() - 1);
    return d.getDate();
  }

  function isSelected(day: string): boolean {
    const selected =
      !day.endsWith('a') &&
      !day.endsWith('b') &&
      parseInt(day) == selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
    return selected;
  }

  function nextMonth() {
    date = new Date(date); // copy so selectedDate isn't modified
    date.setMonth(date.getMonth() + 1);
  }

  function previousMonth() {
    date = new Date(date); // copy so selectedDate isn't modified
    date.setMonth(date.getMonth() - 1);
  }

  function selectDate(day: string) {
    const before = day.endsWith('b');
    const after = day.endsWith('a');
    let selectedYear = year;
    let selectedMonth = month;
    if (before && month === 0) {
      selectedYear--;
      selectedMonth = 11;
    } else if (after && month === 11) {
      selectedYear++;
      selectedMonth = 0;
    } else if (before) {
      selectedMonth--;
    } else if (after) {
      selectedMonth++;
    }
    const newDate = new Date(selectedYear, selectedMonth, parseInt(day));
    if (preventPast && newDate < today) return;
    if (preventFuture && newDate > today) return;
    date = selectedDate = newDate;

    // Prepare to reopen on the last selected month.
    year = selectedYear;
    month = selectedMonth;

    dispatch('select');
  }

  function setDaySets(date: Date) {
    let y = date.getFullYear();
    let m = date.getMonth();
    daySets = [];

    const isSelectedMonth =
      y === selectedDate.getFullYear() && m === selectedDate.getMonth();

    const d = new Date(y, m, 1); // 1st of current month
    const dayOfWeekIndex = d.getDay();
    const set = [];

    if (!preventPast && dayOfWeekIndex > 0) {
      const end = getLastDayInPreviousMonth();
      const start = end - dayOfWeekIndex + 1;
      for (let day = start; day <= end; day++) {
        if (preventPast && new Date(y, m, day) < today) continue;
        set.push(day + 'b');
      }
    }

    const remaining = 7 - dayOfWeekIndex;
    for (let day = 1; day <= remaining; day++) {
      const suffix = isSelectedMonth && day === currentDay ? 't' : '';
      if (preventPast && new Date(y, m, day) < today) continue;
      if (preventFuture && new Date(y, m, day) > today) continue;
      set.push(day + suffix);
    }
    daySets.push(set);

    let day = remaining + 1;
    const end = getLastDayInCurrentMonth();
    let lastRow = false;
    while (!lastRow) {
      const set = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(y, m, day);
        const skip =
          (preventPast && date < today) || (preventFuture && date > today);

        if (!skip) set.push(day + getDateSuffix(y, m, day));

        day++;
        if (day > end) {
          day = 1;
          m++;
          lastRow = true;
        }
      }
      daySets.push(set);
    }

    //console.log('DatePicker.svelte x: daySets =', daySets);
    daySets = daySets; // trigger reactivity
  }
</script>

<div class="date-picker">
  <header>
    <button disabled={disablePrevious} on:click={previousMonth}>
      <img alt="left" src="/images/angle-left.png" />
    </button>

    <div class="select-wrapper">
      <select
        class="month-select"
        on:blur={changeMonth}
        on:change={changeMonth}
        value={month}
      >
        {#each MONTH_NAMES as month, index}
          <option value={index}>{month}</option>
        {/each}
      </select>
      <select
        class="year-select"
        on:blur={changeYear}
        on:change={changeYear}
        value={year}
      >
        {#each Array(maxYear - minYear + 1) as _, index}
          <option>{minYear + index}</option>
        {/each}
      </select>
    </div>

    <button disabled={disableNext} on:click={nextMonth}>
      <img alt="left" src="/images/angle-right.png" />
    </button>
  </header>
  <table>
    <thead>
      <tr>
        {#each DAYS as day}
          <th>{day}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each daySets as daySet}
        <tr>
          {#each daySet as day}
            <td
              class:after={day.endsWith('a')}
              class:before={day.endsWith('b')}
              class:selected={isSelected(day)}
              class:today={day.endsWith('t')}
              on:click={() => selectDate(day)}
            >
              <div class="day">{parseInt(day, 10)}</div>
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="buttons">
    <button on:click={() => dispatch('close')}>Close</button>
    <button on:click={() => (date = selectedDate = new Date())}>Today</button>
  </div>
</div>

<style>
  .buttons {
    margin-top: 0.5rem;
  }

  .buttons > button {
    font-size: 1.2rem;
  }

  .date-picker {
    display: inline-flex;
    flex-direction: column;
    align-items: center;

    background-color: white;
    border: 1px solid gray;
    font-family: sans-serif;
    padding: 0.5rem 1rem 1rem 1rem;
  }

  .day {
    --size: 1.8rem;

    border: 2px solid transparent;
    border-radius: 50%;
    box-sizing: border-box;
    color: gray;
    display: inline-block;
    height: var(--size);
    padding-top: 3px;
    text-align: center;
    width: var(--size);
  }

  .day:hover {
    color: green;
  }

  .date-picker :global(.after > .day) {
    color: purple;
  }

  .date-picker :global(.before > .day) {
    color: purple;
  }

  header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  header > button {
    background: none;
    border: none;
  }

  header > button > img {
    --size: 1.5rem;
    max-height: var(--size);
    max-width: var(--size);
  }

  header > div {
    display: flex;
    justify-content: space-between;
  }

  .month-select {
    width: 7.5rem;
  }

  select {
    background-color: lightgray;
    border: none;
    font-size: 1rem;
    padding: 0.5rem;
  }

  .select-wrapper {
    display: flex;
    gap: 1rem;
  }

  .selected > .day {
    border-color: green;
  }

  table {
    --table-height: 14rem;
    height: var(--table-height);
  }

  td {
    text-align: right;
    vertical-align: top;
  }

  td:hover {
    font-weight: bold;
  }

  th {
    color: var(--input-bg-color);
    padding: 0.5rem 0.2rem;
    width: 2.2rem;
  }

  .today > .day {
    color: blue;
  }

  tr {
    height: calc(var(--table-height) / 6);
  }

  .year-select {
    width: 4.5rem;
  }
</style>
