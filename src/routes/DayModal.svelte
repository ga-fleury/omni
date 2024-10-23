<script>
	export let selectedDate;
	export let selectedDateInfo;
	export let date;

	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import { findKeysWithBoolean } from '../utils/utils'

	function handleInputChange() {
		console.log('Input changed:', title);
	}

	function closeModal() {
		dispatch('close', { selectedDateInfo: selectedDateInfo, day: selectedDate, date: date });
	}

	function handleEscapeKey(event) {
		if (event.key === 'Escape' || event.key === 'Esc') {
			// Call the function you want to trigger
			closeModal();
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

	console.log(selectedDateInfo)
	
	const booleanKeys = findKeysWithBoolean(selectedDateInfo)

	const dispatch = createEventDispatcher();

	console.log(JSON.stringify(selectedDateInfo));
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal-backdrop" on:click={closeModal}>
	<div class="modal-content" on:click|stopPropagation>
		<div class="row">
			<input
				type="text"
				name=""
				class="{selectedDateInfo.title ? 'day-title-input' : 'day-title-input empty'}"
				id="day-title-input"
				placeholder="your day's highlight"
				bind:value={selectedDateInfo.title}
				on:input={handleInputChange}
			/>
			<p>{selectedDate.toDateString()}</p>
		</div>
		{#each booleanKeys as key}
			<div class="row together">
				<label for="">{key}</label>
				<input type="checkbox" id="key" bind:checked={selectedDateInfo[key].boolean} />
			</div>
		{/each}
		<button on:click={closeModal}>Close</button>
	</div>
</div>

<style lang="scss">
	.day-title-input {
		border: none;
		font-size: 2rem;
		max-width: 70%;

		&:focus {
			border: none;
			border-bottom: 1px solid black;
			margin-bottom: -1px;
		}
		&:focus-visible {
			outline: none;
		}
		&.empty {
			border-bottom: 1px solid black;
		}
	}
	.row {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		&.together {
			justify-content: start;
		}
	}
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
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: start;
	}

	button {
		margin-top: 1rem;
		max-width: 100px;
	}
</style>
