import { createContext, useContext, useState, type ReactNode } from "react";
import type { Habbit } from "../components/habbitList";
import { isSameDay } from "date-fns";


export type Context ={
    habbits : Habbit[]
    deleteHabit: (id : string)=> void
    toggleHabit: (id: string, date: Date) => void
    addHabbit: (name:string) => void
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


    return <HabbitContext value={{habbits, deleteHabit, toggleHabit, addHabbit}}>{children}</HabbitContext>
}

export function useHabbit(){
    const habbitContext = useContext(HabbitContext)
    if(habbitContext == null) throw new Error("Null context")
    
        return habbitContext
}