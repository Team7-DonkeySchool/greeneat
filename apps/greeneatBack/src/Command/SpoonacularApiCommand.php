<?php

namespace App\Command;

use App\Entity\Ingredient;
use App\Entity\LinkedIngredients;
use App\Entity\Recipe;
use App\Entity\RecipeImage;
use App\Repository\CategoryRepository;
use App\Repository\IngredientRepository;
use App\Repository\RecipeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[AsCommand(
    name: 'spoonacular:get',
    description: 'recording in database spoonacular recipes'
)]
class SpoonacularApiCommand extends Command
{
    public function __construct(
        private LoggerInterface $logger, 
        private IngredientRepository $ingredientRepository, 
        private RecipeRepository $recipeRepository, 
        private CategoryRepository $categoryRepository, 
        private HttpClientInterface $client, 
        private EntityManagerInterface $manager)
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

        $dishTypes = $recipeSpoonacular["dishTypes"];

        if (in_array("starter", $dishTypes)) {
            $category = $this->categoryRepository->find(1);
        } else if (in_array("lunch", $dishTypes) || in_array("side dish", $dishTypes)) {
            $category = $this->categoryRepository->find(2);
        } else if (in_array("dessert", $dishTypes)) {
            $category = $this->categoryRepository->find(3);
        } else if (in_array("drink", $dishTypes) || in_array("beverage", $dishTypes)) {
            $category = $this->categoryRepository->find(4);
        } else {
            $category = $this->categoryRepository->find(2);
        }

        // persist recipe
        $title = $recipeSpoonacular["title"];

        // checking if recipe is already in recipes table
        if ($this->recipeRepository->findOneBy(array('name' => $title))) {
            return;
        }

        $recipe = new Recipe();
        $recipe->setName($title);
        $recipe->setCategoryRecipe($category);
        $recipe->setDescription($recipeSpoonacular["instructions"]);
        $recipe->setPartner("spoonacular");
        $recipe->setPartnerId($recipeSpoonacular["id"]);
        $this->manager->persist($recipe);

        //persist recipeImage
        $image = $recipeSpoonacular["image"]; 

        $recipeImage = new RecipeImage();
        $recipeImage->setImageFileFromUrl($image);
        $recipeImage->setPosition(1);
        $recipe->addRecipeImage($recipeImage);

        $this->logger->debug('Prepare reciepe image', [
            'recipeImage' => $recipeImage,
        ]);

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
        $offset = 2;
        
        for ($i = $startBoucle; $i <= $startBoucle + $offset; $i++) {
            try {
                $recipeSpoonacular = $this->fetchSpoonacularRecipe($i);

                $this->logger->info('Fetched fetchSpoonacularRecipe', [
                    'recipeSpoonacular' => $recipeSpoonacular,
                ]);
                //dd($recipeSpoonacular);
                $this->persistRecipeInDB($recipeSpoonacular);
            }
            catch(\Exception $e) {
                $this->logger->error('Fetched Exception', [
                    'exception' => $e,
                ]);
            }
        }

        return Command::SUCCESS;
    }
}