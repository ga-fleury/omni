<script>
	export let info;
	import { createEventDispatcher } from 'svelte';
	import IconPicker from './IconPicker.svelte';

	// TODO - add propertyname check to see if there is another property with the same name
	// or check property index inside array, and change logic for looking for property from id name to

	const dispatch = createEventDispatcher();

	function materialIcon(type) {
		if (type === 'text') {
			return 'list';
		}
		if (type === 'check') {
			return 'check_box';
		}
        if (type === 'number') {
            return 'tag'
        }
	}

	function handlePropertyChange(event) {
		const changedProperty = event.srcElement.getAttribute('data-property-name');
		const newPropertyValue = event.srcElement.innerText;
		dispatch('propertyChange', { info, changedProperty, newPropertyValue });
	}

	function handleIconChange(event) {
		const newIcon = event.detail;
		info.icon.name = newIcon;
		dispatch('iconChange', { id: info.id, iconName: newIcon });
	}

	function parameterClick(event) {
        console.log('parameter click event', event)
		// if clicked on checkbox itself, take checkbox value
		if (event.target.nodeName === 'INPUT' && event.target.type != 'number') {
			info.boolean = event.target.checked;
            dispatch('checkClick', info)
		}
		// if clicked on parent of checkbox, flip the value of the checkbox to the inverse of what it is
		else if (event.srcElement.childNodes[0].attributes[0].nodeValue == 'checkbox') {
			info.boolean = !event.srcElement.childNodes[0].checked;
            dispatch('checkClick', info)
		}

	}

	function nameWrapClick(event) {
		console.log(event);
		event.srcElement.childNodes[0].focus();
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="param-wrap">
	<div class="param-left">
		<span class="material-symbols-outlined">
			{#if info.boolean === true || info.boolean === false}
				<IconPicker selectedIcon={info.icon.name} on:handleIconChange={handleIconChange} />
			{:else}
				{materialIcon(info.type)}
			{/if}
		</span>
		<div class="param-name-wrap" on:click={nameWrapClick}>
			<span
				type="text"
				name=""
				class="param-name-wrap__span"
				data-property-name={info.id}
				placeholder="property"
				on:input={handlePropertyChange}
				contenteditable>{info.id}</span
			>
		</div>
	</div>
	<div class="param-right" on:click={parameterClick}>
		{#if info.boolean === true || info.boolean === false}
			<input type="checkbox" bind:checked={info.boolean} />
        {:else if info.type === 'number'}
            <input type="number" placeholder="0" />
            <span>{info.unit.abbreviation}</span>
		{:else}
			<span contenteditable>{info.value}</span>
		{/if}
	</div>
</div>

<style lang="scss">
	.param-name-wrap {
		width: 100%;
		height: 100%;
		padding: 5px 2px;
		&:hover {
			background-color: #c2c3c7;
			cursor: pointer;
		}
		&__span:focus {
			border: none;
			outline: none;
		}
	}
	.param {
		&-wrap {
			display: flex;
			margin: 5px 0px;
			align-items: center;
		}
		&-left {
			display: flex;
			align-items: center;
			min-width: 150px;
			gap: 6px;
		}
		&-right {
			width: 100%;
			&:hover {
				background-color: #c2c3c7;
				cursor: pointer;
			}
		}
	}
</style>
