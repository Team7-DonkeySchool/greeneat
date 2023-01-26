<?php

namespace App\Form;

use App\Entity\Ingredient;
use App\Repository\IngredientRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class IngredientType extends AbstractType
{
    public function __construct(private IngredientRepository $ingredientRepository)
    {
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $ingredients = $this->ingredientRepository->findAll();

        $builder
            ->add('name', ChoiceType::class, [
                'choices' => array_combine($ingredients, $ingredients),
                'by_reference' => false,
            ])            
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
            'data_class' => Ingredient::class,
        ]);
    }
}
