import { useState, type SubmitEvent } from "react";
import Button from "./button"

type HabbitFormProp ={
    addHabbit: (name:string) => void
}

export default function HabbitForm({addHabbit}: HabbitFormProp){
    const [name, setName] = useState("")

    function handleSubmit(e: SubmitEvent){
        e.preventDefault()
        if(name.trim() === "")
            return
        setName("")
        addHabbit(name)
    }

    return (
        <form className="px-3 py-2 flex gap-2" onSubmit={handleSubmit}>
            <input 
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder='New habit...'
            className="flex-3  bg-zinc-800 rounded-lg px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"/>
            <Button disabled={name.trim()===""}
            className="rounded-lg px-4 py-2 font-medium">Add Habbit</Button>
        </form>
    );
}

