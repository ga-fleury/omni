<script>
	import DayModal from './DayModal.svelte';
	import DaySquare from './DaySquare.svelte';
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';

	let journalMap = {};
	let journalEntries = [];
	let squareSize = String(150 + 'px');

	// Determine the current year and month
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth(); // Note: January is 0!

	// Calculate 10 days back and 40 days forward
	const startDate = new Date(currentDate).setDate(currentDate.getDate() - 10);

	const endDate = new Date(currentDate).setDate(currentDate.getDate() + 40);

	// Determine the number of days in the current month
	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

	let selectedDate = null;
	let selectedDateInfo;

	/**
	 * Triggered inside DaySquare, opens up the corresponding DayModal with the information from that square
	 * @param {any} day
	 * @param {any} date
	 * @returns {any}
	 */
	function openModal(day, date) {
		// Set the selected day
		selectedDate = date;
		selectedDateInfo = journalMap[date];
		document.body.style.overflow = 'hidden';
	}

	/**
	 * Triggered by child square when it's clicked
	 * @param {Object<string, *>} event - contains information passed by the child component
	 */
	function handleSquareClick(event) {
		openModal(event.detail.day, event.detail.date);
	}

	function handleMoreFutureSquares() {
		const lastDate = Object.keys(journalMap)[Object.keys(journalMap).length - 1];
		addSquares(lastDate, 2, true);
	}

	function handleMorePastSquares() {
		const firstDate = Object.keys(journalMap)[0];
		addSquares(firstDate, 2, false);
	}

	function addSquares(referenceDateISO, numberOfDays, isFuture) {
		let referenceDate = dayjs(referenceDateISO);
		referenceDate = isFuture ? referenceDate.add(1, 'day') : referenceDate.subtract(1, 'day');
		const limitDate = isFuture
			? referenceDate.add(numberOfDays, 'day')
			: referenceDate.subtract(numberOfDays, 'day');

		let dates = [];

		while (isFuture ? referenceDate.$d <= limitDate.$d : referenceDate.$d >= limitDate.$d) {
			dates.push(new Date(referenceDate)); // Use new Date to create a copy
			referenceDate = isFuture ? referenceDate.add(1, 'day') : referenceDate.subtract(1, 'day');

			if (dates.length > numberOfDays + 1) {
				break;
			}
		}

		addDaysToSquares(dates);
	}

	/**
	 * Triggered by the modal when it is closed, updates changes made to
	 * @param {Object<string, *>} event - contains information passed by the child component
	 */
	function closeModal(event) {
		const ISODate = event.detail.day;
		const newInfo = event.detail.selectedDateInfo;
		journalMap[ISODate] = newInfo;
		journalEntries = Object.entries(journalMap);
		saveToLocal(JSON.stringify(journalMap));
		selectedDate = null;
		document.body.style.overflow = 'auto';
	}

	onMount(() => {
		const storedData = localStorage.getItem('OMNI_DATA');
		if (storedData) {
			journalMap = JSON.parse(storedData);
			journalEntries = Object.entries(journalMap);
		} else {
			let dates = [];
			let startingDate = new Date(startDate);

			while (startingDate <= endDate) {
				dates.push(new Date(startingDate)); // Use new Date to create a copy
				startingDate.setDate(startingDate.getDate() + 1);
			}
			addDaysToSquares(dates);

			console.log('%cfinished adding', 'color: white; background-color: green');
		}
	});

	/**
	 * Prepopulates a month with empty entries
	 * @param {Array} dates
	 * @returns {any}
	 */
	function addDaysToSquares(dates) {
		dates.forEach((date) => {
			let dateKey = date.toISOString().split('T')[0];

			journalMap[dateKey] = {
				title: '',
				properties: [
					 {
						id: 'wake_up_time',
						type: 'text',
						value: ''
					},
					 {
						id: 'sleep_time',
						type: 'text',
						value: ''
					},
					{
						id: 'meditated',
						type: 'check',
						boolean: false,
						icon: {
							enabled: true,
							name: 'self_improvement',
							position: 'icon5',
							color: 'black'
						}
					},
					{
						id: 'exercised',
						type: 'check',
						boolean: false,
						icon: {
							enabled: true,
							name: 'fitness_center',
							position: 'icon4',
							color: 'black'
						}
					}
				]
			};
		});
		journalEntries = Object.entries(journalMap).sort((a, b) => new Date(a[0]) - new Date(b[0]));
		journalMap = Object.fromEntries(journalEntries);
		console.log('journal map', journalMap);
		saveToLocal(JSON.stringify(journalMap));
	}

	/**
	 * Saves to localStorage
	 * @param {any} item
	 * @returns {any}
	 */
	const saveToLocal = (item) => {
		localStorage.setItem('OMNI_DATA', item);
	};

	function massPropertyUpdate(event) {
		const changedProperty = event.detail.changedProperty
		const newValue = event.detail.newPropertyValue
		const index = event.detail.objectIndex
		for (const day in journalMap){
			journalMap[day].properties[index].id = newValue
		}
		console.log('massprop')
		journalEntries = Object.entries(journalMap).sort((a, b) => new Date(a[0]) - new Date(b[0]));
		journalMap = Object.fromEntries(journalEntries);
		saveToLocal(JSON.stringify(journalMap));
	}

	function massIconUpdate(event) {
		const index = event.detail.iconIndex;
		for (const day in journalMap){
			journalMap[day].properties[index].icon.name = event.detail.newIconName
		}
		console.log('massIcon')
		journalEntries = Object.entries(journalMap).sort((a, b) => new Date(a[0]) - new Date(b[0]));
		journalMap = Object.fromEntries(journalEntries);
		saveToLocal(JSON.stringify(journalMap));
	}
</script>

<div class="year">
	<div class="calendar">
		<button class="day-button more" style="--size: {squareSize};" on:click={handleMorePastSquares}
			>+</button
		>
		{#each journalEntries as [date, details]}
			<DaySquare
				{date}
				title={details.title}
				{squareSize}
				{details}
				on:squareClicked={handleSquareClick}
				monthShow={Number(String(date).slice(-2)) == Number('01') ||
				date == Object.keys(journalMap)[0]
					? true
					: false}
			/>
		{/each}
		<!-- add more days -->
		<button class="day-button more" style="--size: {squareSize};" on:click={handleMoreFutureSquares}
			>+</button
		>
		{#if selectedDate}
			<DayModal 
				{selectedDate} 
				{selectedDateInfo} 
				on:close={closeModal}
				on:propertySchemaChange={massPropertyUpdate}
				on:massIconChange={massIconUpdate}
				/>
		{/if}
	</div>
</div>

<style lang="scss">
	.year {
		max-width: 90vw;
		align-self: center;
		margin: 20px auto;
		width: 100%;
	}
	.month {
		font-size: 2vw;
		margin-top: 0;
		position: sticky;
		top: 0;
		background-color: red;
	}
	.calendar {
		display: grid;
		grid-template-columns: repeat(auto-fill, 150px);
		gap: 30px;
		margin-bottom: 10vh;
	}

	.day-button.more {
		max-width: calc(var(--size) + 4px);
		max-height: calc(var(--size) + 4px);
		background-color: white;
		font-size: 5vw;
		color: #c2c3c7;
		cursor: pointer;
		height: 200px;
		width: 200px;
		border: 2px solid #c2c3c7;
		transition: background-color 0.3s;
		&:hover {
			background-color: rgba(0, 0, 0, 0.05);
		}
	}
</style>
