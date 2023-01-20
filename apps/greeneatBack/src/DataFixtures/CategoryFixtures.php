<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategoryFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $starters = new Category();
        $starters->setName('starters');
        $manager->persist($starters);
        $manager->flush();

        $dishes = new Category();
        $dishes->setName('dishes');
        $manager->persist($dishes);
        $manager->flush();

        $desserts = new Category();
        $desserts->setName('desserts');
        $manager->persist($desserts);
        $manager->flush();

        $drinks = new Category();
        $drinks->setName('drinks');
        $manager->persist($drinks);
        $manager->flush();
    }
}
