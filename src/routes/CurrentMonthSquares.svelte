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
		// console.log('open modal', day, date)
		// Set the selected day
		// console.log('openmodal jorunalmap', journalMap[date])
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
		addFutureSquares(lastDate, 2);
	}

	function handleMorePastSquares() {
		const firstDate = Object.keys(journalMap)[0];
		// console.log(firstDate)
		addPastSquares(firstDate, 2)
	}

	function addPastSquares(endDateISO, numberOfDays) {
		let endDate = dayjs(endDateISO).subtract(1, 'day');
		// console.log(endDate.$d);
		const startDate = endDate.subtract(numberOfDays, 'day');
		// console.log(startDate.$d);
		let pastDates = [];
		while (endDate.$d >= startDate.$d) {
			pastDates.push(new Date(endDate)); // Use new Date to create a copy
			endDate = endDate.subtract(1, 'day');

			if (pastDates.length > numberOfDays + 1) {
				// console.log('%cinfinite loop, breaking', 'color: white; background-color: red');
				// console.log(pastDates);
				// console.log(startDate);
				break;
			}
		}
		addDaysToSquares(pastDates)
		// console.log(pastDates);
	}

	function addFutureSquares(startingDateISO, numberOfDays) {
		let startDate = dayjs(startingDateISO).add(1, 'day');
		// console.log(startDate.$d);
		const endDate = startDate.add(numberOfDays, 'day');
		// console.log(endDate.$d);
		let futureDates = [];
		while (startDate.$d <= endDate.$d) {
			futureDates.push(new Date(startDate)); // Use new Date to create a copy
			startDate = startDate.add(1, 'day');

			if (futureDates.length > numberOfDays + 1) {
				// console.log('%cinfinite loop, breaking', 'color: white; background-color: red');
				// console.log(futureDates);
				// console.log(startDate);
				break;
			}
		}
		addDaysToSquares(futureDates)
		// console.log(futureDates);
	}

	/**
	 * Triggered by the modal when it is closed, updates changes made to
	 * @param {Object<string, *>} event - contains information passed by the child component
	 */
	function closeModal(event) {
		const ISODate = event.detail.day;
		const newTitle = event.detail.selectedDateInfo.title;
		// console.log(ISODate)
		// console.log(newTitle)
		// console.log(journalMap)
		journalMap[ISODate].title = newTitle;
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
			// console.log('%cUser data loaded from localStorage', 'color: white; background-color: blue');
		} else {
			let dates = [];
			let startingDate = new Date(startDate);

			while (startingDate <= endDate) {
				dates.push(new Date(startingDate)); // Use new Date to create a copy
				startingDate.setDate(startingDate.getDate() + 1);
				// console.log(startingDate);
			}
			// console.log('No data loaded from localStorage');
			addDaysToSquares(dates);
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

			// Assign an object to each date, here with a placeholder title
			journalMap[dateKey] = {
				// title: `Entry for ${dateKey}`,
				title: '',
				wake_up_time: '',
				sleep_time: '',
				meditated: {
					boolean: false,
					icon: {
						enabled: true,
						name: 'star',
						position: 'icon5',
						color: 'black'
					}
				},
				exercised: {
					boolean: false,
					icon: {
						enabled: false,
						name: '',
						position: '',
						color: ''
					}
				}
			};
		});
		journalEntries = Object.entries(journalMap);
		journalEntries.sort((a, b) => new Date(a[0]) - new Date(b[0]));
		journalMap = Object.fromEntries(journalEntries)
		// console.log('journal entries', journalEntries)
		// console.log('journal map', journalMap)
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
</script>

<div class="year">
	<div class="calendar">
		<button class="day-button more" on:click={handleMorePastSquares}>+</button>
		{#each journalEntries as [date, details]}
			<DaySquare
				{date}
				title={details.title}
				{squareSize}
				{details}
				on:squareClicked={handleSquareClick}
				monthShow={Number(String(date).slice(-2)) == Number('01') ? true : false}
			/>
		{/each}
		<!-- add more days -->
		<button class="day-button more" on:click={handleMoreFutureSquares}>+</button>
		{#if selectedDate}
			<DayModal {selectedDate} {selectedDateInfo} on:close={closeModal} />
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
		font-size: 5vw;
		color: #c2c3c7;
		cursor: pointer;
		height: 150px;
	}
</style>
