<?php

namespace App\DataFixtures;

use App\Entity\Ingredient;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Persistence\ObjectManager;
//Dépendance pour lire le fichier CSV
//symfony composer require league/csv
use League\Csv\Reader;


class IngredientFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $data = $this->loadDataFromCSV('src/DataFixtures/CSV/IngredientsFixtures.csv');
        $i = 0;
            foreach ($data as $row) {
                //On crée une entité Ingredient
                $entity = new Ingredient();
                //On set chaque carac de l'entité avec les données du CSV
                $entity->setName($row['name']);
                $entity->setRatioCo2($row['ratio_co2']);
                $entity->setRatioH2o($row['ratio_h2o']);
                $entity->setNutriscore($row['nutriscore']);
                $entity->setSeasonFrom($row['season_from']);
                $entity->setSeasonTo($row['season_to']);
                $manager->persist($entity);
                $i ++;
            }
            if ($i % 20 === 0) {//pour éviter de faire un flush à chaque itération, on va le faire tous les 20 enregistrements
                $manager->flush();
            }
            $manager->flush();
    }

    private function loadDataFromCSV(string $filePath): array //on va lire le fichier CSV et retourner un tableau, pour ça on va utiliser la librairie league/csv
    {
        $csv = Reader::createFromPath($filePath, 'r');//r pour read
        $csv->setHeaderOffset(0); //à voir ce que ça donne parce que le name est en 1ere colonne dans le CSV mais pas dans la BDD
        //on convertit l'objet "Iterator" en un tableau
        return $csv->getRecords()->toArray();
    }

}



// php bin/console doctrine:fixtures:load --fixtures=src/DataFixtures/IngredientFixtures.php