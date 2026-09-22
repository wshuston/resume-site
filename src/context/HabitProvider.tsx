import {useState} from "react";
import {Header} from "../components/Header";
import {HabitForm} from "../components/HabitForm";
import {HabitList} from "../components/HabitList";
import {isSameDay} from "date-fns";
import {HabitContext, type Habit} from "./useHabits";

type HabitProviderProps = {
    children: ReactNode,
}

export function HabitProvider({ children }: HabitProviderProps) {
    const [habits, setHabits] = useState<Habit[]>([])

    function addHabit(name: string) {
        setHabits(curr => [...curr, {id: crypto.randomUUID(), name, completions: []},])
    }

    function deleteHabit(id: string) {
        setHabits(curr => curr.filter(h => h.id !== id))
    }

    function toggleHabit(id: string, date: Date) {
        setHabits(curr => (
            curr.map(h => {
                if (h.id !== id) return h

                const alreadyDone = h.completions.some(c => isSameDay(c, date))
                const completions = alreadyDone
                    ? h.completions.filter(c => !isSameDay(c, date))
                    : [...h.completions, date]
                return {...h, completions}
            })
        ))
    }

    return (
        <HabitContext value={{habits, addHabit, toggleHabit, deleteHabit}}>
            {children}
        </HabitContext>
    )
}