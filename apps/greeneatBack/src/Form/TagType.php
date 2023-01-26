<?php

namespace App\Form;

use App\Entity\Tag;
use App\Repository\TagRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TagType extends AbstractType
{
    public function __construct(private TagRepository $tagRepository)
    {
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $tags = $this->tagRepository->findAll();
        $builder
            ->add('name', ChoiceType::class, [
                'choices' => array_combine($tags, $tags),
                'by_reference' => false,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Tag::class,
        ]);
    }
}

?>