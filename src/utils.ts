import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import techs from "data/techs";

// Fisher–Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
    const arr = array.filter((element): element is T => element !== undefined);

    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i]!, arr[j]!] = [arr[j]!, arr[i]!];
    }

    return arr;
}

export function getRandomTechs(): { id: string; value: string }[] {
    const shuffledTechs = shuffleArray(techs).slice(0, 10);

    return shuffleArray([...shuffledTechs, ...shuffledTechs]).map(tech => ({
        id: Math.random().toString(36).slice(2),
        value: tech,
    }));
}

export function formatTimer(timer: number) {
    const seconds = timer % 60;
    const minutes = (timer - seconds) / 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
