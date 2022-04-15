<script lang="ts">
  import {onMount} from 'svelte';
  //import Button, {Label} from '@smui/button';
  import {H6} from '@smui/common/elements';
  import Drawer, {AppContent, Content, Header, Subtitle} from '@smui/drawer';
  import List, {Graphic, Item, Separator, Subheader, Text} from '@smui/list';
  import TopAppBar, {AutoAdjust, Row, Section, Title} from '@smui/top-app-bar';
  import type {TopAppBarComponentDev} from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';

  let activePage = 'Inbox';
  let darkTheme: boolean;
  let drawerOpen = false;
  let topAppBar: TopAppBarComponentDev;

  $: modeLabel = `switch to ${darkTheme ? 'light' : 'dark'} mode`;

  // This icon represents the mode to which the user can switch.
  $: modeIcon = darkTheme ? 'light_mode' : 'dark_mode';

  onMount(() => {
    darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  function setActive(page: string) {
    console.log('__layout.svelte setActive: page =', page);
    activePage = page;
    drawerOpen = false;
  }

  const toggleDrawer = () => (drawerOpen = !drawerOpen);
  const toggleMode = () => (darkTheme = !darkTheme);
</script>

<svelte:head>
  {#if darkTheme === undefined}
    <link
      rel="stylesheet"
      href="/smui-light.css"
      media="(prefers-color-scheme: light)"
    />
    <link
      rel="stylesheet"
      href="/smui-dark.css"
      media="screen and (prefers-color-scheme: dark)"
    />
  {:else if darkTheme}
    <link rel="stylesheet" href="/smui-light.css" media="print" />
    <link rel="stylesheet" href="/smui-dark.css" media="screen" />
  {:else}
    <link rel="stylesheet" href="/smui-light.css" />
  {/if}
</svelte:head>

<TopAppBar bind:this={topAppBar} variant="standard">
  <Row>
    <Section>
      <IconButton class="material-icons" on:click={toggleDrawer}>
        menu
      </IconButton>
      <Title>{activePage}</Title>
    </Section>
    <Section align="end" toolbar>
      <IconButton
        aria-label={modeLabel}
        class="material-icons"
        on:click={toggleMode}
        title={modeLabel}
      >
        {modeIcon}
      </IconButton>
    </Section>
  </Row>
</TopAppBar>

<div class="drawer-container">
  <Drawer variant="modal" fixed={false} bind:open={drawerOpen}>
    <Header>
      <Title>Super Mail</Title>
      <Subtitle>It's the best fake mail app drawer.</Subtitle>
    </Header>
    <Content>
      <List>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Inbox')}
          activated={activePage === 'Inbox'}
        >
          <Graphic class="material-icons" aria-hidden="true">inbox</Graphic>
          <Text>Inbox</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Star')}
          activated={activePage === 'Star'}
        >
          <Graphic class="material-icons" aria-hidden="true">star</Graphic>
          <Text>Star</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Sent Mail')}
          activated={activePage === 'Sent Mail'}
        >
          <Graphic class="material-icons" aria-hidden="true">send</Graphic>
          <Text>Sent Mail</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Drafts')}
          activated={activePage === 'Drafts'}
        >
          <Graphic class="material-icons" aria-hidden="true">drafts</Graphic>
          <Text>Drafts</Text>
        </Item>

        <Separator />
        <Subheader component={H6}>Labels</Subheader>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Family')}
          activated={activePage === 'Family'}
        >
          <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
          <Text>Family</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Friends')}
          activated={activePage === 'Friends'}
        >
          <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
          <Text>Friends</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Work')}
          activated={activePage === 'Work'}
        >
          <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
          <Text>Work</Text>
        </Item>
      </List>
    </Content>
  </Drawer>

  <div class="main-content">
    <AutoAdjust {topAppBar}>
      <slot />
    </AutoAdjust>
  </div>
</div>

<style>
  .drawer-container {
    position: relative;
    display: flex;
    /* height: 350px; */
    height: 100%;
    max-width: 600px;
    border: 1px solid
      var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
    overflow: hidden;
    z-index: 0;
  }

  .main-content {
    overflow: auto;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
  }

  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }
</style>
