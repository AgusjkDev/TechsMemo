<script>
    import { getRandomTechs, formatTimer } from "utils";
    import EndScreen from "./end-screen.svelte";
    import Button from "./button.svelte";

    export let toggleStartScreen;

    let techs = getRandomTechs();

    let timer = 0;
    let started = false;
    let ended = false;
    let interval;
    let flipped = [];
    let matched = [];
    let movements = 0;
    let score = 0;

    const BASE_POINTS = 500;
    const TIMER_FACTOR = 0.5;

    function startTimer() {
        started = true;
        interval = setInterval(() => timer++, 1000);
    }

    /**
     * @param {{id:string, value:string}} tech
     * @param {boolean} backwards
     * */
    function flipTech(tech, backwards = false) {
        if (!backwards) movements++;

        const techContainer = document.querySelector(`[data-tech="${tech.id}"]`);
        const techElement = techContainer.firstElementChild;

        techContainer.style = "transform: rotateY(90deg)";
        setTimeout(() => {
            techElement.alt = backwards ? "Unknown" : tech.value;
            techElement.src = `imgs/${backwards ? "card-back" : `techs/${tech.value}`}.svg`;
            techContainer.style = "";
        }, 500);
    }

    /** @param {{id:string, value:string}} tech */
    function handleTech(tech) {
        if (flipped.length === 2 || flipped.includes(tech)) return;

        if (!started) startTimer();

        flipped = [...flipped, tech];

        flipTech(tech);
    }

    function resetGame() {
        techs.forEach(tech => flipTech(tech, true));
        techs = getRandomTechs();
        timer = 0;
        started = false;
        ended = false;
        clearInterval(interval);
        interval = undefined;
        flipped = [];
        matched = [];
        movements = 0;
        score = 0;
    }

    function computeScore() {
        score += Math.max(
            Math.round(BASE_POINTS - timer * TIMER_FACTOR - movements),
            Math.floor(BASE_POINTS / 10),
        );
    }

    $: {
        if (flipped.length === 2) {
            if (flipped[0].value === flipped[1].value) {
                matched = [...matched, ...flipped];
                flipped = [];
                computeScore();
            } else {
                setTimeout(() => {
                    const techsToFlip = [...flipped];
                    flipped = [];
                    techsToFlip.forEach(tech => flipTech(tech, true));
                }, 1000);
            }
        }
    }

    $: {
        if (matched.length === techs.length) {
            clearInterval(interval);
            started = false;
            ended = true;
        }
    }
</script>

{#if ended}
    <EndScreen {score} {resetGame} {toggleStartScreen} />
{/if}

<div class="w-[92.5%] md:w-auto flex flex-col gap-y-8 items-center">
    <div class="space-y-2">
        <h2 class="font-bold text-2xl text-center">{formatTimer(timer)}</h2>
        <h3 class="font-bold text-lg text-center">Movements: {movements}</h3>
    </div>

    <div class="grid grid-cols-5 gap-5 place-items-center">
        {#each techs as tech}
            <button
                data-tech={tech.id}
                class="aspect-square w-16 border-slate-800 select-none grid place-items-center rounded-md border-2 transition duration-500"
                on:click={() => handleTech(tech)}
                disabled={flipped.includes(tech) || matched.includes(tech)}
            >
                <img alt="Unknown" src="imgs/card-back.svg" class="w-10" />
            </button>
        {/each}
    </div>

    <Button onClick={resetGame}>Reset Game</Button>
</div>
