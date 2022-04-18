<script lang="ts">
  import FullCalendar, {
    //Draggable,
    type CalendarOptions,
    type EventDef
  } from 'svelte-fullcalendar';
  import daygridPlugin from '@fullcalendar/daygrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import {notifications} from '../stores';

  let calendarRef;

  //let events: EventDef[] = [
  let events = [
    {title: 'Birthday', allDay: true, start: new Date(2022, 3, 16)},
    {
      title: 'fly to London',
      start: new Date(2022, 3, 22, 6),
      end: new Date(2022, 3, 22, 8)
    }
  ];

  let options: CalendarOptions = {
    dateClick: handleDateClick,
    dragScroll: true,
    droppable: true,
    editable: true,
    eventDurationEditable: true,
    eventResizableFromStart: true,
    eventStartEditable: true,
    events: events,
    //initialView: 'dayGridMonth',
    initialView: 'timeGridWeek',
    plugins: [daygridPlugin, interactionPlugin, timeGridPlugin],
    /*
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    */
    //height: '100%',
    weekends: true /* default is true */
  };

  function addNotification() {
    const formatter = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
    const timestamp = formatter.format(new Date());
    const text = `This notification was created at ${timestamp}.`;
    notifications.update(value => {
      value.push({text});
      return value;
    });
  }

  function goToPast() {
    let api = calendarRef.getAPI();
    api.gotoDate('1961-04-16');
  }

  function handleDateClick(event) {
    console.log('calendar.svelte handleDateClick: event =', event);
  }
</script>

<h1>svelte-fullcalendar Demo</h1>

<button on:click={goToPast}>Go to Past</button>
<button on:click={addNotification}>Notify</button>

<div class="calendar">
  <FullCalendar {options} bind:this={calendarRef} />
</div>

<style>
  .calendar {
    --fc-border-color: red;
    --fc-button-bg-color: orange;
    --fc-button-border-color: transparent;
    --fc-event-bg-color: purple;
    --fc-event-border-color: red; /* bullet before events */
    --fc-today-bg-color: rgba(0, 255, 0, 0.2); /* light green */

    font-family: sans-serif;
  }

  /* Override the SMUI setting for a elements which
     affects day of week and day of month links. */
  .calendar :global(a) {
    color: purple;
  }

  .calendar :global(.fc-button-group) {
    gap: 0.5rem;
  }

  .calendar :global(.fc-toolbar-title) {
    color: red;
  }
</style>
