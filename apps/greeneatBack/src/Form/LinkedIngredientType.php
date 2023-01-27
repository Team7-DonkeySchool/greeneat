<?php

namespace App\Form;

use App\Entity\Ingredient;
use App\Entity\LinkedIngredients;
use App\Repository\IngredientRepository;
use App\Repository\LinkedIngredientsRepository;
use Doctrine\DBAL\Types\FloatType;
use Doctrine\DBAL\Types\IntegerType;
use Doctrine\DBAL\Types\TextType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormTypeInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class LinkedIngredientType extends AbstractType 
{
    public function __construct(private IngredientRepository $ingredientRepository)
    {
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $ingredients = $this->ingredientRepository->findAll();

        $builder
            ->add('ingredient', ChoiceType::class, [
                'choices' => array_combine($ingredients, $ingredients),
                'by_reference' => false,
            ])   
            ->add('quantity')  
            ->add('unit')

            // ->add('ratio_co2')
            // ->add('ratio_h2o')
            // ->add('nutriscore')
            // ->add('season_from')
            // ->add('season_to')
            // ->add('ecoscore')
        ;
    }


        
    

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => LinkedIngredients::class,
        ]);
    }
}
