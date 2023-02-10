<?php

namespace App\Command;

use App\Entity\Category;
use App\Entity\Ingredient;
use App\Entity\LinkedIngredients;
use App\Entity\Recipe;
use App\Repository\CategoryRepository;
use App\Repository\IngredientRepository;
use App\Repository\RecipeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[AsCommand(
    name: 'spoonacular:get',
    description: 'recording in database spoonacular recipes'
)]
class SpoonacularApiCommand extends Command
{
    public function __construct(private IngredientRepository $ingredientRepository, private RecipeRepository $recipeRepository, private CategoryRepository $categoryRepository, private HttpClientInterface $client, private EntityManagerInterface $manager)
    {
        parent::__construct();
    }

    private function fetchSpoonacularRecipe(int $id): array
    {
        $response = $this->client->request(
            "GET",
            "https://api.spoonacular.com/recipes/" . $id . "/information?apiKey=dbfb5a18aa1949a78c5aa7bb02494fd9",
        );

        // $statusCode = $response->getStatusCode();
        // $contentType = $response->getHeaders()['content-type'][0];

        $recipeSpoonacular = $response->getContent();
        $recipeSpoonacular = $response->toArray();

        return $recipeSpoonacular;
    }

    private function getLastRecipeSpoonacularId(): int
    {
        $lastRecipe = $this->recipeRepository->findOneBy([], ['id' => 'desc']);
        $lastRecipe ? $lastId = $lastRecipe->getPartnerId() : $lastId = 0;

        return $lastId;
    }

    private function persistRecipeInDB(array $recipeSpoonacular): void
    {
        // persist category
        $category = $this->categoryRepository->find(2); // TO DO // change according to the category needed

        // persist recipe
        $title = $recipeSpoonacular["title"];

        // checking if recipe is already in recipes table
        if ($this->recipeRepository->findOneBy(array('name' => $title))) return;

        $recipe = new Recipe();
        $recipe->setName($title);
        $recipe->setCategoryRecipe($category);
        $recipe->setDescription($recipeSpoonacular["instructions"]);
        $recipe->setPartner("spoonacular");
        $recipe->setPartnerId($recipeSpoonacular["id"]);
        $this->manager->persist($recipe);

        // persist ingredients & linkedIngredients
        if ($recipeSpoonacular["extendedIngredients"]) {
            foreach ($recipeSpoonacular["extendedIngredients"] as $ingredientRecipe) {

                $name = $ingredientRecipe["name"];

                // checking if ingredient is already in ingredients table
                if ($this->ingredientRepository->findOneBy(array('name' => $name))) {
                    $ingredient = $this->ingredientRepository->findOneBy(array('name' => $name));
                } else {
                    $ingredient = new Ingredient();
                    $ingredient->setName($name);
                    $this->manager->persist($ingredient);
                }

                $linkedIngredient = new LinkedIngredients();
                $linkedIngredient->setIngredient($ingredient);
                $linkedIngredient->setRecipe($recipe);
                $linkedIngredient->setQuantity(floatval($ingredientRecipe["measures"]["metric"]["amount"]));
                $linkedIngredient->setUnit($ingredientRecipe["measures"]["metric"]["unitLong"]);
                $this->manager->persist($linkedIngredient);
            }
        }
        $this->manager->flush();
    }

    protected function configure(): void
    {
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $lastSpoonacularRecipeId = $this->getLastRecipeSpoonacularId();
        $startBoucle = $lastSpoonacularRecipeId + 1;
        $offset = 4;
        
        for ($i = $startBoucle; $i <= $startBoucle + $offset; $i++) {
            try {
                $recipeSpoonacular = $this->fetchSpoonacularRecipe($i);
            } catch(\Exception $e) {
                
            }

            $this->persistRecipeInDB($recipeSpoonacular);
        }
            

        return Command::SUCCESS;
    }
}