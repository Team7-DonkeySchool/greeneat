<?php

namespace App\Command;

use App\Entity\Category;
use App\Entity\Ingredient;
use App\Entity\LinkedIngredients;
use App\Entity\Recipe;
use App\Repository\CategoryRepository;
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
    public function __construct(private CategoryRepository $categoryRepository, private HttpClientInterface $client, private EntityManagerInterface $manager)
    {
        parent::__construct();
    }

    private function fetchSpoonacularRecipes(int $id): array
    {
        $response = $this->client->request(
            "GET",
            "https://api.spoonacular.com/recipes/" . $id . "/information?apiKey=dbfb5a18aa1949a78c5aa7bb02494fd9",
        );

        // $statusCode = $response->getStatusCode();
        // $contentType = $response->getHeaders()['content-type'][0];

        $content = $response->getContent();
        $content = $response->toArray();

        return $content;
    }

    private function persistRecipeInDB(array $content): void
    {
        // persist category
        $category = $this->categoryRepository->find(2); // TO DO // change according to the category needed

        // persist category
        $recipe = new Recipe();
        $recipe->setName($content["title"]);
        $recipe->setCategoryRecipe($category);
        $recipe->setDescription($content["instructions"]);
        $recipe->setPartner("spoonacular");
        $recipe->setPartnerId($content["id"]);
        $this->manager->persist($recipe);

        // persist ingredients & linkedIngredients
        if ($content["extendedIngredients"]) {
            foreach ($content["extendedIngredients"] as $ingredientRecipe) {
                $ingredient = new Ingredient();
                $ingredient->setName($ingredientRecipe["name"]);
                $this->manager->persist($ingredient);

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
        $this->addArgument('id', InputArgument::REQUIRED);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $recipeSpoonacular = $this->fetchSpoonacularRecipes($input->getArgument('id'));

        $this->persistRecipeInDB($recipeSpoonacular);
    
        return Command::SUCCESS;
    }
}