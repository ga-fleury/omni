<script>
    export let selectedDate;
    export let selectedDateTitle;
    export let date;

    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';

    const dispatch = createEventDispatcher();

    function handleInputChange() {
      console.log('Input changed:', title);
    }
  
    function closeModal() {
      dispatch('close', 
        { selectedDateTitle: selectedDateTitle, 
          day: selectedDate,
          date: date
        });
    }

    function handleEscapeKey(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      // Call the function you want to trigger
      closeModal()
      // Add any other logic you want here
    }

      // Use onMount to register the event handler
  onMount(() => {
    window.addEventListener('keydown', handleEscapeKey);

    // Cleanup function to remove event listener when component is destroyed
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  });
  }

  </script>
  
  <style>
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      max-width: 500px;
      width: 100%;
    }
  
    button {
      margin-top: 1rem;
    }
  </style>
  
  <div class="modal-backdrop" on:click={closeModal} role="button" aria-pressed="false" tabindex="0">
    <div class="modal-content" on:click|stopPropagation role="button" aria-pressed="false" tabindex="0">
      <input type="text" name="" id="day-title-input" bind:value={selectedDateTitle.title} on:input={handleInputChange}>
      <p>{selectedDate.toDateString()}</p>
      <button on:click={closeModal} role="button" aria-pressed="false" tabindex="0">Close</button>
    </div>
  </div>