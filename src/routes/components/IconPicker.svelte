<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    //TODO - make a better selection of icons
    //TODO - implement a context menu
    
    let icons = [];
    export let selectedIcon;
    let pickerOpen = false;
  
    // An array of sample Material icons names
    const iconList = [
      'self_improvement', 'favorite', 'settings', 'star', 'thumb_up', 'camera', 'face', 'alarm', 'check', 'shopping_cart'
    ];
    
    // Load the icons (in a real-world scenario, you could fetch this dynamically)
    onMount(() => {
      icons = iconList; // Here you can also fetch from an API if needed
    });
  
    function selectIcon(icon) {
      selectedIcon = icon;
      dispatch('handleIconChange', icon)
    }

    function handleOpen() {
        pickerOpen = !pickerOpen
    }
  </script>
  
  <style>
    .icon-picker {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
      gap: 10px;
    }
    .icon {
      cursor: pointer;
      text-align: center;
      font-size: 40px;
      transition: transform 0.2s;
    }
    .icon:hover {
      transform: scale(1.2);
    }
  </style>
  
  <div>
    <span on:click={handleOpen} class="material-symbols-outlined">{selectedIcon}</span>
    {#if pickerOpen}
            <div class="icon-picker">
      {#each icons as icon}
        <div class="icon" on:click={() => selectIcon(icon)}>
          <span class="material-symbols-outlined">{icon}</span>
        </div>
      {/each}
    </div>
    {/if}
  </div>