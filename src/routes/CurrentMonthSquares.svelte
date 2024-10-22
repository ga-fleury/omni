<script>
	import DayModal from './DayModal.svelte';
	import DaySquare from './DaySquare.svelte';
	import { onMount, onDestroy } from 'svelte';

	let journalMap = {};
	let journalEntries = [];
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
	let selectedDateTitle;

	function openModal(day, date) {
		// Set the selected day
		console.log('parent says clicked ' + date);
		selectedDate = new Date(currentYear, currentMonth, day);
		selectedDateTitle = journalMap[date];
		document.body.style.overflow = 'hidden';
	}

	function handleSquareClick(event) {
		console.log('parent says clicked ' + event.detail.date);
		openModal(event.detail.day, event.detail.date);
	}

	function closeModal(event) {
		console.log(event);
		const ISODate = event.detail.day.toISOString().split('T')[0];
		// updates the modal externally, with info from inside the modal
		const newTitle = event.detail.selectedDateTitle.title;
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
			console.log('User data loaded from localStorage:', journalMap);
		} else {
			// Initialize an empty object
			

			// Populate the object with each day of the month as an ISO string
			for (let day = 1; day <= daysInMonth; day++) {
				// Construct the date in ISO format (YYYY-MM-DD)
				const dateKey = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];

				// Assign an object to each date, here with a placeholder title
				journalMap[dateKey] = {
					title: `Entry for ${dateKey}`
				};
			}

			journalEntries = Object.entries(journalMap);
			console.log(journalEntries);
		}
	});

	function saveToLocal(item) {
		localStorage.setItem('OMNI_DATA', item);
	}
</script>

<div class="year">
	<h2 class="month">{monthNames[currentMonth]}</h2>
	<div class="calendar">
		{#each journalEntries as [date, details]}
			<DaySquare {date} title={details.title} on:customEvent={handleSquareClick} />
		{/each}
		{#if selectedDate}
			<DayModal {selectedDate} {selectedDateTitle} on:close={closeModal} />
		{/if}
	</div>
</div>

<style lang="scss">
	.year {
		max-width: 80vw;
		align-self: center;
		margin: auto;
	}
	.month {
		font-size: 2vw;
		margin-top: 0;
	}
	.calendar {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 30px;
		margin-bottom: 10vh;
	}
</style>
