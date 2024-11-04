<script>
	export let selectedDate;
	export let selectedDateInfo;
	let date;
	let changedProperty;
	let newPropertyValue;
	let objectIndex;
	let massPropertyUpdate = false;
	let massIconUpdate = false;
	let iconIndex;
	let newIconName;

	import { createEventDispatcher } from 'svelte';
	import { findKeysWithBoolean, findObjectIndexByValue } from '../../utils/utils';
	import dayjs from 'dayjs';
	import LocalizedFormat from 'dayjs/plugin/localizedFormat';
	import 'dayjs/locale/en';
	import ModalItem from '$lib/components/ModalItem.svelte';
	import AddPropertyContext from '$lib/components/AddPropertyContext.svelte';

	// Extend Day.js with the localized format plugin
	dayjs.extend(LocalizedFormat);

	// Optionally, set the locale globally if you want dayjs behavior throughout your app
	dayjs.locale(navigator.language || 'en'); // Automatically use the user's browser locale setting

	// TODO - multiline titles don't show up completely when opening up the modal
	// TODO - better layout for items, see obsidian/notion for reference
	// TODO - modular item creation inside of the modal
	// TODO - handle icon/property name changes using only one function
	// TODO - handle multiple changes per modal close (currently only one)
	// TODO - add addproperty functionality
	// TODO - make addproperty propagate to other days

	function handleInputChange() {
		const textarea = document.querySelector('#day-title-input');
		this.style.height = 'auto';
		this.style.height = `${textarea.scrollHeight}px`;
		selectedDateInfo.title = textarea.textContent;
	}

	function closeModal() {
		dispatch('close', { selectedDateInfo, day: selectedDate, date });
		console.log('close', { selectedDateInfo, day: selectedDate, date })
		if (massPropertyUpdate) {
			dispatch('propertySchemaChange', { changedProperty, newPropertyValue, objectIndex });
			massPropertyUpdate = false;
		}
		if (massIconUpdate) {
			dispatch('massIconChange', { newIconName, iconIndex });
			massIconUpdate = false;
		}
	}

	function moveCursorToEnd(editableElement, maxChars) {
		editableElement.textContent = String(editableElement.textContent.slice(0, maxChars));

		// Create a new Range object
		const range = document.createRange();

		// Select all child nodes of the editable div
		const sel = window.getSelection();

		// Set the range to the end of the content
		const childNodes = editableElement.childNodes;
		if (childNodes.length > 0) {
			// Ensure there are text nodes to place the cursor at
			const lastNode = childNodes[childNodes.length - 1];
			const lastNodeLength =
				lastNode.nodeType === Node.TEXT_NODE ? lastNode.length : lastNode.childNodes.length;
			range.setStart(lastNode, lastNodeLength);
			range.collapse(true);
		} else {
			// If there are no child nodes, set the range to 0
			range.setStart(editableElement, 0);
			range.collapse(true);
		}

		// Remove any existing selections (if any)
		sel.removeAllRanges();

		// Add our newly created range
		sel.addRange(range);
	}

	function handleKeyDown(event) {
		const textarea = document.querySelector('#day-title-input');
		if (event.key === 'Escape' || event.key === 'Esc') {
			// Call the function you want to trigger
			dispatch('close', { selectedDateInfo, day: selectedDate, date });
			// Add any other logic you want here
		}
		if (textarea.textContent.length > 70) {
			moveCursorToEnd(textarea, 70);
		}
	}

	function propertyChange(event) {
		changedProperty = event.detail.changedProperty;
		newPropertyValue = event.detail.newPropertyValue;
		const index = findObjectIndexByValue(selectedDateInfo.properties, 'id', changedProperty);
		objectIndex = index;
		console.log('day modal', selectedDateInfo.properties[index].id);
		massPropertyUpdate = true;
	}

	function iconChange(event) {
		const index = findObjectIndexByValue(selectedDateInfo.properties, 'id', event.detail.id);
		iconIndex = index;
		newIconName = event.detail.iconName;
		massIconUpdate = true;
		console.log(iconIndex, newIconName);
	}

	// FIXME - new options added are not responding individually, they get updated globally

	function addOption(event) {
		console.log(selectedDateInfo);
		if (event.detail === 'text') {
			const newProperty = {
				id: 'newProperty',
				type: 'text',
				value: ''
			};
			dispatch('addProperty', newProperty);
		} else if (event.detail === 'checkbox') {
			const newProperty = {
				id: 'newProperty',
				type: 'check',
				boolean: false,
				icon: {
					enabled: true,
					name: 'favorite',
					position: 'icon3',
					color: ''
				}
			};
			dispatch('addProperty', newProperty);
		}

		params = Object.keys(selectedDateInfo.properties);
		console.log(params);
	}

	function checkboxClick(event) {
		const index = findObjectIndexByValue(selectedDateInfo.properties, 'id', event.detail.id);
		selectedDateInfo.properties[index] = event.detail;
		params = Object.keys(selectedDateInfo.properties);
	}


	const dispatch = createEventDispatcher();
	let params = Object.keys(selectedDateInfo.properties);

	// console.log(JSON.stringify(selectedDateInfo));
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal-backdrop" on:click={closeModal}>
	<div class="modal-content" on:click|stopPropagation>
		<p class="modal-date">{dayjs(selectedDate).format('dddd, MMMM D, YYYY')}</p>
		<div class="row">
			<span
				type="text"
				name=""
				class={selectedDateInfo.title ? 'day-title-input' : 'day-title-input empty'}
				id="day-title-input"
				placeholder="your day's highlight"
				on:input={handleInputChange}
				on:keydown={handleKeyDown}
				contenteditable
			>
				{selectedDateInfo.title}
			</span>
		</div>
		<div>
			{#each params as param}
				<ModalItem
					info={selectedDateInfo.properties[param]}
					on:propertyChange={propertyChange}
					on:iconChange={iconChange}
					on:checkClick={checkboxClick}
					{changedProperty}
					{newPropertyValue}
				/>
			{/each}
			<AddPropertyContext on:optionChosen={addOption} />
		</div>
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
