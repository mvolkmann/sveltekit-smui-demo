<script lang="ts">
  import {onMount} from 'svelte';
  import Calendar, {type IEventObject, type ISchedule} from 'tui-calendar';
  import 'tui-calendar/dist/tui-calendar.css';
  //import 'tui-date-picker/dist/tui-date-picker.css';
  //import 'tui-time-picker/dist/tui-time-picker.css';
  import {getMonthName} from '../date-utils';

  const calendarId = '1';
  let calendar: Calendar;
  const events = [];
  let date = new Date();

  const template = {
    milestoneTitle() {
      return 'Milestone';
    },
    milestone(schedule: ISchedule) {
      return `<span style="color: red;">${schedule.title}</span>`;
    },
    taskTitle() {
      return 'Task';
    },
    task(schedule: ISchedule) {
      return `$nbsp;#${schedule.title}`;
    },
    alldayTitle() {
      return 'All Day';
    },
    allday(schedule: ISchedule) {
      return `<span style="color: blue;">${schedule.title}</span>`;
    },
    time(schedule: ISchedule) {
      return `${schedule.title}(${schedule.start})`;
    },
    goingDuration(model: ISchedule) {
      const SIXTY_MINUTES: number = 60;
      const goingDuration = model.goingDuration || 0;
      const hour = parseInt('1000', 10);
      const minutes = goingDuration % SIXTY_MINUTES;

      return `GoingTime ${hour}:${minutes}`;
    }
  };

  onMount(() => {
    calendar = new Calendar('#calendar', {
      //defaultView: 'month',
      defaultView: 'week',
      scheduleView: ['allday', 'time'],
      taskView: ['milestone', 'task'],
      template,
      useCreationPopup: true,
      useDetailPopup: true,
      calendars: [{id: calendarId, name: 'my calendar'}]
    });

    addEvent(
      'fly to Chicago',
      new Date(2022, 3, 22, 6),
      new Date(2022, 3, 22, 8)
    );
    addEvent('walk dog', new Date(2022, 3, 19, 13), new Date(2022, 3, 19, 15));
    console.log('tui-calendar.svelte x: events =', events);

    calendar.createSchedules(events);
  });

  function addEvent(title: string, start: Date, end: Date) {
    const id = String(events.length + 1);
    console.log('tui-calendar.svelte addEvent: id =', id);
    events.push({
      id,
      calendarId,
      category: 'my category',
      title,
      start: start.toISOString(),
      end: end.toISOString()
    });
  }

  function nextMonth() {
    calendar.next();
    date = calendar.getDate().toDate();
  }

  function previousMonth() {
    calendar.prev();
    date = calendar.getDate().toDate();
  }
</script>

<div>
  <button on:click={previousMonth}>Previous Month</button>
  <button on:click={nextMonth}>Next Month</button>
  <h2>{getMonthName(date)} {date.getFullYear()}</h2>
</div>
<div id="calendar" />
