import { useState } from "react"
import delete_x from "../assets/images/delete-x.png"
import checkbox_empty from "../assets/images/checkbox-empty.png"
import checkbox_checked from "../assets/images/checkbox-checked.png"
import arrow_left from "../assets/images/arrow-left.png"
import arrow_right from "../assets/images/arrow-right.png"
import arrow_left_white from "../assets/images/arrow-left-white.png"
import arrow_right_white from "../assets/images/arrow-right-white.png"
import plus from "../assets/images/plus.png"

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
    
    const [currDay, setCurrDay] = useState(2)
    const [tasks, setTasks] = useState([{text: "hello", completed: true}, {text: "bye", completed: false}])
    const [formTaskToBeAdded, setFormTaskToBeAdded] = useState("")
    const [habits, setHabits] = useState([{text: "habit1", completed: true}, {text: "habit2", completed: true}, {text: "hardhabit:(", completed: false}])
    const [formHabitToBeAdded, setFormHabitToBeAdded] = useState("")
    const [nextDayExists, setNextDayExists] = useState(false)

    function registerAndChangeUser(event){
        event.preventDefault()
        if(formUsername == "")
            return

        setCurrDay(1)

        fetch("/mysql-project/submit", {
            method: "POST",
            body: JSON.stringify({
                "formUsername": formUsername,
                "reachedRegistrationLimit": howManyTimesRegistered >= registrationLimit
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then(response => response.json())
        .then(data => {
            setCurrUser(data["currUser"])
            if(data["hasRegistered"])
                setHowManyTimesRegistered(prevState => prevState + 1)
        })
        .catch(error => {
            console.error('Error:', error);
        })
    }

    function createNewTask(){
        return
    }

    return (
        <>
            <h1 className='mt-12 mx-4 text-3xl text-center font-semibold font-Montserrat'>Using MySQL to store your tasks/habits.</h1>

            <form onSubmit={registerAndChangeUser} className="mx-auto mt-16 w-1/2 flex justify-center flex-col font-Open_Sans">
                <label className="text-3xl text-center font-Montserrat" htmlFor="titleKeywords">Please provide a username</label>
                <input 
                    type="text"
                    className="mx-32 mt-6 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-md text-black"
                    placeholder=""
                    id="formUsername"
                    name="formUsername"
                    value={formUsername}
                    onChange={event => setFormUsername(event.target.value)}
                    maxLength="32"
                />

                <button className="w-56 h-12 mt-10 self-center rounded-xl bg-blue-500 text-xl text-white">Login/Register</button>
            </form>

            <div className={howManyTimesRegistered == registrationLimit ? "" : "hidden"}>
                <h1 className='mt-16 mx-4 text-3xl text-red-600 text-center font-semibold font-Montserrat'>You have registered {howManyTimesRegistered} times. <br /> You can't register any new accounts.</h1>
            </div>

            <h1 className='mt-20 mx-4 text-3xl text-center font-semibold font-Montserrat'>You are logged in as <span className="text-blue-500">{currUser}</span></h1>
            
            <div>
                <h1 className='mt-12 mx-4 text-3xl text-center font-Montserrat'>Day {currDay}</h1>

                <div className="mt-10 mx-auto w-3/5 flex flex-wrap">
                    <div className="w-1/2">
                        <h1 className='mb-8 text-3xl text-center font-medium font-Montserrat'>Tasks</h1>
                        {tasks.map(task => (
                            <div className="mt-4 h-10 flex">
                                <img className="ml-16 mt-1 h-8" src={delete_x} alt="delete" />
                                <p className="w-full text-2xl text-center">{task.text}</p>
                                <img className="mr-16 mt-0.5 h-3/4" src={task.completed ? checkbox_checked : checkbox_empty} alt="checkbox" />
                            </div>
                        ))}
                        <div className="mt-10 h-10 flex">
                            <input 
                                type="text"
                                className="ml-16 p-2 w-full border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-md text-black"
                                placeholder="Add a new task"
                                id="formTaskToBeAdded"
                                name="formTaskToBeAdded"
                                value={formTaskToBeAdded}
                                onChange={event => setFormTaskToBeAdded(event.target.value)}
                                maxLength="32"
                            />
                            <img className="ml-6 mr-16 mt-0.5 h-3/4" src={plus} alt="add task" />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <h1 className='mb-8 text-3xl text-center font-medium font-Montserrat'>Habits</h1>
                        {habits.map(habit => (
                            <div className="mt-4 h-10 flex">
                                <img className="ml-16 mt-1 h-8" src={delete_x} alt="delete" />
                                <p className="w-full text-2xl text-center">{habit.text}</p>
                                <img className="mr-16 mt-0.5 h-3/4" src={habit.completed ? checkbox_checked : checkbox_empty} alt="checkbox" />
                            </div>
                        ))}
                        <div className="mt-10 h-10 flex">
                            <input 
                                type="text"
                                className="ml-16 p-2 w-full border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-md text-black"
                                placeholder="Add a new habit"
                                id="formHabitToBeAdded"
                                name="formHabitToBeAdded"
                                value={formHabitToBeAdded}
                                onChange={event => setFormHabitToBeAdded(event.target.value)}
                                maxLength="32"
                            />
                            <img className="ml-6 mr-16 mt-0.5 h-3/4" src={plus} alt="add habit" />
                        </div>
                    </div>
                    <div className="mt-12 w-full flex">
                        <img className={`ml-auto w-14 ${currDay == 1 ? "invisible" : ""}`} src={props.isDarkMode ? arrow_left_white : arrow_left} alt="previous day" />
                        <img className="mr-auto ml-60 w-14" src={props.isDarkMode ? arrow_right_white : arrow_right} alt="next day" />
                    </div>
                </div>
                
                <div className="mt-28">
                    <h1 className='mx-4 text-3xl text-center font-Montserrat'>You have completed {totalUserTasksCompleted}/{totalUserTasks} tasks</h1>
                    <h1 className='mt-6 mx-4 text-3xl text-center font-Montserrat'>You engaged in your habits {totalUserHabitsCompleted}/{totalUserHabits} times</h1>
                    <h1 className='mt-6 mx-4 text-3xl text-center font-Montserrat'>Your longest habit streak lasted {longestUserHabitStreak} days</h1>
                </div>
            </div>
            
        </>
    )
}