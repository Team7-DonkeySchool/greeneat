<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\HttpOperation;
use App\Controller\SortWithElasticController;
use App\Repository\IngredientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: IngredientRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(
            controller: SortWithElasticController::class,
        ),
    ],
)
]
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

    #[ORM\OneToMany(mappedBy: 'ingredient', targetEntity: LinkedIngredients::class, cascade: ['persist'], orphanRemoval: true)]
    private Collection $LinkedIngredients;

    #[ORM\Column(nullable: true)]
    private ?float $weightPerUnity = null;

    public function __construct()
    {
        $this->LinkedIngredients = new ArrayCollection();
        $this->LinkedIngredients = new ArrayCollection();
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
     * @return Collection<int, LinkedIngredients>
     */
    public function getLinkedIngredients(): Collection
    {
        return $this->LinkedIngredients;
    }

    public function addLinkedIngredients(LinkedIngredients $LinkedIngredient): self
    {
        if (!$this->LinkedIngredients->contains($LinkedIngredient)) {
            $this->LinkedIngredients->add($LinkedIngredient);
            $LinkedIngredient->setIngredient($this);
        }

        return $this;
    }

    public function removeLinkedIngredients(LinkedIngredients $LinkedIngredients): self
    {
        if ($this->LinkedIngredients->removeElement($LinkedIngredients)) {
            // set the owning side to null (unless already changed)
            if ($LinkedIngredients->getIngredient() === $this) {
                $LinkedIngredients->setIngredient(null);
            }
        }

        return $this;
    }

    public function getWeightPerUnity(): ?float
    {
        return $this->weightPerUnity;
    }

    public function setWeightPerUnity(?float $weightPerUnity): self
    {
        $this->weightPerUnity = $weightPerUnity;

        return $this;
    }

}
