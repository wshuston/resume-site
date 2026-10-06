import {Header} from "./components/Header";
import {HabitForm} from "./components/HabitForm";
import {HabitList, type Habit} from "./components/HabitList";
import {useState} from "react";
import {addWeeks, eachDayOfInterval, endOfWeek, isSameDay, startOfWeek} from "date-fns";
import {HabitProvider} from "./context/HabitProvider";

export default function App() {
    const [weekOffset, setWeekOffset] = useState(0);
    
    const week = addWeeks(new Date(), weekOffset)
    const visibleDates = eachDayOfInterval({
            start: startOfWeek(week, {weekStartsOn: 1}),
            end: endOfWeek(week, {weekStartsOn: 1}),
        })

    return (
        <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
            <HabitProvider>
                <Header
                    visibleDates={visibleDates}
                    onPrev={() => setWeekOffset((o) => o - 1)}
                    onNext={() => setWeekOffset((o) => o + 1)}
                />
                <HabitForm />
                <HabitList visibleDates={visibleDates} />
            </HabitProvider>
        </div>
    )
}
