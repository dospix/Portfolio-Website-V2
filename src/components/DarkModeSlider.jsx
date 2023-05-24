import blue_sun from "../assets/images/blue-sun.png"
import gray_sun from "../assets/images/gray-sun.png"
import blue_moon from "../assets/images/blue-moon.png"
import gray_moon from "../assets/images/gray-moon.png"

export default function DarkModeSlider(props){
    return (
        <div className="flex ml-auto 2xl:mt-12 sm:mt-6 mt-6 2xl:mr-40 lg:mr-20 sm:mr-5 mr-3 sm:w-40 w-fit">
            <img src={props.isDarkMode ? gray_sun : blue_sun} className="sm:h-8 h-6 sm:w-8 w-6" alt="sun" />
            <div onClick={props.onDarkMode} className="my-auto mx-2 sm:w-16 w-10 sm:h-5 h-4 bg-gray-400 rounded-3xl hover:cursor-pointer">
                <div className={`sm:h-5 h-4 sm:w-5 w-4 bg-gray-700 rounded-full ${props.isDarkMode ? "ml-auto" : ""}`}></div>
            </div>
            <img src={props.isDarkMode ? blue_moon : gray_moon} className="sm:h-8 h-6 sm:w-8 w-6" alt="moon" />
        </div>
    )
}