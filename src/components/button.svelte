<script>
    export let onClick;
</script>

<button
    class="py-2.5 w-36 font-medium md:text-sm rounded-md bg-slate-900 transition-colors duration-300 hover:bg-slate-800"
    on:click={onClick}
>
    <slot />
</button>
