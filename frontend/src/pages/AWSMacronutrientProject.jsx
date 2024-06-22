import { useState, useEffect, useRef } from "react"

export default function MySQLProject(props){
    const foodItems = new Set(["whole milk", "reduced fat milk", "low fat milk", "fat free milk", "goat milk", "almond milk", "oat milk", "soy milk", "buttermilk", "hot chocolate", "plain nonfat greek yogurt", "plain whole milk greek yogurt", "strawberry nonfat greek yogurt", "plain nonfat yogurt", "plain whole milk yogurt", "vanilla ice cream", "chocolate ice cream", "strawberry ice cream", "heavy cream", "sour cream", "american cheese", "cheddar cheese", "cottage cheese", "feta cheese", "monterey jack cheese", "mozzarella cheese", "parmesan cheese", "provolone cheese", "ricotta cheese", "swiss cheese", "brie cheese", "blue cheese", "cream cheese", "egg", "egg white", "egg yolk", "butter", "almond butter", "peanut butter", "sesame butter", "lard", "margarine", "sunflower oil", "olive oil", "coconut oil", "canola oil", "corn oil", "peanut oil", "soybean oil", "beef", "sirloin steak", "t-bone steak", "filet mignon steak", "chuck roast", "beef brisket", "rump roast", "flank steak", "tenderloin roast", "ribeye steak", "eye of round roast", "porterhouse steak", "beef stew meat", "beef short ribs", "ground beef", "chicken breast", "chicken thighs", "chicken drumsticks", "chicken wings", "ground chicken", "bacon", "pork chops", "pork loin", "pork tenderloin", "pork shoulder", "pork belly", "ground pork", "turkey", "turkey breast", "turkey drumsticks/thighs", "ground turkey", "beef breakfast sausage", "italian pork sausage", "chorizo sausage", "turkey sausage", "frankfurter", "ham", "deli turkey/chicken meat", "clams", "cod", "crab", "fish sticks", "flounder", "haddock", "halibut", "herring", "lobster", "mackerel", "oysters", "salmon"])
    const [currFoodItem, setCurrFoodItem] = useState("")
    const [currAmount, setCurrAmount] = useState(0)

    function isValidEntry(foodItem, amount){
        let isValidFoodItem = false
        if(foodItems.has(foodItem))
            isValidFoodItem = true
        
        let isValidAmount = false
        const lessThanThreeDecimalsRegex = /^\d+(\.\d{1,2})?$/;
        if(amount > 0 && lessThanThreeDecimalsRegex.test(amount))
            isValidAmount = true

        return isValidFoodItem && isValidAmount
    }

    // Used for initiating a fetch only if currFoodItem and currAmount did not change in a 2 second timeframe
    const foodItemInfoFetchCounter = useRef(0);
    useEffect(() => {
        foodItemInfoFetchCounter.current += 1
        let currFoodItemInfoFetchCounter = foodItemInfoFetchCounter.current
        setTimeout(() => {
            if(currFoodItemInfoFetchCounter == foodItemInfoFetchCounter.current && isValidEntry(currFoodItem, currAmount))
                fetch("/asw-macronutrient-project/get-food-item-info", {
                    method: "POST",
                    body: JSON.stringify({
                        "foodItem": currFoodItem,
                        "currAmount": currAmount
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                })
                .then(response => response.json())
                .then(final_json => console.log(final_json))
                .catch(error => console.error('Error:', error))
        }, 2000);
    }, [currFoodItem, currAmount])

    function handleFormChange(event) {
        let {name, value, type, checked} = event.target

        if(name == "currFoodItem")
            setCurrFoodItem(value)
        else if(name == "currAmount")
            if(value < 0 || isNaN(value))
                setCurrAmount(0)
            else if(1000 < value)
                setCurrAmount(1000)
            else setCurrAmount(parseFloat(value))
    }

    return (
        <>
            <div className='mt-10 md:mt-16 mx-4 text-center'>
                <h1 className='text-xl md:text-3xl font-semibold font-Montserrat'>AWS macronutrient breakdown project</h1>
            </div>

            <div className='mt-10 mx-4 flex items-center justify-center text-center'>
                <h1 className="text-xl md:text-3xl font-Montserrat">Enter the food item and quantity whose macronutrients you would like to see</h1>
            </div>

            <div className="mx-auto mt-12 w-11/12 sm:w-1/3 flex justify-center flex-col font-Open_Sans">
                <label className="p-1 md:p-2 md:text-3xl text-lg" htmlFor="carModel">Select food item:</label>
                <input 
                    className="ml-2 p-1 md:p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md text-center md:text-3xl text-md text-black" 
                    id="currFoodItem"
                    name="currFoodItem"
                    type="text"
                    list="foodItems"
                    value={currFoodItem}
                    onChange={handleFormChange}
                    maxlength="20"
                />
                <datalist id="foodItems">
                    {[...foodItems].map(foodItem => (
                        <option className="text-center md:text-3xl text-md" key={foodItem} value={foodItem}>{foodItem}</option>
                    ))}
                </datalist>

                <label className="mt-6 p-1 md:p-2 md:text-3xl text-lg" htmlFor="currAmount">Select amount:</label>
                <input 
                    type="number"
                    className="ml-2 mb-10 p-1 md:p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md text-center md:text-3xl text-md text-black"
                    id="currAmount"
                    name="currAmount"
                    value={currAmount}
                    onChange={handleFormChange}
                />
            </div>

            <div className="flex mx-auto w-2/3">
                <div className="flex items-center w-1/2">
                    <h1 className="mx-auto text-red-600 text-2xl">{isValidEntry(currFoodItem, currAmount) ? "" : "invalid currFoodItem or currAmount"}</h1>
                </div>
                <div className="w-1/2">
                <table className="mx-auto border-separate border-spacing-0">
                    <tr>
                        <td className="py-2 px-4 text-center border-black border-t-2 border-l-2 rounded-tl-xl">Calories: 267 kcal</td>
                        <td className="py-2 px-4 text-center border-black border-t-2 border-x-2 rounded-tr-xl"></td>
                    </tr>
                    <tr>
                        <td rowspan="3" className="py-2 px-4 text-center border-black border-t-2 border-l-2">Carbohydrates: 49.2 g</td>
                        <td className="py-2 px-4 text-center border-black border-t-2 border-x-2">Sugars: 5.34 g</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 text-center border-black border-t-2 border-x-2">Fiber: 2.3 g</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 text-center border-black border-t-2 border-x-2">Starch: 37.2 g</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 text-center border-black border-t-2 border-l-2">Protein: 9.43 g</td>
                        <td className="py-2 px-4 text-center border-black border-t-2 border-x-2"></td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 text-center border-black border-y-2 border-l-2 rounded-bl-xl">Fat: 3.59 g</td>
                        <td className="py-2 px-4 text-center border-black border-2 rounded-br-xl">Saturated fat: 0.82 g</td>
                    </tr>
                </table>
                </div>
            </div>
            
        </>
    )
}