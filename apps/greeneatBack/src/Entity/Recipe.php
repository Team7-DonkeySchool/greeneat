<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\RecipeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RecipeRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
    ],
)
]

class Recipe
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;


    #[ORM\OneToMany(mappedBy: 'recipe', targetEntity: RecipeImage::class)]
    private Collection $recipeImages;

    #[ORM\ManyToOne(inversedBy: 'recipes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Category $categoryRecipe = null;

    #[ORM\ManyToMany(targetEntity: Tag::class, inversedBy: 'recipes', cascade: ['persist'])]
    private Collection $Tag;

    #[ORM\OneToMany(mappedBy: 'recipe', targetEntity: LinkedIngredients::class, cascade: ['persist'], orphanRemoval: true)]
    private Collection $linkedIngredients;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;


    public function __construct()
    {
        $this->recipeImages = new ArrayCollection();
        $this->Tag = new ArrayCollection();
        $this->linkedIngredients = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    

    /**
     * @return Collection<int, RecipeImage>
     */
    public function getRecipeImages(): Collection
    {
        return $this->recipeImages;
    }

    public function addRecipeImage(RecipeImage $recipeImage): self
    {
        if (!$this->recipeImages->contains($recipeImage)) {
            $this->recipeImages->add($recipeImage);
            $recipeImage->setRecipe($this);
        }

        return $this;
    }

    public function removeRecipeImage(RecipeImage $recipeImage): self
    {
        if ($this->recipeImages->removeElement($recipeImage)) {
            // set the owning side to null (unless already changed)
            if ($recipeImage->getRecipe() === $this) {
                $recipeImage->setRecipe(null);
            }
        }

        return $this;
    }

    public function getCategoryRecipe(): ?Category
    {
        return $this->categoryRecipe;
    }

    public function setCategoryRecipe(?Category $categoryRecipe): self
    {
        $this->categoryRecipe = $categoryRecipe;

        return $this;
    }

    /**
     * @return Collection<int, Tag>
     */
    public function getTag(): Collection
    {
        return $this->Tag;
    }

    public function addTag(Tag $tag): self
    {
        if (!$this->Tag->contains($tag)) {
            $this->Tag->add($tag);
        }

        return $this;
    }

    public function removeTag(Tag $tag): self
    {
        $this->Tag->removeElement($tag);

        return $this;
    }

    /**
     * @return Collection<int, LinkedIngredients>
     */
    public function getLinkedIngredients(): Collection
    {
        return $this->linkedIngredients;
    }

    public function addLinkedIngredient(LinkedIngredients $linkedIngredient): self
    {
        if (!$this->linkedIngredients->contains($linkedIngredient)) {
            $this->linkedIngredients->add($linkedIngredient);
            $linkedIngredient->setRecipe($this);
        }

        return $this;
    }

    public function removeLinkedIngredient(LinkedIngredients $ingredient): self
    {
        if ($this->linkedIngredients->removeElement($ingredient)) {
            // set the owning side to null (unless already changed)
            if ($ingredient->getRecipe() === $this) {
                $ingredient->setRecipe(null);
            }
        }

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

}
