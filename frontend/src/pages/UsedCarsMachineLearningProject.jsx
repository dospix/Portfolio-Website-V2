import { useState } from "react"
import residuals_plot_black from "../assets/images/residuals-black.png"
import residuals_plot_white from "../assets/images/residuals-white.png"

export default function UsedCarsMachineLearningProject(props) {
    const [formData, setFormData] = useState({
        titleKeywords: "",
        authorKeywords: "",
        previewFilter: "none"
    })

    function handleFormChange(event) {
      const {name, value, type, checked} = event.target
  
      setFormData(prevFormData => ({
          ...prevFormData,
          [name]: type === "checkbox" ? checked : value
        }))
    }

    function handleFormSubmit(event) {
        event.preventDefault()

        setIsLoading(true)
        setBooksDisplayed([])
    
        fetch("/google-api-project/submit", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(data => setBooksDisplayed(data.length ? data.map(book => convertBookObjectToHtml(book)) 
                                        : <h1 className="w-fit mx-auto mb-40 text-3xl font-Montserrat text-red-400 select-none">No books found! Try to remove some keywords/subjects.</h1>))
        .then(() => setIsLoading(false))
        .catch(error => {
        console.error('Error:', error);
        })
    }

    return (
    <>
        <div className='lg:mt-20 md:mt-16 sm:mt-14 mt-12 mx-2 text-center'>
            <h1 className='md:text-3xl text-2xl font-semibold font-Montserrat'>Predicting used cars prices using machine learning & neural networks</h1>
        </div>

        <div className='lg:mt-20 md:mt-16 sm:mt-14 mt-10 mx-2 flex items-center justify-center text-center'>
            <h1 className="md:text-3xl text-2xl font-Montserrat">Enter some information about the car whose price you would like to predict</h1>
        </div>

        <form onSubmit={handleFormSubmit} className="mx-auto sm:mt-8 mt-10 xl:w-1/2 lg:w-2/3 w-5/6 flex justify-center flex-col font-Open_Sans">
            <label className="p-2 md:text-3xl text-2xl" htmlFor="titleKeywords">Title keywords:</label>
            <input 
                type="text"
                className="ml-2 mb-6 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-md text-black"
                placeholder='E.g. Alice Wonderland, can be blank'
                id="titleKeywords"
                name="titleKeywords"
                value={formData.titleKeywords}
                onChange={handleFormChange}
                maxLength="100"
            />

            <label className="p-2 md:text-3xl text-2xl" htmlFor="authorKeywords">Author keywords:</label>
            <input 
                type="text"
                className="ml-2 mb-6 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-md text-black"
                placeholder='E.g. Lewis Carroll, can be blank'
                id="authorKeywords"
                name="authorKeywords"
                value={formData.authorKeywords}
                onChange={handleFormChange}
                maxLength="100"
            />

            <label className="p-2 md:text-3xl text-2xl" htmlFor="previewFilter">Preview filter:</label>
            <select 
                className="ml-2 mb-10 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-lg text-black"
                id="previewFilter"
                name="previewFilter"
                value={formData.previewFilter}
                onChange={handleFormChange}
            >
                <option className="text-center md:text-2xl sm:text-xl text-lg" value="none">no filter</option>
                <option className="text-center md:text-2xl sm:text-xl text-lg" value="partial">part of the book must be previewable</option>
                <option className="text-center md:text-2xl sm:text-xl text-lg" value="full">the entire book must be previewable</option>
            </select>

            <button className="w-52 h-12 sm:mt-8 mt-3 self-center rounded-xl bg-blue-500 text-xl text-white">Predict car price</button>
        </form>

        <div className='mt-20 flex flex-col'>
            <h1 className="self-center text-4xl font-medium font-Montserrat">Model creation process</h1>
        </div>

        <div className='mt-10 flex flex-col'>
            <h1 className="self-center text-3xl font-medium font-Montserrat">Model performance</h1>

            <p className="mt-10 mx-10 text-xl font-Open_Sans">
                The model used to predict car prices is a neural network with an R^2 score of 0.907. 
                It uses a batch size of 128, 183 epochs, the MSELoss loss function, 0.0048 learning rate and the RMSprop optimizer. 
                It has the following layers:
            </p>
            <ul className="mt-2 mx-16 text-xl font-Open_Sans list-disc">
                <li>nn.Linear(2114, 235),</li>
                <li className="mt-1">nn.ReLU(),</li>
                <li className="mt-1">nn.Dropout(0.306),</li>
                <li className="mt-1">nn.Linear(235, 324),</li>
                <li className="mt-1">nn.ReLU(),</li>
                <li className="mt-1">nn.Dropout(0.265),</li>
                <li className="mt-1">nn.Linear(324, 1)</li>
            </ul>

            <p className="mt-10 mx-10 text-xl font-Open_Sans">
                The residuals for this neural network are presented below:
            </p>

            <img className="w-1/2 mt-10 mx-32" src={props.isDarkMode ? residuals_plot_white : residuals_plot_black} alt="residuals plot" />

            <p className="mt-10 mx-10 text-xl font-Open_Sans">
                Out of the 23,092 values tested, 98.5% are within 10,000$ of the correct value, 91.6% are within 5,000$ of the correct value, 
                73.8% are within 2,500$ of the correct value, 39.7% are within 1,000$ of the correct value and 20.8% are within 500$ of the correct value.
            </p>
            <p className="mt-2 mx-10 text-xl font-Open_Sans">
                These are great scores considering the dataset that was used to train the model required heavy cleaning, 
                resulting in some inconsistent entries that could only be removed manually still being present, 
                and that the model can predict the price of over 2000 car models.
            </p>
        </div>

        <div className='mt-16 flex flex-col'>
            <h1 className="self-center text-3xl font-medium font-Montserrat">Preparing the dataset</h1>
        
            <h1 className="mt-10 mx-10 text-2xl font-medium font-Montserrat">Cleaning the data</h1>

            <p className="mt-4 mx-10 text-xl font-Open_Sans">
                All irrelevant columns were removed. Irrelevant columns are either the ones that can’t be tied to the price (such as id columns) 
                or the ones that are found to have no correlation using a correlation heatmap.
            </p>
            <p className="mt-2 mx-10 text-xl font-Open_Sans">
                Once irrelevant columns were removed, so were any duplicate rows, resulting in the number of samples being reduced from 426k down to 247k.
            </p>

            <p className="mt-10 mx-10 text-xl font-Open_Sans">
                Missing values were replaced wherever possible, however there were some instances in which they had to be removed, 
                resulting in a small reduction from 247k down to 241k. 
            </p>
            <p className="mt-2 mx-10 text-xl font-Open_Sans">
                Afterwards string columns were label encoded where it made sense (car condition, number of cylinders, vehicle size).
            </p>

            <h1 className="mt-10 mx-10 text-2xl font-medium font-Montserrat">Removing outliers</h1>

            <p className="mt-4 mx-10 text-xl font-Open_Sans">
                The dataset had a lot of outliers/inconsistent data, thus removing outliers was done in multiple stages.
            </p>
            <p className="mt-2 mx-10 text-xl font-Open_Sans">
                The first stage was only keeping entries within 3 standard deviations for price, entry_year and odometer.
            </p>
            <p className="mt-2 mx-10 text-xl font-Open_Sans">
                In the second stage for each car model, only entries that had a price within 2 standard deviations for that particular car model were kept.
            </p>
            <p className="mt-2 mx-10 text-xl font-Open_Sans">
                Other ways of removing outliers were tested, however this wielded the best results. 
                After all stages the number of samples dropped from 241k down to 200k.
            </p>

            <h1 className="mt-10 mx-10 text-2xl font-medium font-Montserrat">Further cleaning the data</h1>

            <p className="mt-4 mx-10 text-xl font-Open_Sans">
                Removing outliers didn’t eliminate all inconsistent data from the dataset, 
                which is why all cars objectively better than another car but with lower price were removed.
            </p>
            <p className="mt-2 mx-10 text-xl font-Open_Sans">
                A car is defined as objectively better than another if for each of its quantifiable columns it has a better value (lower odometer, better condition etc.) 
                and if all its non-quantifiable columns are the same (same model, same transmission etc.). 
            </p>
            <p className="mt-2 mx-10 text-xl font-Open_Sans">
                There are some edge cases that can bypass this filter, however these cases can only be removed manually. 
                After removing objectively better but cheaper cars, the number of samples dropped to 158k.
            </p>

            <p className="mt-10 mx-10 text-xl font-Open_Sans">
                Since the car model is the most important feature when it comes to predicting a car’s price, all car models with a frequency less than 10 were removed, 
                resulting in a steep drop from 158k down to 115k.
            </p>
 
            <h1 className="mt-10 mx-10 text-2xl font-medium font-Montserrat">Last steps in data preparation</h1>

            <p className="mt-4 mx-10 text-xl font-Open_Sans">
                A correlation heatmap was created, which is used in the beginning to eliminate irrelevant columns. 
                The number of cylinders has the lowest correlation to price within the kept features, 
                however after testing I determined that it was able to make a difference in the price prediction models.
            </p>

            <p className="mt-10 mx-10 text-xl font-Open_Sans">Finally, the remaining string columns are one-hot encoded.</p>
        </div>

        <div className='mt-16 flex flex-col'>
            <h1 className="self-center text-3xl font-medium font-Montserrat">Picking the most optimal model</h1>

            <h1 className="mt-10 mx-10 text-2xl font-medium font-Montserrat">Hyperparameter tuning in phases</h1>

            <p className="mt-4 mx-10 text-xl font-Open_Sans">
                Because it was too time intensive to pick hyperparameters using a complete grid search, picking hyperparameters was done in 3 phases.
            </p>
            <ul className="mt-2 mx-16 text-xl font-Open_Sans list-disc">
                <li>The first phase was testing 1,000 samples with different hyperparameter configurations of linear regression, K neighbors regression, 
                Support vector regression, Random forest regression and Gradient boosting regression. The top 100 configurations advanced to the next phase.</li>
                <li className="mt-2">The second phase took the winning configurations from the previous phase and used 10,000 samples to test them. 
                The top 5 configurations entered the last phase.</li>
                <li className="mt-2">In the last phase the remaining configurations were tested on all 115,000 samples, and the best configuration was picked.</li>
            </ul>
            <p className="mt-2 mx-10 text-xl font-Open_Sans">
                The winner was the Gradient boosting regressor with (learning_rate=0.1, max_depth=None, max_features="sqrt", 
                min_samples_leaf=2, min_samples_split=10, n_estimators=500). The R^2 score of this model is 0.902.
            </p>

            <h1 className="mt-10 mx-10 text-2xl font-medium font-Montserrat">Tuning hyperparameters for a neural network</h1>

            <p className="mt-4 mx-10 text-xl font-Open_Sans">
                The scikit learn model that won the previous stages was compared with a pytorch neural network optimized for this dataset. 
                To tune the hyperparameters of the neural network the library optuna was used. 
            </p>
            <p className="mt-2 mx-10 text-xl font-Open_Sans">
                The winning neural network is the one described in the “Model performance” section, which had a better R^2 score than the scikit learn model, 
                which is why it is used as the final model for predicting used car prices.
            </p>
        </div>
    </>
    )
}