<script>
	import CurrentMonthSquares from '../CurrentMonthSquares.svelte';
</script>
  
<style lang="scss">
    .calendar {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 40px;
    }
  
    .day-button {
      width: 150px;
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid black;
      background-color: #fff;
      cursor: pointer;
      transition: background-color 0.3s;
      position: relative;
      &__date {
        color: rgba(0,0,0,0.5);
        font-weight: 700;
        position: absolute;
        right: 5px;
        bottom: 0;
      }
    }
  
    .day-button:hover {
      background-color: #e0e0e0;
    }
</style>
  
<div>
    <CurrentMonthSquares />
</div>