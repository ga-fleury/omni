<script>
	export let info;
    import { createEventDispatcher } from "svelte";
    import IconPicker from "./IconPicker.svelte";

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
	}

    function handlePropertyChange(event) {
        const changedProperty = event.srcElement.getAttribute('data-property-name')
        const newPropertyValue = event.srcElement.innerText
        console.log(changedProperty)
        dispatch('propertyChange', { info, changedProperty, newPropertyValue });
    }

    function handleIconChange(event) {
        const newIcon = event.detail
        info.icon.name = newIcon;
        console.log(newIcon)
        dispatch('iconChange', {id: info.id, iconName: newIcon}) 
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
                <IconPicker 
                    selectedIcon={info.icon.name}
                    on:handleIconChange={handleIconChange}
                />
            {:else}
			{materialIcon(info.type)}
            {/if}
		</span>
        <span
				type="text"
				name=""
				class=""
                data-property-name={info.id}
				placeholder="property"
				on:input={handlePropertyChange}
				contenteditable
			>{info.id}</span>
	</div>
	<div>
        {#if info.boolean === true || info.boolean === false}
            
        <input type="checkbox" bind:checked={info.boolean} />
        {:else}
        <span contenteditable>{info.value}</span>
        {/if}
    </div>
</div>

<style lang="scss">
    .param{
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
    }
</style>