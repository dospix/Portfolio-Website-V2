import sun from "../assets/images/sun.png"
import moon from "../assets/images/moon.png"

export default function DarkModeSlider(props){
    return (
        <div className="flex ml-auto mt-6 mr-8 w-32">
            <img src={sun} height="20px" width="20px" alt="sun" />
            <div onClick={props.onDarkMode} className="my-auto mx-2 w-12 h-4 bg-gray-400 rounded-lg hover:cursor-pointer">
                <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
            </div>
            <img src={moon} height="20px" width="20px" alt="moon" />
        </div>
    )
}