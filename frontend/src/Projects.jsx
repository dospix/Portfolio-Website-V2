import UsedCarsMachineLearningProject from "./pages/UsedCarsMachineLearningProject"
import GoogleApiProject from "./pages/GoogleApiProject"
import MySQLProject from "./pages/MySQLProject"

const projects = [
    {
        key: 0,
        name: "Used cars machine learning project",
        description: "This is a machine learning project using pandas, scikit-learn and PyTorch.",
        image: "images/machine-learning.jpg",
        path: "/used-cars-machine-learning-project",
        page: <UsedCarsMachineLearningProject />
    },
    {
        key: 1,
        name: "Tasks/Habits management MySQL project",
        description: "This is a project that uses MySQL to store data about your task/habits.",
        image: "images/database.jpg",
        path: "/mysql-project",
        page: <MySQLProject />
    },
    {
        key: 2,
        name: "Google Books API project",
        description: "This project uses Google Books' API to recommend books on various topics.",
        image: "images/google-books-api.jpg",
        path: "/google-api-project",
        page: <GoogleApiProject />
    }
]

export default projects