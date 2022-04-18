<script lang="ts">
  import Button, {Icon, Label} from '@smui/button';
  import Dialog, {Actions, Content, Title} from '@smui/dialog';

  import {notifications} from './stores';

  export let show: boolean;

  $: if ($notifications.length === 0) show = false;

  function deleteNotification(index: number) {
    notifications.update(value => {
      value.splice(index, 1);
      return value;
    });
  }
</script>

<div class="notifications-dialog">
  <Dialog bind:open={show}>
    <Title>Notifications</Title>
    <Content>
      <ul>
        {#each $notifications as notification, index}
          <li>
            {notification.text}

            <button on:click={() => deleteNotification(index)}>
              <Icon class="material-icons">delete</Icon>
            </button>
          </li>
        {/each}
      </ul>
    </Content>
    <Actions>
      <Button on:click={() => (show = false)}>
        <Label>Close</Label>
      </Button>
    </Actions>
  </Dialog>
</div>

<style>
  button {
    background: transparent;
    border: none;
  }

  li > button {
    position: relative;
    top: 0.5rem;

    padding-left: 0;
  }

  .notifications-dialog :global(.mdc-dialog__container) {
    display: inline-block;

    position: absolute;
    right: 0;
    top: 64px;
  }
</style>
