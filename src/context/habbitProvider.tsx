import { createContext, useContext, useState, type ReactNode } from "react";
import type { Habbit } from "../components/habbitList";
import { addWeeks, eachDayOfInterval, endOfWeek, isSameDay, startOfWeek } from "date-fns";


export type Context ={
    habbits : Habbit[]
    deleteHabit: (id : string)=> void
    toggleHabit: (id: string, date: Date) => void
    addHabbit: (name:string) => void
    visibleDates: Date[]
    onNext: ()=>void
    onPrev: ()=>void
}

type HabbitProviderProps ={
    children: ReactNode
}

export const HabbitContext = createContext<null | Context>(null)


export function HabbitProvider({children}:HabbitProviderProps){

  const [habbits,setHabbits] = useState<Habbit[]>([])

  function addHabbit(name : string){
      setHabbits((habbits) => [...habbits, {id: crypto.randomUUID(), name:name, completions:[]}])
  }

  function deleteHabit(id: string){
    setHabbits(habbits => habbits.filter(habbit => habbit.id !== id))
  }

  function toggleHabit(id: string, date: Date){
    setHabbits(habbits=>
        habbits.map(habit=>{
          if(habit.id !== id) return habit
          
          const alreadyDone = habit.completions.some(c=> isSameDay(c,date))
          const completions = alreadyDone 
                            ? habit.completions.filter(c => !isSameDay(c, date))
                            :[...habit.completions, date]
          return { ...habit, completions }
        })
    )
  }

  const [weekOffset, setWeekOffset] = useState(0)
  
    const week= addWeeks(new Date(), weekOffset)
  
    const visibleDates= eachDayOfInterval(
          {
              start: startOfWeek(week, {weekStartsOn:1}),
              end: endOfWeek(week, {weekStartsOn:1})
          }
      )
    
    function onNext(){
      setWeekOffset(o => o + 1)
    }

    function onPrev(){
      setWeekOffset(o => o - 1)
    }
    return <HabbitContext value={{habbits,visibleDates, deleteHabit, toggleHabit, addHabbit,onNext,onPrev}}>{children}</HabbitContext>
}

export function useHabbit(){
    const habbitContext = useContext(HabbitContext)
    if(habbitContext == null) throw new Error("Null context")
    
        return habbitContext
}