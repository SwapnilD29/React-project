import {format, isToday } from "date-fns"
import { useHabbit } from "../context/habbitProvider"
import Button from "./button"


export default function Header(){
 
    const {habbits,visibleDates, onNext,onPrev} = useHabbit()

    const donetoday = habbits.filter(h => h.completions.some(c => isToday(c))).length

    const dateRange = `${format(visibleDates[0],"MMM d")} - ${format(visibleDates[6]!,"MMM d")}`

    return(
        <header className="flex items-center justify-between p-2 mb-2 bg-gray-800 text-white">
            <div className="title flex flex-col p-2  gap-1">
                <h1 className="text-2xl font-bold">Habbit tracker</h1>
                <span className="text-sm text-gray-400">{donetoday} / {habbits.length} done today</span>
            </div>
            <div className="navigation flex flex-col items-center p-2 gap-1">
                <span className="text-sm text-gray-400">{dateRange}</span>
                <div className="flex items-center space-x-2">
                    <Button onClick={onPrev}>Prev</Button>
                    <Button
                    onClick={onNext}
                    disabled = {visibleDates.some(v => isToday(v))}
                    >Next</Button>
                </div>
            </div>
        </header>
    )
}