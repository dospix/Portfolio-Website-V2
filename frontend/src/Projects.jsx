import AirbnbMachineLearningProject from "./pages/AirbnbMachineLearningProject"
import GoogleApiProject from "./pages/GoogleApiProject"

const projects = [
    {
        key: 0,
        name: "Airbnb machine learning project",
        description: "This is a machine learning project using pandas, scikit-learn and PyTorch",
        image: "images/machine-learning.jpg",
        path: "/airbnb-machine-learning-project",
        page: <AirbnbMachineLearningProject />
    },
    {
        key: 1,
        name: "Google Books API project",
        description: "This project uses Google Books' API to recommend books on various topics.",
        image: "images/google-books-api.jpg",
        path: "/google-api-project",
        page: <GoogleApiProject />
    },
    {
        key: 2,
        name: "SQL project",
        description: "This is a frontend project using React and MySQL",
        image: "images/database.jpg",
        path: "/sql-project",
        page: <GoogleApiProject />
    }
]

export default projects