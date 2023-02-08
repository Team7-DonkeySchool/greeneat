export interface Recipe {
    title: string,
    image: string,
    dishTypes: string[],
    extendedIngredients: Ingredient[],
}

export interface RecipeArray {
    recipes: Recipe[],
}

export interface RecipeSpoonacular {
    
}

export interface Ingredient {
    id: number,
    name: string,
    measures: {
        metric: {
            amount: number,
            unitShort: string,
            unitLong: string
        }
    }
}

export interface ArrayRecipes {
    results: {
        title: string,
        sourceUrl: string,
        image: string,
    },
}

export interface ArrayProductsOpenFoodFacts {
    count: number,
    page: number,
    page_count: number,
    page_size: number,
    products: [],
}

export interface Product {
    nutriscore_grade: number | string,
    ecoscore_grade: number | string,
    product_name_fr: string,
    nutriments: {
        fat_100g: number,
        sugars_100g: number,
        sodium_100g: number,
        "energy-kcal_100g": number
    },
}


export interface Ingredient2 {
    id: number,
    name: string,
    ratioCo2: number,
    ratioH2o: number,
    ecoscore: string,
    weightPerUnity: number
}

export interface RequestedIngredients {
    "hydra:member": Ingredient2[],
}
