<script>
    import { createEventDispatcher } from 'svelte';
    export let day;
    export let title;

    const dispatch2 = createEventDispatcher();

  
    function squareClick() {
        console.log('component says clicked ' + day)
      dispatch2('customEvent', 
        { title: title, 
          day: day 
        });
    }
</script>

<button class="day-button" on:click={() => squareClick()}
    >
    <span class="day-button__title">{title}</span>
    {#if day % 10 === 1 && day != 11}
    <span class="day-button__date">{day}st</span>
    {:else if day % 10 === 2 && day != 12} 
    <span class="day-button__date">{day}nd</span>
    {:else if day % 10 === 3 && day != 13}
    <span class="day-button__date">{day}rd</span>
    {:else}
    <span class="day-button__date">{day}th</span>
    {/if}
    </button
  >

<style lang="scss">
    .day-button {
		width: 150px;
		height: 150px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid black;
		background-color: #fff;
		cursor: pointer;
		transition: background-color 0.3s;
		position: relative;
		&:hover {
			background-color: #f4f4f4;
		}
		&__date {
			color: rgba(0, 0, 0, 0.5);
			font-weight: 700;
			position: absolute;
			right: 5px;
			bottom: 0;
		}
	}
</style>