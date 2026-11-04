import Header from "./components/header"
import HabbitForm from "./components/habbitForm"
import { HabbitProvider } from "./context/habbitProvider"
import HabbitList from "./components/habbitList"
import { useState } from "react"
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns"

function App() {

  return (
    <div className="App flex flex-col bg-gray-900 text-white min-h-screen max-w-2xl mx-auto">
      <HabbitProvider>
      <Header/>
      <HabbitForm/>
      <HabbitList/>
      </HabbitProvider>
    </div>
  )
}

export default App
