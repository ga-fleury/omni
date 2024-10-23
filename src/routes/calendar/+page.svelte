<script>
	import CurrentMonthSquares from '../CurrentMonthSquares.svelte';
</script>
  
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
</style>
  
<div class="calendar-full">
  <div><h2 class="month">Filters</h2></div>
    <div class="view">
      <CurrentMonthSquares />
    </div>
</div>