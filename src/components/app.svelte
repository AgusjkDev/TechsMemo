<script>
    import Game from "./game.svelte";

    let showStartScreen = true;

    function toggleStartScreen() {
        showStartScreen = !showStartScreen;
    }
</script>

<div class="h-screen flex flex-col items-center justify-center gap-y-8">
    <h1 class="text-6xl md:text-7xl font-serif">TechsMemo</h1>

    {#if showStartScreen}
        <button
            class="py-2.5 w-36 font-medium md:text-sm rounded-md bg-slate-900"
            on:click={toggleStartScreen}
        >
            Play
        </button>
    {:else}
        <Game {toggleStartScreen} />
    {/if}
</div>
