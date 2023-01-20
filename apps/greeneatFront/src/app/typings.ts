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
