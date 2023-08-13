import { useState } from "react"
import carManufacturerToModelMap from "../CarManufacturerToModel.json"
import residuals_plot_black from "../assets/images/residuals-black.png"
import residuals_plot_white from "../assets/images/residuals-white.png"
import outliers_before_plot_black from "../assets/images/outliers-before-black.png"
import outliers_before_plot_white from "../assets/images/outliers-before-white.png"
import outliers_after_plot_black from "../assets/images/outliers-after-black.png"
import outliers_after_plot_white from "../assets/images/outliers-after-white.png"
import correlation_heatmap_black from "../assets/images/correlation-heatmap-black.png"
import correlation_heatmap_white from "../assets/images/correlation-heatmap-white.png"

export default function UsedCarsMachineLearningProject(props) {
    const [formData, setFormData] = useState({
        titleKeywords: "",
        authorKeywords: "",
        manufacturer: Object.keys(carManufacturerToModelMap)[0]
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

        <form onSubmit={handleFormSubmit} className="mx-auto sm:mt-8 mt-10 w-2/3 grid grid-cols-2 gap-4 font-Open_Sans">
            <div className="flex flex-col">
                <label className="p-2 md:text-3xl text-2xl" htmlFor="manufacturer">Car manufacturer:</label>
                <select 
                    className="ml-2 mb-10 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-lg text-black"
                    id="manufacturer"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleFormChange}
                >
                    {Object.keys(carManufacturerToModelMap).map(manufacturer => (
                        <option className="text-center md:text-2xl sm:text-xl text-lg" key={manufacturer} value={manufacturer}>{manufacturer}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col">
                <label className="p-2 md:text-3xl text-2xl" htmlFor="modelText">Car model:</label>
                <input 
                    className="ml-2 mb-6 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-md text-black" 
                    id="modelText" 
                    type="text" 
                    list="model" 
                    onChange={handleFormChange} 
                />
                <datalist id="model">
                    {carManufacturerToModelMap[formData.manufacturer].map(model => (
                        <option className="text-center md:text-2xl sm:text-xl text-lg" key={model} value={model}>{model}</option>
                    ))}
                </datalist>
            </div>

            <div className="flex flex-col">
                <label className="p-2 md:text-3xl text-2xl" htmlFor="type">Vehicle type:</label>
                <select 
                    className="ml-2 mb-10 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-lg text-black"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                >
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="unknown">unknown</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="convertible">convertible</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="coupe">coupe</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="sedan">sedan</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="truck">truck</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="pickup">pickup</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="offroad">offroad</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="SUV">SUV</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="van">van</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="mini-van">mini-van</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="hatchback">hatchback</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="wagon">wagon</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="bus">bus</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="other">other</option>
                </select>
            </div>
            
            <div className="flex flex-col">
                <label className="p-2 md:text-3xl text-2xl" htmlFor="size">Vehicle size:</label>
                <select 
                    className="ml-2 mb-10 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-lg text-black"
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleFormChange}
                >
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="-1">unknown</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="0">sub-compact</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="1">compact</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="2">mid-size</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="3">full-size</option>
                </select>
            </div>
            
            <div className="flex flex-col">
                <label className="p-2 md:text-3xl text-2xl" htmlFor="condition">Car condition:</label>
                <select 
                    className="ml-2 mb-10 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-lg text-black"
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleFormChange}
                >
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="-1">unknown</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="0">salvage</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="1">fair</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="2">good</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="3">excellent</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="4">like new</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="5">new</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label className="p-2 md:text-3xl text-2xl" htmlFor="status">Vehicle status:</label>
                <select 
                    className="ml-2 mb-10 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-lg text-black"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                >
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="clean">clean</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="salvage">salvage</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="rebuilt">rebuilt</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="missing">missing</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="lien">lien</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="parts only">parts only</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label className="p-2 md:text-3xl text-2xl" htmlFor="manufacturingYear">Manufacturing year:</label>
                <input 
                    type="number"
                    className="ml-2 mb-6 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-md text-black"
                    id="manufacturingYear"
                    name="manufacturingYear"
                    value={formData.manufacturingYear}
                    onChange={handleFormChange}
                    min="1950"
                    max="2024"
                />
            </div>

            <div className="flex flex-col">
                <label className="p-2 md:text-3xl text-2xl" htmlFor="odometer">Odometer:</label>
                <input 
                    type="number"
                    className="ml-2 mb-6 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-md text-black"
                    id="odometer"
                    name="odometer"
                    value={formData.odometer}
                    onChange={handleFormChange}
                    min="0"
                    max="1000000"
                />
            </div>

            <div className="flex flex-col">
                <label className="p-2 md:text-3xl text-2xl" htmlFor="drive">Drive:</label>
                <select 
                    className="ml-2 mb-10 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-lg text-black"
                    id="drive"
                    name="drive"
                    value={formData.drive}
                    onChange={handleFormChange}
                >
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="unknown">unknown</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="4wd">4wd</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="fwd">fwd</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="rwd">rwd</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label className="p-2 md:text-3xl text-2xl" htmlFor="transmission">Transmission type:</label>
                <select 
                    className="ml-2 mb-10 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-lg text-black"
                    id="transmission"
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleFormChange}
                >
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="manual">manual</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="automatic">automatic</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="other">other</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label className="p-2 md:text-3xl text-2xl" htmlFor="cylinders">Number of cylinders:</label>
                <select 
                    className="ml-2 mb-10 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-lg text-black"
                    id="cylinders"
                    name="cylinders"
                    value={formData.cylinders}
                    onChange={handleFormChange}
                >
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="-1">unknown</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="3">3 cylinders</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="4">4 cylinders</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="5">5 cylinders</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="6">6 cylinders</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="8">8 cylinders</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="10">10 cylinders</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="12">12 cylinders</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="0">other</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label className="p-2 md:text-3xl text-2xl" htmlFor="fuel">Fuel type:</label>
                <select 
                    className="ml-2 mb-10 p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md md:text-2xl sm:text-xl text-lg text-black"
                    id="fuel"
                    name="fuel"
                    value={formData.fuel}
                    onChange={handleFormChange}
                >
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="gas">gas</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="diesel">diesel</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="hybrid">hybrid</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="electric">electric</option>
                    <option className="text-center md:text-2xl sm:text-xl text-lg" value="other">other</option>
                </select>
            </div>

            <button className="w-52 h-12 sm:mt-8 mt-3 mx-auto col-span-full rounded-xl bg-blue-500 text-xl text-white">Predict car price</button>
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
            <img className="w-7/12 mt-10 mx-32" src={props.isDarkMode ? outliers_before_plot_white : outliers_before_plot_black} alt="outliers before plot" />
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
            <img className="w-7/12 mt-10 mx-32" src={props.isDarkMode ? outliers_after_plot_white : outliers_after_plot_black} alt="outliers after plot" />

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
            <img className="w-7/12 mt-10 mx-32" src={props.isDarkMode ? correlation_heatmap_white : correlation_heatmap_black} alt="correlation heatmap" />

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