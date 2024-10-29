<script>
	import { createEventDispatcher } from 'svelte';
	import { findKeysWithIcon } from '../utils/utils';
	import StarIcon from '../lib/images/StarIcon.svelte';

	export let title;
	export let date;
	export let squareSize;
	export let details;
	export let monthShow;

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	let day = Number(String(date).slice(-2));

	const dispatch = createEventDispatcher();

	const booleanKeys = findKeysWithIcon(details.properties);
	// console.log(details);
	// console.log(booleanKeys);

	function squareClick() {
		// console.log('component says clicked ' + day);
		dispatch('squareClicked', { title, day, date });
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="day-button" on:click={() => squareClick()} style="--size: {squareSize};">
	{#each booleanKeys as key}
		{#if details.properties[key].icon.enabled && details.properties[key].boolean}
			<div class={details.properties[key].icon.position}>
				<span class="material-symbols-outlined">
					{details.properties[key].icon.name}
				</span>
			</div>
		{/if}
	{/each}

	<span class="day-button__title">{title}</span>

	{#if monthShow}
		<div class="month-banner">
			<span class="day-button__month">{monthNames[Number(date.slice(5, 7)) - 1].toUpperCase()}</span
			>
		</div>
	{/if}
	<span class="day-button__date">{date.slice(-2)}</span>
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
			position: absolute;
			color: #c2c3c7;
			font-weight: 700;
			right: 4px;
			bottom: 0px;
			&.black {
				display: inline-block;
				padding: 0px 4px;
				right: 0px;
				color: #c2c3c7;
			}
		}
		&__month {
			display: inline-block;
			color: #c2c3c7;
			font-weight: bold;
			padding-left: 4px;
			left: 0px;
			bottom: 0px;
			line-height: 100%;
		}
		&__title {
			padding: 0px 10px;
			grid-area: title;
			text-align: center;
			font-weight: 600;
			color: black;
			position: absolute;
			width: calc(100% - 20px);
		}
	}

	.month-banner {
		grid-column: 1 / 6;
		grid-row: 5 / 6;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		margin-bottom: -12px;
	}

	@for $i from 1 through 20 {
		.icon#{$i} {
			font-size: 12px;
			grid-area: icon#{$i};
			font-family: 'MaterialSymbolsOutlined-VariableFont_FILL';
			@if $i <= 10 {
				align-self: center;
				margin: 4px;
				justify-self: center;
			}
		}
	}

	.material-symbols-outlined {
		font-variation-settings:
			'FILL' 0,
			'wght' 500,
			'GRAD' 200,
			'opsz' 24;
		font-size: 20px;
	}
</style>
