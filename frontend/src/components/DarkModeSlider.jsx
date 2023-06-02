import blue_sun from "../assets/images/blue-sun.png"
import gray_sun from "../assets/images/gray-sun.png"
import blue_moon from "../assets/images/blue-moon.png"
import gray_moon from "../assets/images/gray-moon.png"
import back_arrow_black from "../assets/images/back-arrow-black.svg"
import back_arrow_white from "../assets/images/back-arrow-white.svg"
import back_arrow_blue from "../assets/images/back-arrow-blue.svg"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function DarkModeSlider(props){
    const [backArrowImage, setBackArrowImage] = useState(
        {
            isHoveredOn: false,
            currentImage: props.isDarkMode ? back_arrow_black : back_arrow_white
        }
    )

    function HandleBackArrowImage(isHoveredOn){
        if (isHoveredOn) setBackArrowImage({
            isHoveredOn: true,
            currentImage: back_arrow_blue
            })
        else setBackArrowImage({
            isHoveredOn: false,
            currentImage: props.isDarkMode ? back_arrow_black : back_arrow_white
        })
    }

    return (
        <div className="flex items-center 2xl:mt-12 sm:mt-6 mt-6">
            <div className="2xl:ml-40 lg:ml-20 sm:ml-5 ml-3">
                <Link to=".."><img src={backArrowImage.currentImage} onMouseOver={() => HandleBackArrowImage(true)} onMouseLeave={() => HandleBackArrowImage(false)} className="sm:h-12 h-14 sm:w-12 w-14" /></Link>
            </div>
            <div className="flex ml-auto 2xl:mr-40 lg:mr-20 sm:mr-5 mr-3 sm:w-40 w-fit">
                <img src={props.isDarkMode ? gray_sun : blue_sun} className="sm:h-8 h-6 sm:w-8 w-6" alt="sun" />
                <div onClick={() => {props.onDarkMode(); HandleBackArrowImage(false)}} className="my-auto mx-2 sm:w-16 w-10 sm:h-5 h-4 bg-gray-400 rounded-3xl hover:cursor-pointer">
                    <div className={`sm:h-5 h-4 sm:w-5 w-4 bg-gray-700 rounded-full ${props.isDarkMode ? "ml-auto" : ""}`}></div>
                </div>
                <img src={props.isDarkMode ? blue_moon : gray_moon} className="sm:h-8 h-6 sm:w-8 w-6" alt="moon" />
            </div>
        </div>
    )
}