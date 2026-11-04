import { eachDayOfInterval, endOfWeek, startOfWeek,format, isFuture, isSameDay, subDays } from "date-fns";
import Button from "./button";
import { useHabbit } from "../context/habbitProvider";


export type Habbit = {
     id:string; name: string, completions: Date[]
}

type HabbitItemProp={
    habit : Habbit
}

export default function HabbitList(){

    const {habbits}=useHabbit()
    
    if(habbits.length ===0){
        return (
            <p className="text-center py-12 text-zinc-500">
                No habbits yet. Add one to get started!
            </p>
        )
    }

    return (
        <div className="flex flex-col gap-3 mx-3 my-2">
            {
                habbits.map((habbit) =>
                    (<HabbitItem  habit={habbit}/>)
                )
            }
        </div>
    );
}

function HabbitItem({habit}:HabbitItemProp){
    
    const {deleteHabit,toggleHabit, visibleDates} = useHabbit()

    const streak= countStreak(habit.completions)

    return (
        <div className="flex flex-col gap-3 rounded-xl bg-zinc-800 p-4">
            <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                    <span className="font-medium">{habit.name}</span>
                    {
                        streak !== 0 &&
                    <span className="text-sm text-amber-400">🔥 {streak}</span>
}
                </div>
                <Button onClick={()=>deleteHabit(habit.id)} variant="Destructive">Delete</Button>
            </div>
            <div className="flex gap-1.5">
                {
                    visibleDates.map(date =>(
                        <Button 
                        variant={
                            habit.completions.some(d=>isSameDay(date,d))
                            ? "Primary"
                            :"Secondary"
                        }
                        onClick={()=> toggleHabit(habit.id,date)}
                        key={date.toISOString()} disabled={isFuture(date)} 
                        className="flex flex-col gap-0.5 flex-1 items-center rounded-lg text-xs">
                            <span className="font-medium">{format(date,"EEE")}</span>
                            <span>{format(date,'d')}</span>
                        </Button>
                    ))
                }
            </div>
        </div>
    )
}


function countStreak(completions: Date[]){
    let streak = 0
    let date = new Date()
    while(completions.some(c=> isSameDay(c,date))){
        streak++
        date = subDays(date,1)
    }
    return streak
}
