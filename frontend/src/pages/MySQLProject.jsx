import { useState } from "react"

export default function MySQLProject(props){
    const [totalUserTasks, setTotalUserTasks] = useState(0)
    const [totalUserTasksCompleted, setTotalUserTasksCompleted] = useState(0)
    const [totalUserHabits, setTotalUserHabits] = useState(0)
    const [totalUserHabitsCompleted, settotalUserHabitsCompleted] = useState(0)
    const [longestUserHabitStreak, setlongestUserHabitStreak] = useState(0)

    const [formUsername, setFormUsername] = useState("")
    const [currUser, setCurrUser] = useState("")
    const [howManyTimesRegistered, setHowManyTimesRegistered] = useState(0)
    const registrationLimit = 1
    
    const [currDay, setCurrDay] = useState(1)
    const [tasks, setTasks] = useState([])
    const [habits, setHabits] = useState([])
    const [nextDayExists, setNextDayExists] = useState(false)


    function handleFormChange(event){
        const { value } = event.target

        setFormUsername(value)
    }

    function handleFormSubmit(event){
        event.preventDefault()

        if(howManyTimesRegistered == registrationLimit)
            return

        fetch("/mysql-project/submit", {
            method: "POST",
            body: JSON.stringify(formUsername),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(data => setCurrUser(data["newUser"]))
        .catch(error => {
            console.error('Error:', error);
        })
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

            <button className="w-56 h-12 mt-10 self-center rounded-xl bg-blue-500 text-xl text-white">Login/Register</button>
            </form>

            <div className={howManyTimesRegistered == registrationLimit ? "mt-16 mx-4 text-red-600 text-center" : "hidden"}>
                <h1 className='text-3xl font-semibold font-Montserrat'>You have registered {howManyTimesRegistered} times. <br /> You can't register any new accounts.</h1>
            </div>

            <div className='mt-20 mx-4 text-center'>
                <h1 className='text-3xl font-semibold font-Montserrat'>You are logged in as <span className="text-blue-500">{currUser}</span></h1>
            </div>
        </>
    )
}