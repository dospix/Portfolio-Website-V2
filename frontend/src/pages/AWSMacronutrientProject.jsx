import { useState, useEffect } from "react"

export default function MySQLProject(props){
    const foodItems = new Set(["whole milk", "reduced fat milk", "low fat milk", "fat free milk", "goat milk", "almond milk", "oat milk", "soy milk", "buttermilk", "hot chocolate", "plain nonfat greek yogurt", "plain whole milk greek yogurt", "strawberry nonfat greek yogurt", "plain nonfat yogurt", "plain whole milk yogurt", "vanilla ice cream", "chocolate ice cream", "strawberry ice cream", "heavy cream", "sour cream", "american cheese", "cheddar cheese", "cottage cheese", "feta cheese", "monterey jack cheese", "mozzarella cheese", "parmesan cheese", "provolone cheese", "ricotta cheese", "swiss cheese", "brie cheese", "blue cheese", "cream cheese", "egg", "egg white", "egg yolk", "butter", "almond butter", "peanut butter", "sesame butter", "lard", "margarine", "sunflower oil", "olive oil", "coconut oil", "canola oil", "corn oil", "peanut oil", "soybean oil", "beef", "sirloin steak", "t-bone steak", "filet mignon steak", "chuck roast", "beef brisket", "rump roast", "flank steak", "tenderloin roast", "ribeye steak", "eye of round roast", "porterhouse steak", "beef stew meat", "beef short ribs", "ground beef", "chicken breast", "chicken thighs", "chicken drumsticks", "chicken wings", "ground chicken", "bacon", "pork chops", "pork loin", "pork tenderloin", "pork shoulder", "pork belly", "ground pork", "turkey", "turkey breast", "turkey drumsticks/thighs", "ground turkey", "beef breakfast sausage", "italian pork sausage", "chorizo sausage", "turkey sausage", "frankfurter", "ham", "deli turkey/chicken meat", "clams", "cod", "crab", "fish sticks", "flounder", "haddock", "halibut", "herring", "lobster", "mackerel", "oysters", "salmon"])
    const [currFoodItem, setCurrFoodItem] = useState("")
    const [currAmount, setCurrAmount] = useState(0)

    function handleFormChange(event) {
        let {name, value, type, checked} = event.target

        if(name == "currFoodItem")
            setCurrFoodItem(value)
        else if(name == "currAmount" && 0 <= value && value <= 10000)
            setCurrAmount(value)
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
                />
                <datalist id="foodItems">
                    {[...foodItems].map(foodItem => (
                        <option className="text-center md:text-3xl text-md" key={foodItem} value={foodItem}>{foodItem}</option>
                    ))}
                </datalist>

                <label className="p-1 md:p-2 md:text-3xl text-lg" htmlFor="currAmount">Select amount:</label>
                    <input 
                        type="number"
                        className="ml-2 mb-10 p-1 md:p-2 border-[3px] border-black focus:outline-none focus:border-blue-500 rounded-md text-center md:text-3xl text-md text-black"
                        id="currAmount"
                        name="currAmount"
                        value={currAmount}
                        onChange={handleFormChange}
                    />
            </div>
            
        </>
    )
}