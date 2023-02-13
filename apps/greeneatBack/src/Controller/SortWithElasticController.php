<?php

namespace App\Controller;

use App\Repository\IngredientRepository;
use App\Service\ElasticService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class SortWithElasticController
{
    public function __invoke(
        IngredientRepository $ingredientRepository,
        ElasticService $elasticService,
        Request $request)
    {
        $result = $elasticService->getResults((string) $request->get('name', ''));

        if ($result["hits"]["total"]["value"] === 0) {
            return null;
        }

        return $ingredientRepository->findById($result["hits"]["hits"][0]["_id"]);
    }
}
