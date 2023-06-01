import ApiProject from "./pages/ApiProject"

const projects = [
    {
        key: 0,
        name: "Machine learning project",
        description: "This is a machine learning project using pandas, scikit-learn and PyTorch",
        image: "images/machine-learning.jpg",
        path: "/machine-learning-project",
        page: <ApiProject />
    },
    {
        key: 1,
        name: "API project",
        description: "This is a project that uses an API for functionality",
        image: "images/api.jpg",
        path: "/api-project",
        page: <ApiProject />
    },
    {
        key: 2,
        name: "SQL project",
        description: "This is a frontend project using React and MySQL",
        image: "images/database.jpg",
        path: "/sql-project",
        page: <ApiProject />
    }
]

export default projects