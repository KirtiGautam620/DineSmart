const BASE_URL = "https://www.themealdb.com/api/json/v1/1";
export const MealApi = {
    searchByName:async (name)=>{
        try{
            const response= await fetch(`${BASE_URL}/search.php?s=${encodeURI(name)}`)
            const data=await response.json()
            return data.meals||[]
        }catch(err){
            console.log(err)
            return []
        }
    },
    getById:async (id)=>{
        try{
            const response= await fetch(`${BASE_URL}/lookup.php?i=${id}`)
            const data=await response.json()
            return data.meals||[]
        }catch(err){
            console.log(err)
            return []
        }
    },
    getRandomMeal:async (count=6)=>{
        try{
            const response= await fetch(`${BASE_URL}/random.php`)
            const data=await response.json()
            return data.meals||[]
        }catch(err){
            console.log(err)
            return []
        }
    },
    getCategories:async ()=>{
        try{
            const response= await fetch(`${BASE_URL}/categories.php`)
            const data=await response.json()
            return data.categories||[]
        }catch(err){
            console.log(err)
            return []
        }
    },
    filterByIngredient:async (ingredient)=>{
        try{
            const response= await fetch(`${BASE_URL}/filter.php?i=${ingredient}`)
            const data=await response.json()
            return data.meals||[]
        }catch(err){
            console.log(err)
            return []
        }
    },

    filterByCategory:async (category)=>{
        try{
            const response= await fetch(`${BASE_URL}/filter.php?c=${category}`)
            const data=await response.json()
            return data.meals||[]
        }catch(err){
            console.log(err)
            return []
        }   
    },
    TransformMealData:(meal)=>{
        if(!meal) return null
        const ingredients=[]
        for(let i=1;i<=20;i++){
            const ingredient=meal[`strIngredient${i}`]
            const measure=meal[`strMeasure${i}`]
            if(ingredient && ingredient.trim()){
                const measureText=measure && measure.trim() ? `(${measure})` : ""
                ingredients.push(`${ingredient} ${measureText}`)
            }
        }
        const instructions=meal.strInstructions ? meal.strInstructions.split("\r\n").filter((item)=>item.trim()) : []
        return {
            id:meal.idMeal,
            title:meal.strMeal,
            description:meal.strInstructions ? meal.strInstructions.substring(0,100)+"...":"Delecious meal from THE MEALDB",
            image:meal.strMealThumb,
            cookTime:"30 minutes",
            servings:"4",
            category:meal.strCategory||"Main Course",
            area:meal.strArea,
            ingredients,
            instructions,
            originalData:meal
        }
    }
}