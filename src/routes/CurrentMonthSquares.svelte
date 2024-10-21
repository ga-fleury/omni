<script>
	import DayModal from './DayModal.svelte';
	import DaySquare from './DaySquare.svelte';
	// Get current date information
	const date = new Date();
	const currentYear = date.getFullYear();
	const currentMonth = date.getMonth();

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


	// Calculate the number of days in the current month
	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInNextMonth = new Date(currentYear, currentMonth + 2, 0).getDate();

  let currentMonthTitles = []

	// Create an array of day numbers
	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  	const daysNextMonth = Array.from({ length: daysInNextMonth }, (_, i) => i + 1);

	for(const day in days) {
		currentMonthTitles.push("Title " + day)
	}

	let selectedDate = null;
	let title;

	function openModal(day) {
		// Set the selected day
		console.log('parent says clicked ' + day)
		selectedDate = new Date(currentYear, currentMonth, day);
		title = currentMonthTitles[day]
		document.body.style.overflow = 'hidden';
	}

	function handleSquareClick(event) {
		console.log('parent says clicked ' + event.detail.day)
		openModal(event.detail.day)
	}

	function closeModal(event) {
		// updates the modal externally, with info from inside the modal
		const day = event.detail.day.getDate()
		const newTitle = event.detail.title
		currentMonthTitles[day] = newTitle
		selectedDate = null;
		document.body.style.overflow = 'auto';
	}

</script>


<div class="year">
	
  <h2 class="month">{monthNames[currentMonth]}</h2>
  <div class="calendar">
    {#each days as day}
		<DaySquare {day} title={currentMonthTitles[day]} on:customEvent={handleSquareClick}/>
    {/each}
	{#if selectedDate}
		<DayModal {selectedDate} {title} on:close={closeModal} />
  	{/if}
  </div>
  <h2 class="month">{monthNames[currentMonth+1]}</h2>
  <div class="calendar">
    {#each daysNextMonth as day}
		<DaySquare {day} title={daysInNextMonth[day]} on:customEvent={handleSquareClick}/>
    {/each}
  </div>
</div>


<style lang="scss">
  .year {
    max-width: 80vw;
    align-self: center;
    margin:auto;
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
