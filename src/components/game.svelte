<script>
    import { getRandomTechs, formatTimer } from "utils";

    const techs = getRandomTechs();

    let timer = 0;
    let started = false;
    let flipped = [];
    let matched = [];

    function startTimer() {
        started = true;
        setInterval(() => timer++, 1000);
    }

    /**
     * @param {{id:string, value:string}} tech
     * @param {boolean} backwards
     * */
    function flipTech(tech, backwards = false) {
        const techContainer = document.getElementById(tech.id);
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

    $: {
        if (flipped.length == 2) {
            if (flipped[0].value === flipped[1].value) {
                matched = [...flipped];
                flipped = [];
            } else {
                setTimeout(() => {
                    const techsToFlip = [...flipped];
                    flipped = [];
                    techsToFlip.forEach(tech => flipTech(tech, true));
                }, 1000);
            }
        }
    }
</script>

<div class="w-[92.5%] md:w-auto space-y-12">
    <h2 class="font-bold text-2xl text-center">{formatTimer(timer)}</h2>

    <div class="grid grid-cols-5 gap-5">
        {#each techs as tech}
            <button
                id={tech.id}
                class="aspect-square w-16 border-slate-800 select-none grid place-items-center rounded-md border-2 transition duration-500"
                on:click={() => handleTech(tech)}
                disabled={flipped.includes(tech) || matched.includes(tech)}
            >
                <img alt="Unknown" src="imgs/card-back.svg" class="w-10" />
            </button>
        {/each}
    </div>
</div>
