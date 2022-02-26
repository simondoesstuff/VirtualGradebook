<script>
    export let gradeCalculated;

    export let title;
    export let weight = 1;
    export let gradeOverride;
</script>

<!--    Title    -->
<input value={title}>
<!--    Weight    -->
<input value={weight}>
<!--    Grade   -->
<input value={gradeOverride + "%"}>