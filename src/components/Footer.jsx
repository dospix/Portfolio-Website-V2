import github_black from "../assets/images/github-logo-black.svg"
import github_white from "../assets/images/github-logo-white.svg"
import linkedin_black from "../assets/images/linkedin-logo-black.svg"
import linkedin_white from "../assets/images/linkedin-logo-white.svg"

export default function Footer(props){
    return (
        <footer className="mt-20 h-28 border-t-2 border-solid flex items-center justify-center space-x-8">
            <h1>© 2023 Dospinescu Daniel</h1>
            <a href="https://github.com/dospix" target="_blank"><img src={props.isDarkMode ? github_white : github_black} width="64px" alt="github link"/></a>
            <a href="https://www.linkedin.com/in/daniel-dospinescu-ba7285239/" target="_blank"><img src={props.isDarkMode ? linkedin_white : linkedin_black} width="40px" alt="linkedin link"/></a>
        </footer>
    )
}