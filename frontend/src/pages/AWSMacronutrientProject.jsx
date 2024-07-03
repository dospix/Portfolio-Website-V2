import { useState, useEffect, useRef } from "react"
import plus from "../assets/images/plus.png"

export default function MySQLProject(){
    const foodItems = new Set(["whole milk|ml", "reduced fat milk|ml", "low fat milk|ml", "fat free milk|ml", "goat milk|ml", "almond milk|ml", "oat milk|ml", 
        "soy milk|ml", "buttermilk|ml", "hot chocolate|ml", "plain nonfat greek yogurt|g", "plain whole milk greek yogurt|g", "strawberry nonfat greek yogurt|g", 
        "plain nonfat yogurt|g", "plain whole milk yogurt|g", "vanilla ice cream|g", "chocolate ice cream|g", "strawberry ice cream|g", "heavy cream|g", 
        "sour cream|g", "american cheese|g", "cheddar cheese|g", "cottage cheese|g", "feta cheese|g", "monterey jack cheese|g", "mozzarella cheese|g", 
        "parmesan cheese|g", "provolone cheese|g", "ricotta cheese|g", "swiss cheese|g", "brie cheese|g", "blue cheese|g", "cream cheese|g", "egg|g", "egg white|g", 
        "egg yolk|g", "butter|g", "almond butter|g", "peanut butter|g", "sesame butter|g", "lard|g", "margarine|g", "sunflower oil|ml", "olive oil|ml", 
        "coconut oil|ml", "canola oil|ml", "corn oil|ml", "peanut oil|ml", "soybean oil|ml", "beef|g", "sirloin steak|g", "t-bone steak|g", "filet mignon steak|g", 
        "chuck roast|g", "beef brisket|g", "rump roast|g", "flank steak|g", "tenderloin roast|g", "ribeye steak|g", "eye of round roast|g", "porterhouse steak|g", 
        "beef stew meat|g", "beef short ribs|g", "ground beef|g", "chicken breast|g", "chicken thighs|g", "chicken drumsticks|g", "chicken wings|g", 
        "ground chicken|g", "bacon|g", "pork chops|g", "pork loin|g", "pork tenderloin|g", "pork shoulder|g", "pork belly|g", "ground pork|g", "turkey|g", 
        "turkey breast|g", "turkey drumsticks/thighs|g", "ground turkey|g", "beef breakfast sausage|g", "italian pork sausage|g", "chorizo sausage|g", 
        "turkey sausage|g", "frankfurter|g", "ham|g", "deli turkey/chicken meat|g", "clams|g", "cod|g", "crab|g", "fish sticks|g", "flounder|g", "haddock|g", 
        "halibut|g", "herring|g", "lobster|g", "mackerel|g", "oysters|g", "salmon|g"])
    const [currFoodItem, setCurrFoodItem] = useState("")
    const [currAmount, setCurrAmount] = useState(0)
    const [currFoodData, setCurrFoodData] = useState(null)
    // This is a representation of all food items tracked for the final macronutrient calculation, each array inside represents a row in the table.
    // Each row will have 5 items, representing the food item served for: breakfast, first snack, lunch, second snack, dinner.
    // For meals that don't have a food item in a row, the value corresponding to the meal will be null, otherwise it will be an object. Example object: 
    // {
    //     "calories": 44.1,
    //     "carbohydrates": 0.23,
    //     "fat": 2.98,
    //     "fetch_queue_length": 1,
    //     "fiber": 0,
    //     "food_name": "egg",
    //     "measure": "30 g",
    //     "protein": 3.77,
    //     "saturated_fat": 0.93,
    //     "starch": 0,
    //     "sugars": 0.23
    // }
    const [ingredientTableRows, setIngredientTableRows] = useState([["add_button", "add_button", "add_button", "add_button", "add_button"]])

    function isValidEntry(foodItem, amount){
        let isValidFoodItem = false
        if(foodItems.has(foodItem + "|g") || foodItems.has(foodItem + "|ml"))
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
        setCurrFoodData(null)
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
                .then(responseJson => {console.log(responseJson), setCurrFoodData(responseJson)})
                .catch(error => console.error('Error:', error))
        }, 1000);
    }, [currFoodItem, currAmount])

    function handleFormChange(event) {
        let {name, value} = event.target

        if(name == "currFoodItem")
            setCurrFoodItem(value)
        else if(name == "currAmount")
            if(value < 0 || isNaN(value))
                setCurrAmount(0)
            else if(1000 < value)
                setCurrAmount(1000)
            else setCurrAmount(parseFloat(value))
    }

    function addCurrFoodDataToFinalTable(ingredientMeal) {
        let columnIndex = null
        switch (ingredientMeal) {
            case "breakfast":
                columnIndex = 0
                break
            case "first snack":
                columnIndex = 1
                break
            case "lunch":
                columnIndex = 2
                break
            case "second snack":
                columnIndex = 3
                break
            case "dinner":
                columnIndex = 4
                break
            default:
                throw new Error("invalid meal");
        }

        for(let row = 0; row < ingredientTableRows.length; row++)
            if(ingredientTableRows[row][columnIndex] == "add_button"){
                setIngredientTableRows(prev => {
                    const newTableRows = JSON.parse(JSON.stringify(prev))
                    newTableRows[row][columnIndex] = currFoodData
                    if(newTableRows.length > row + 1)
                        newTableRows[row + 1][columnIndex] = "add_button"
                    else {
                        newTableRows.push([null, null, null, null, null])
                        newTableRows[row + 1][columnIndex] = "add_button"
                    }
                    return newTableRows
                })
                break
            }
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
                    maxlength="50"
                />
                <datalist id="foodItems">
                    {[...foodItems].map(foodItem => (
                        <option className="text-center md:text-3xl text-md" key={foodItem.split("|")[0]} value={foodItem.split("|")[0]}>{foodItem.split("|")[0]}</option>
                    ))}
                </datalist>

                <label className="mt-6 p-1 md:p-2 md:text-3xl text-lg" htmlFor="currAmount">Select amount{foodItems.has(currFoodItem + "|g") ? " in grams" : foodItems.has(currFoodItem + "|ml") ? " in milliliters" : ""}:</label>
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
                    <h1 className={`mx-auto md:text-3xl text-lg ${isValidEntry(currFoodItem, currAmount) ? "" : "text-red-600"}`}>{isValidEntry(currFoodItem, currAmount) ? currFoodData == null ? "" : currFoodData["food_name"] + " - " + currFoodData["measure"] : "invalid currFoodItem or currAmount"}</h1>
                </div>
                <div className="w-1/2">
                <table className="mx-auto border-separate border-spacing-0">
                    <tr>
                        <td className="py-2 px-4 text-center border-black border-t-2 border-l-2 rounded-tl-xl">Calories: {currFoodData == null ? "" : currFoodData["calories"] + " kcal"}</td>
                        <td className="py-2 px-4 text-center border-black border-t-2 border-x-2 rounded-tr-xl"></td>
                    </tr>
                    <tr>
                        <td rowspan="3" className="py-2 px-4 text-center border-black border-t-2 border-l-2">Carbohydrates: {currFoodData == null ? "" : currFoodData["carbohydrates"] + " g"}</td>
                        <td className="py-2 px-4 text-center border-black border-t-2 border-x-2">Sugars: {currFoodData == null ? "" : currFoodData["sugars"] + " g"}</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 text-center border-black border-t-2 border-x-2">Fiber: {currFoodData == null ? "" : currFoodData["fiber"] + " g"}</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 text-center border-black border-t-2 border-x-2">Starch: {currFoodData == null ? "" : currFoodData["starch"] + " g"}</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 text-center border-black border-t-2 border-l-2">Protein: {currFoodData == null ? "" : currFoodData["protein"] + " g"}</td>
                        <td className="py-2 px-4 text-center border-black border-t-2 border-x-2"></td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 text-center border-black border-y-2 border-l-2 rounded-bl-xl">Fat: {currFoodData == null ? "" : currFoodData["fat"] + " g"}</td>
                        <td className="py-2 px-4 text-center border-black border-2 rounded-br-xl">Saturated fat: {currFoodData == null ? "" : currFoodData["saturated_fat"] + " g"}</td>
                    </tr>
                </table>
                </div>
            </div>
            
            <table className="mx-auto mt-36 border-separate border-spacing-0">
                <tr>
                    <td className="py-2 px-4 text-center border-black border-t-2 border-l-2 rounded-tl-xl">Breakfast</td>
                    <td className="py-2 px-4 text-center border-black border-t-2 border-l-2">First snack</td>
                    <td className="py-2 px-4 text-center border-black border-t-2 border-l-2">Lunch</td>
                    <td className="py-2 px-4 text-center border-black border-t-2 border-l-2">Second snack</td>
                    <td className="py-2 px-4 text-center border-black border-t-2 border-x-2 rounded-tr-xl">Dinner</td>
                </tr>
                {ingredientTableRows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((tableItem, cellIndex) => {
                            let borderStyle = "border-black"
                            const isOnLastRow = rowIndex == ingredientTableRows.length - 1
                            const isOnLastColumn = cellIndex == 4
                            const isBottomLeftCorner = isOnLastRow && cellIndex == 0
                            const isBottomRightCorner = isOnLastRow && isOnLastColumn
                            borderStyle += isOnLastRow ? " border-y-2" : " border-t-2"
                            borderStyle += isOnLastColumn ? " border-x-2" : " border-l-2"
                            borderStyle += isBottomLeftCorner ? " rounded-bl-xl" : ""
                            borderStyle += isBottomRightCorner ? " rounded-br-xl" : ""
                            if (tableItem == "add_button") {
                                return (
                                    <td key={cellIndex} className={`py-2 px-4 ${borderStyle}`}>
                                        <img 
                                            className="m-auto w-8 hover:cursor-pointer"
                                            src={plus} 
                                            alt="add food item"
                                            onClick={() => {
                                                switch (cellIndex) {
                                                    case 0:
                                                        addCurrFoodDataToFinalTable("breakfast");
                                                        break;
                                                    case 1:
                                                        addCurrFoodDataToFinalTable("first snack");
                                                        break;
                                                    case 2:
                                                        addCurrFoodDataToFinalTable("lunch");
                                                        break;
                                                    case 3:
                                                        addCurrFoodDataToFinalTable("second snack");
                                                        break;
                                                    case 4:
                                                        addCurrFoodDataToFinalTable("dinner");
                                                        break;
                                                    default:
                                                        throw new Error("invalid meal");
                                                }
                                            }}
                                        />
                                    </td>
                                );
                            } else {
                                return (
                                    <td key={cellIndex} className={`py-2 px-4 text-center ${borderStyle}`}>
                                        {tableItem == null ? "" : tableItem["food_name"] + " - " + tableItem["measure"]}
                                    </td>
                                );
                            }
                        })}
                    </tr>
                ))}
            </table>
        </>
    )
}