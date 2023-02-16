<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\LinkedIngredientsRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

// /**
//  * @ORM\Entity(repositoryClass=LinkedIngredientsRepository::class)
//  * @ApiResource
//  */

#[ORM\Entity(repositoryClass:LinkedIngredientsRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
    ],
)
]
class LinkedIngredients
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['write_recipe'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'ingredient')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Ingredient $ingredient = null;

    #[ORM\ManyToOne(inversedBy: 'recipe')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Recipe $recipe = null;

    #[ORM\Column(nullable:true)]
    private ?float $quantity = null;

    
    #[ORM\Column(nullable:true)]
    private ?string $unit = null;

    public function __toString()
    {
        return $this->ingredient->getName();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIngredient(): ?Ingredient
    {
        return $this->ingredient;
    }

    public function setIngredient(?Ingredient $ingredient): self
    {
        $this->ingredient = $ingredient;

        return $this;
    }

    public function getRecipe(): ?Recipe
    {
        return $this->recipe;
    }

    public function setRecipe(?Recipe $recipe): self
    {
        $this->recipe = $recipe;

        return $this;
    }

    public function getQuantity(): ?float
    {
        return $this->quantity;
    }

    public function setQuantity(?float $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getUnit(): ?string
    {
        return $this->unit;
    }

    public function setUnit(string $unit): self
    {
        $this->unit = $unit;

        return $this;
    }
}
