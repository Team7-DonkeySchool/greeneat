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
        $data = $this->loadDataFromCSV('src/DataFixtures/CSV/IngredientFixtures2.csv');

        $i = 0;

        foreach ($data as $row) {
            $entity = new Ingredient();
            $entity->setName($row['name']);
            $entity->setRatioCo2($row['B']);
            $entity->setRatioH2o($row['C']);
            $entity->setEcoscore($row['D']);
            $entity->setSeasonFrom(new DateTime('2022-01-02'));
            $entity->setSeasonTo(new DateTime('2022-02-02'));
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
