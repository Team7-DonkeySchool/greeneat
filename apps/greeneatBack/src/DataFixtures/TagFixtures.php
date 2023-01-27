<?php

namespace App\DataFixtures;

use App\Entity\Tag;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class TagFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $cocktail = new Tag();
        $cocktail->setName('cocktails');
        $manager->persist($cocktail);
        $manager->flush();

        $manager->flush();

        $mocktail = new Tag();
        $mocktail->setName('mocktails');
        $manager->persist($mocktail);
        $manager->flush();

        $manager->flush();
    }
}
