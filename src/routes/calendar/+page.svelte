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