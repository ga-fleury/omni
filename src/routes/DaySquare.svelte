<script>
	import { createEventDispatcher } from 'svelte';
	import { findKeysWithIcon } from '../utils/utils';
  import StarIcon from '../lib/images/StarIcon.svelte'

	export let title;
	export let date;
	export let squareSize;
	export let details;

	let day = Number(String(date).slice(-2));

	const dispatch = createEventDispatcher();
  
  const booleanKeys = findKeysWithIcon(details)
  console.log(details)
  console.log(booleanKeys)


	function squareClick() {
		console.log('component says clicked ' + day);
		dispatch('squareClicked', { title: title, day: day, date: date });
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="day-button" on:click={() => squareClick()} style="--size: {squareSize};">

  {#each booleanKeys as key}
    {#if details[key].icon.enabled && details[key].boolean}
      <div class={details[key].icon.position} style="--icon-grid-area: {details[key].icon.position};">
        <StarIcon color={details[key].icon.color} />
      </div>
    {/if}
  {/each}

	<span class="day-button__title">{title}</span>

	<!-- {#if day % 10 === 1 && day != 11}
		<span class="day-button__date">{day}st</span>
	{:else if day % 10 === 2 && day != 12}
		<span class="day-button__date">{day}nd</span>
	{:else if day % 10 === 3 && day != 13}
		<span class="day-button__date">{day}rd</span>
	{:else}
		<span class="day-button__date">{day}th</span>
	{/if} -->
  <span class="day-button__date">{date.split('-').reverse().join('/')}</span>
</div>

<style lang="scss">
    .calendar {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 40px;
    }
	.day-button {
		height: 200px;
		width: 200px;
		max-width: var(--size);
		max-height: var(--size);
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		grid-template-areas:
			'icon1 icon2 icon3 icon4 icon5'
			'icon6 icon7 icon8 icon9 icon10'
			'title title title title title'
			'icon11 icon12 icon13 icon14 icon15'
			'icon16 icon17 icon18 icon19 icon20';
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
			color: rgba(0, 0, 0, .3);
			font-weight: 700;
			position: absolute;
			right: 4px;
			bottom: 0;
		}
		&__title {
			margin: 0px 15px;
			grid-area: title;
      text-align: center;
		}
	}

  @for $i from 1 through 10 {
  .icon#{$i} {
    width: 16px;  // Example width
    height: 16px; // Example height
    grid-area: icon#{$i};
    align-self: center;
    justify-self: center;
  }
}
</style>
