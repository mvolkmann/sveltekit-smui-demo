<script>
  import Button, {Label} from '@smui/button';
  import Dialog, {Actions, Content, Title} from '@smui/dialog';

  import {notifications} from './stores';

  export let show;
</script>

<div class="notifications-dialog">
  <Dialog bind:open={show}>
    <Title>Notifications</Title>
    <Content>
      <ul>
        {#each $notifications as notification}
          <li>{notification.text}</li>
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
  .notifications-dialog :global(.mdc-dialog__container) {
    display: inline-block;

    position: absolute;
    right: 0;
    top: 64px;
  }
</style>
