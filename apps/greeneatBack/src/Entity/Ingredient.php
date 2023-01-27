<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\IngredientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: IngredientRepository::class)]
#[ApiResource()]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial'])]
class Ingredient
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(nullable: true)]
    private ?float $ratio_co2 = null;

    #[ORM\Column(nullable: true)]
    private ?float $ratio_h2o = null;

    #[ORM\Column(nullable: true)]
    private ?float $nutriscore = null;

    #[ORM\Column(nullable: true)]
    private ?string $season_from = null;

    #[ORM\Column(nullable: true)]
    private ?string $season_to = null;

    #[ORM\OneToMany(mappedBy: 'ingredient', targetEntity: IngredientImage::class, orphanRemoval: true)]
    private Collection $ingredientImages;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $ecoscore = null;

    #[ORM\OneToMany(mappedBy: 'ingredient', targetEntity: IngredientRecipe::class)]
    private Collection $ingredientRecipe;

    #[ORM\Column(nullable: true)]
    private ?int $mass_per_unit = null;

    public function __construct()
    {
        $this->ingredientImages = new ArrayCollection();
        $this->ingredientRecipe = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->name;
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

    public function getRatioCo2(): ?float
    {
        return $this->ratio_co2;
    }

    public function setRatioCo2(?float $ratio_co2): self
    {
        $this->ratio_co2 = $ratio_co2;

        return $this;
    }

    public function getRatioH2o(): ?float
    {
        return $this->ratio_h2o;
    }

    public function setRatioH2o(?float $ratio_h2o): self
    {
        $this->ratio_h2o = $ratio_h2o;

        return $this;
    }

    public function getNutriscore(): ?float
    {
        return $this->nutriscore;
    }

    public function setNutriscore(?float $nutriscore): self
    {
        $this->nutriscore = $nutriscore;

        return $this;
    }

    public function getSeasonFrom(): ?string
    {
        return $this->season_from;
    }

    public function setSeasonFrom(?string $season_from): self
    {
        $this->season_from = $season_from;

        return $this;
    }

    public function getSeasonTo(): ?string
    {
        return $this->season_to;
    }

    public function setSeasonTo(?string $season_to): self
    {
        $this->season_to = $season_to;

        return $this;
    }

    /**
     * @return Collection<int, IngredientImage>
     */
    public function getIngredientImages(): Collection
    {
        return $this->ingredientImages;
    }

    public function addIngredientImage(IngredientImage $ingredientImage): self
    {
        if (!$this->ingredientImages->contains($ingredientImage)) {
            $this->ingredientImages->add($ingredientImage);
            $ingredientImage->setIngredient($this);
        }

        return $this;
    }

    public function removeIngredientImage(IngredientImage $ingredientImage): self
    {
        if ($this->ingredientImages->removeElement($ingredientImage)) {
            // set the owning side to null (unless already changed)
            if ($ingredientImage->getIngredient() === $this) {
                $ingredientImage->setIngredient(null);
            }
        }

        return $this;
    }

    public function getEcoscore(): ?string
    {
        return $this->ecoscore;
    }

    public function setEcoscore(?string $ecoscore): self
    {
        $this->ecoscore = $ecoscore;

        return $this;
    }

    /**
     * @return Collection<int, IngredientRecipe>
     */
    public function getIngredientRecipes(): Collection
    {
        return $this->ingredientRecipe;
    }

    public function addIngredientRecipe(IngredientRecipe $ingredientRecipe): self
    {
        if (!$this->ingredientRecipe->contains($ingredientRecipe)) {
            $this->ingredientRecipe->add($ingredientRecipe);
            $ingredientRecipe->setIngredient($this);
        }

        return $this;
    }

    public function removeIngredientRecipe(IngredientRecipe $ingredientRecipe): self
    {
        if ($this->ingredientRecipe->removeElement($ingredientRecipe)) {
            // set the owning side to null (unless already changed)
            if ($ingredientRecipe->getIngredient() === $this) {
                $ingredientRecipe->setIngredient(null);
            }
        }

        return $this;
    }

    public function getMassPerUnit(): ?int
    {
        return $this->mass_per_unit;
    }

    public function setMassPerUnit(?int $mass_per_unit): self
    {
        $this->mass_per_unit = $mass_per_unit;

        return $this;
    }

}
