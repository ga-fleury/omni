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
		'self_improvement',
		'favorite',
		'fitness_center',
		'star',
		'thumb_up',
		'camera',
		'face',
		'alarm',
		'check',
		'shopping_cart'
	];

	// Load the icons (in a real-world scenario, you could fetch this dynamically)
	onMount(() => {
		icons = iconList; // Here you can also fetch from an API if needed
	});

	function selectIcon(icon) {
		selectedIcon = icon;
		pickerOpen = !pickerOpen;
		dispatch('handleIconChange', icon);
	}

	function handleOpen(event) {
		pickerOpen = !pickerOpen;
		setTimeout(() => {
			const iconPicker = document.getElementById('icon_picker');
			console.log(iconPicker);
			iconPicker.style.top = `${event.clientY}px`;
			iconPicker.style.left = `${event.clientX}px`;
			iconPicker.style.opacity = 1;
		}, 0.0001);
	}
</script>

<div class="icon-picker-wrap">
	<span on:click={handleOpen} class="material-symbols-outlined">{selectedIcon}</span>
</div>
{#if pickerOpen}
	<div class="icon-picker-bg" on:click={() => (pickerOpen = false)}>
		<div class="icon-options" id="icon_picker">
			{#each icons as icon}
				<div class="icon" on:click={() => selectIcon(icon)}>
					<span class="material-symbols-outlined">{icon}</span>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	.icon-options {
		opacity: 0;
		display: grid;
		position: absolute;
		width: 100%;
		max-width: 250px;
		background-color: #fff;
		padding: 10px 10px;
		-webkit-box-shadow: 11px 10px 17px 0px rgba(219, 219, 219, 1);
		-moz-box-shadow: 11px 10px 17px 0px rgba(219, 219, 219, 1);
		box-shadow: 11px 10px 17px 0px rgba(219, 219, 219, 1);
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
	.icon-picker-wrap {
		cursor: pointer;
		width: 24px;
		&:hover {
			background-color: #c2c3c7;
		}
	}
	.icon-picker-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(200, 0, 0, 0);
	}
</style>
