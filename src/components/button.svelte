<script>
    import { cn } from "utils";

    export let className;
    export let onClick;
</script>

<button
    class={cn(
        "py-2.5 w-full font-medium md:text-sm rounded-md bg-slate-900 transition-colors duration-300 hover:bg-slate-800",
        className,
    )}
    on:click={onClick}
>
    <slot />
</button>
