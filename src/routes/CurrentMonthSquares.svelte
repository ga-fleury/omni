<script>
	import DayModal from './DayModal.svelte';
	import DaySquare from './DaySquare.svelte';
	import { onMount } from 'svelte';

	let journalMap = {};
	let journalEntries = [];
	let squareSize = String(150 + 'px');
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

	// Determine the current year and month
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth(); // Note: January is 0!

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
		selectedDate = new Date(currentYear, currentMonth, day);
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

	/**
	 * Triggered by the modal when it is closed, updates changes made to
	 * @param {Object<string, *>} event - contains information passed by the child component
	 */
	function closeModal(event) {
		const ISODate = event.detail.day.toISOString().split('T')[0];
		const newTitle = event.detail.selectedDateInfo.title;
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
			console.log('%cUser data loaded from localStorage', 'color: white; background-color: blue');
		} else {
			console.log('No data loaded from localStorage');
			emptyMonthEntries();
		}
	});

	/**
	 * Prepopulates a month with empty entries
	 * @returns {any}
	 */
	 function emptyMonthEntries() {
		for (let day = 1; day <= daysInMonth; day++) {
			// Construct the date in ISO format (YYYY-MM-DD)
			const dateKey = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];

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
		}
		journalEntries = Object.entries(journalMap);
		saveToLocal(JSON.stringify(journalMap));
	};

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
		{#each journalEntries as [date, details]}
			<DaySquare {date} title={details.title} {squareSize} {details} on:squareClicked={handleSquareClick} />
		{/each}
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
	}
	.calendar {
		display: grid;
		grid-template-columns: repeat(auto-fill, 150px);
		gap: 30px;
		margin-bottom: 10vh;
	}
</style>
