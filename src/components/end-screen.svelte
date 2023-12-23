<script>
    import { onMount } from "svelte";

    export let score;
    export let resetGame;
    export let toggleStartScreen;

    let highscore = Math.round(Number(localStorage.getItem("highscore"))) || 0;
    if (score > highscore) {
        highscore = score;
        localStorage.setItem("highscore", score);
    }

    onMount(() => {
        document.getElementById("endScreen").style = "";
    });
</script>

<div
    id="endScreen"
    style="opacity:0"
    class="fixed z-[1] transition-opacity duration-500 inset-0 backdrop-blur-[8px] gap-y-12 flex flex-col items-center justify-center"
>
    <div class="space-y-1">
        <h3 class="font-black text-center text-5xl">Score: {score}</h3>
        <h4 class="font-bold text-center text-2xl">Highscore: {highscore}</h4>
    </div>

    <div class="space-x-2.5">
        <button
            class="py-2.5 w-36 font-medium md:text-sm rounded-md bg-slate-900"
            on:click={resetGame}
        >
            Play Again
        </button>

        <button
            class="py-2.5 w-36 font-medium md:text-sm rounded-md bg-slate-900"
            on:click={toggleStartScreen}
        >
            Main Menu
        </button>
    </div>
</div>
