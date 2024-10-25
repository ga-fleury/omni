<script>
	import CurrentMonthSquares from '../CurrentMonthSquares.svelte';
</script>

<svelte:head>
  <title>Calendar</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</svelte:head>
  
<style lang="scss">
    .calendar-full {
      max-width: 90vw;
      width: 100%;
      align-self: center;
      margin: 20px auto;
      display: grid;
      grid-template-columns: 2fr 10fr;
    }

    .month {
      font-size: 2vw;
      margin-top: 0;
    }

    .filter {
      &-wrap {
        position: sticky;
        top: 50px;
      }
    }
</style>
  
<div class="calendar-full">
  <div class="month">
    <div class="filter-wrap">
      <span>Filters</span>
    </div>
  </div>
    <div class="view">
      <CurrentMonthSquares />
    </div>
</div>