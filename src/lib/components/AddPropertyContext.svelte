<script>
	import { createEventDispatcher } from 'svelte';
	let showMenu = false;

	const dispatch = createEventDispatcher();

	// Function to handle menu option click
	function handleOption(option) {
		showMenu = false; // Close the menu after selecting an option
		dispatch('optionChosen', option);
	}

	// Function to toggle the menu
	function toggleMenu() {
		showMenu = !showMenu;
	}

	// Close the menu if clicking outside
	function handleClickOutside(event) {
		if (showMenu) {
			showMenu = false;
		}
	}

	// Listen for clicks outside the menu
	document.addEventListener('click', handleClickOutside);
</script>

<div>
	<button class="add-property-btn" on:click={toggleMenu}
		><span class="material-symbols-outlined"> add </span><span class="text">Add property</span
		></button
	>
	{#if showMenu}
		<div class="context-menu show">
			<div class="context-menu-item" on:click={() => handleOption('text')}>Text</div>
			<div class="context-menu-item" on:click={() => handleOption('checkbox')}>Checkbox</div>
		</div>
	{/if}
</div>

<style>
	.context-menu {
		position: absolute;
		background: white;
		border: 1px solid #ccc;
		box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
		display: none;
	}

	.context-menu.show {
		display: block;
	}

	.context-menu-item {
		padding: 10px;
		cursor: pointer;
	}

	.context-menu-item:hover {
		background-color: #f0f0f0;
	}

	.add-property-btn {
		max-width: 100%;
		display: flex;
		align-items: center;
		width: auto;
		background-color: #fff;
		border: none;
		outline: none;
		padding: none;
		& span {
			padding: 0px 0px;
		}
		& .text {
			padding-left: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 2px;
		}
		&:hover {
			background-color: #c2c3c7;
		}
	}
</style>
