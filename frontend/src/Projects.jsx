import UsedCarsMachineLearningProject from "./pages/UsedCarsMachineLearningProject"
import GoogleApiProject from "./pages/GoogleApiProject"
import MySQLProject from "./pages/MySQLProject"
import AWSMacronutrientProject from "./pages/AWSMacronutrientProject"

const projects = [
    {
        key: 0,
        name: "AWS macronutrient calculator project",
        description: "Using AWS to calculate the macronutrients in your meals.",
        image: "images/macronutrients.jpg",
        path: "/asw-macronutrient-project",
        page: <AWSMacronutrientProject />
    },
    {
        key: 1,
        name: "Used cars machine learning project",
        description: "Predicting used car prices using pandas, matplotlib, scikit-learn and PyTorch.",
        image: "images/used-car.jpg",
        path: "/used-cars-machine-learning-project",
        page: <UsedCarsMachineLearningProject />
    },
    {
        key: 2,
        name: "Task/Habit management MySQL project",
        description: "This project uses MySQL to store your tasks and habits.",
        image: "images/planning.jpg",
        path: "/mysql-project",
        page: <MySQLProject />
    },
    {
        key: 3,
        name: "Google Books API project",
        description: "This project uses the Google Books API to recommend books on various topics.",
        image: "images/google-books-api.jpg",
        path: "/google-api-project",
        page: <GoogleApiProject />
    }
]

export default projects