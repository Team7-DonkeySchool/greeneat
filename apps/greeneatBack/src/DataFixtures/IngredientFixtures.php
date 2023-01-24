<?php

namespace App\DataFixtures;

use App\Entity\Ingredient;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use League\Csv\Reader;

class IngredientFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $data = $this->loadDataFromCSV('src/DataFixtures/CSV/IngredientFixtures.csv');

        $i = 0;

        foreach ($data as $row) {
            $entity = new Ingredient();
            $entity->setName($row['name']);
            $entity->setRatioCo2($row['ratioCo2']);
            $entity->setRatioH2o($row['ratioH2o']);
            $entity->setEcoscore($row['ecoscore']);
            $entity->setSeasonFrom($row['seasonFrom']);
            $entity->setSeasonTo($row['seasonTo']);
            $manager->persist($entity);

            $i++;

            if ($i%20 === 0) {
                $manager->flush();
            }
        }

        $manager->flush();    
    }

    private function loadDataFromCSV(string $filePath): array
    {
        $csv = Reader::createFromPath($filePath, 'r');
        $csv->setHeaderOffset(0);

        return iterator_to_array($csv->getRecords(), true);

    }
}
