<script>
	export let selectedDate;
	export let selectedDateInfo;
	export let date;

	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import { findKeysWithBoolean } from '../utils/utils';

	function handleInputChange() {
		const textarea = document.querySelector('#day-title-input');
		this.style.height = 'auto';
		this.style.height = `${textarea.scrollHeight}px`;
		selectedDateInfo.title = textarea.textContent;
	}

	function closeModal() {
		dispatch('close', { selectedDateInfo, day: selectedDate, date });
	}

	function handleEscapeKey(event) {
		if (event.key === 'Escape' || event.key === 'Esc') {
			// Call the function you want to trigger
			dispatch('close', { selectedDateInfo, day: selectedDate, date });
			// Add any other logic you want here
		}

	}

	console.log(selectedDateInfo);

	const booleanKeys = findKeysWithBoolean(selectedDateInfo);

	const dispatch = createEventDispatcher();

	console.log(JSON.stringify(selectedDateInfo));
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal-backdrop" on:click={closeModal}>
	<div class="modal-content" on:click|stopPropagation>
		<p class="modal-date">{selectedDate.toDateString()}</p>
		<div class="row">
			<span
				type="text"
				name=""
				class={selectedDateInfo.title ? 'day-title-input' : 'day-title-input empty'}
				id="day-title-input"
				placeholder="your day's highlight"
				on:input={handleInputChange}
				on:keydown={handleEscapeKey}
				contenteditable
			>
				{selectedDateInfo.title}
			</span>
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
	:root {
		--title-margin: 20px;
	}
	.day-title-input {
		border: none;
		border-bottom: 1px solid white;
		font-size: 2rem;
		width: 100%;
		max-width: 100%;
		margin-bottom: var(--title-margin);
		resize: none;
		height: 40px;
		min-height: 40px;
		overflow-y: hidden;
		color: black;

		&:focus {
			border: none;
			border-bottom: 1px solid black;
		}
		&:focus-visible {
			outline: none;
		}
		&.empty {
			border-bottom: 1px solid black;
		}
		&[contenteditable]:empty::before {
			content: "this day's highlight";
			color: var(--color-pico-gray);
			margin-bottom: var(--title-margin);
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
	.modal {
		&-backdrop {
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
		&-content {
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
		&-date {
			margin-top: 0;
			margin-bottom: 10px;
		}
	}

	button {
		margin-top: 1rem;
		max-width: 100px;
	}
</style>
