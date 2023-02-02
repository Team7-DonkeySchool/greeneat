<?php

namespace App\DataFixtures;

use App\Entity\Ingredient;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
//Dépendance pour lire le fichier CSV
//symfony composer require league/csv
use League\Csv\Reader;

class IngredientFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $data = $this->loadDataFromCSV('src/DataFixtures/CSV/IngredientFixtures.csv');

        $i = 0;

        foreach ($data as $row) {
            //On crée une entité Ingredient
            $entity = new Ingredient();
            //On set chaque carac de l'entité avec les données du CSV
            $entity->setName($row['nameEN']);
            $entity->setRatioCo2($row['ratioCo2']);
            $entity->setRatioH2o($row['ratioH2o']);
            $entity->setEcoscore($row['ecoscore']);
            $entity->setSeasonFrom($row['seasonFrom']);
            $entity->setSeasonTo($row['seasonTo']);
            $entity->setWeightPerUnity($row['weightPerUnity']);
            $manager->persist($entity);

            $i++;

            if ($i % 20 === 0) {//pour éviter de faire un flush à chaque itération ou bien un énorme à la tout fin, on va le faire tous les 20 enregistrements
                $manager->flush();
            }
        }

        $manager->flush();    
    }

    private function loadDataFromCSV(string $filePath): array //on va lire le fichier CSV et retourner un tableau, pour ça on va utiliser la librairie league/csv
    {
        $csv = Reader::createFromPath($filePath, 'r');//r pour read
        $csv->setHeaderOffset(0); //à voir ce que ça donne parce que le name est en 1ere colonne dans le CSV mais pas dans la BDD

        return iterator_to_array($csv->getRecords(), true);//on convertit l'objet "Iterator" en un tableau

    }
}
