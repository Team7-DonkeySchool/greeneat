<?php

namespace App\Controller\Admin;

use App\Entity\Ingredient;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class IngredientCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Ingredient::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->onlyOnIndex(),
            TextField::new('name'),
            TextEditorField::new('ratio_co2'),
            TextEditorField::new('ratio_h2o'),
            // TextEditorField::new('nutriscore'),
            // TextEditorField::new('season_from'),
            // TextEditorField::new('season_to'),
            TextEditorField::new('ecoscore'),
            // TextEditorField::new('ingredientImages'),
        ];
    }
    
}
