import { useState } from "react"

export default function MySQLProject(props){
    const [totalUserTasks, setTotalUserTasks] = useState(0)
    const [totalUserTasksCompleted, setTotalUserTasksCompleted] = useState(0)
    const [totalUserHabits, setTotalUserHabits] = useState(0)
    const [totalUserHabitsCompleted, settotalUserHabitsCompleted] = useState(0)
    const [longestUserHabitStreak, setlongestUserHabitStreak] = useState(0)

    const [formUsername, setFormUsername] = useState("")
    const [currUser, setCurrUser] = useState("")

    function handleFormChange(event){
        const { value } = event.target

        setFormUsername(value)
    }

    function handleFormSubmit(event){
        event.preventDefault()
    }

    return (
        <>
            <div className='mt-12 mx-4 text-center'>
                <h1 className='text-3xl font-semibold font-Montserrat'>Using MySQL to store your tasks/habits.</h1>
            </div>

            <form onSubmit={handleFormSubmit} className="mx-auto mt-16 w-1/2 flex justify-center flex-col font-Open_Sans">
                <label className="text-3xl text-center font-Montserrat" htmlFor="titleKeywords">Please provide a username</label>
                <input 
                    type="text"
                    className="mx-32 mt-6 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-md text-black"
                    placeholder='user123'
                    id="formUsername"
                    name="formUsername"
                    value={formUsername}
                    onChange={handleFormChange}
                    maxLength="64"
                />

            <button className="w-64 h-12 mt-10 self-center rounded-xl bg-blue-500 text-xl text-white">Login/Register</button>
            </form>
        </>
    )
}