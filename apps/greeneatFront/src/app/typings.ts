export interface Recipe {
    title: string,
    image: string,
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

