import blue_sun from "../assets/images/blue-sun.png"
import gray_sun from "../assets/images/gray-sun.png"
import blue_moon from "../assets/images/blue-moon.png"
import gray_moon from "../assets/images/gray-moon.png"

export default function DarkModeSlider(props){
    return (
        <div className="flex ml-auto 2xl:mt-12 lg:mt-6 2xl:mr-28 lg:mr-20 w-40">
            <img src={props.isDarkMode ? gray_sun : blue_sun} height="30px" width="30px" alt="sun" />
            <div onClick={props.onDarkMode} className="my-auto mx-2 w-16 h-5 bg-gray-400 rounded-3xl hover:cursor-pointer">
                <div className={`w-5 h-5 bg-gray-700 rounded-full ${props.isDarkMode ? "ml-auto" : ""}`}></div>
            </div>
            <img src={props.isDarkMode ? blue_moon : gray_moon} height="30px" width="30px" alt="moon" />
        </div>
    )
}