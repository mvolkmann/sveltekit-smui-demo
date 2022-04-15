<script lang="ts">
  import {onMount} from 'svelte';
  //import Button, {Label} from '@smui/button';
  import {H6} from '@smui/common/elements';
  import Drawer, {AppContent, Content, Header, Subtitle} from '@smui/drawer';
  import List, {Graphic, Item, Separator, Subheader, Text} from '@smui/list';
  import TopAppBar, {AutoAdjust, Row, Section, Title} from '@smui/top-app-bar';
  import type {TopAppBarComponentDev} from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';
  import {page} from '$app/stores';

  const pages = [
    {title: 'Inbox', icon: 'inbox'},
    {title: 'Star', icon: 'star'},
    {title: 'Sent Mail', icon: 'send'},
    {title: 'Drafts', icon: 'drafts'}
  ];

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

<AutoAdjust {topAppBar}>
  <Drawer variant="modal" fixed={false} bind:open={drawerOpen}>
    <Content>
      <List>
        {#each pages as page}
          <Item
            on:click={() => setActive(page.title)}
            activated={activePage === page.title}
          >
            <Graphic class="material-icons" aria-hidden="true">
              {page.icon}
            </Graphic>
            <Text>{page.title}</Text>
          </Item>
        {/each}
      </List>
    </Content>
  </Drawer>

  <slot />
</AutoAdjust>
