<script>
    import Button from "./button.svelte";
    import Game from "./game.svelte";

    let showStartScreen = true;

    function toggleStartScreen() {
        showStartScreen = !showStartScreen;
    }
</script>

<div class="h-screen flex flex-col items-center justify-center gap-y-8">
    <h1 class="text-6xl md:text-7xl font-serif">TechsMemo</h1>

    {#if showStartScreen}
        <Button onClick={toggleStartScreen}>Play</Button>
    {:else}
        <Game {toggleStartScreen} />
    {/if}
</div>
