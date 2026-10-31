import Header from "./components/header"
import HabbitForm from "./components/habbitForm"
import HabbitList, { type Habbit } from "./components/habbitList"
import { useState } from "react"
import { isSameDay } from "date-fns"

function App() {

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

  return (
    <div className="App flex flex-col bg-gray-900 text-white min-h-screen max-w-2xl mx-auto">
      <Header/>
      <HabbitForm addHabbit={addHabbit}/>
      <HabbitList deleteHabit={deleteHabit} toggleHabit={toggleHabit} habbits={habbits}/>
    </div>
  )
}

export default App
