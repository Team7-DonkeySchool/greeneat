<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\IngredientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: IngredientRepository::class)]
#[ApiResource]
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

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $season_from = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $season_to = null;

    #[ORM\OneToMany(mappedBy: 'ingredient', targetEntity: IngredientImage::class, orphanRemoval: true)]
    private Collection $ingredientImages;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $ecoscore = null;

    public function __construct()
    {
        $this->ingredientImages = new ArrayCollection();
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

    public function getSeasonFrom(): ?\DateTimeInterface
    {
        return $this->season_from;
    }

    public function setSeasonFrom(?\DateTimeInterface $season_from): self
    {
        $this->season_from = $season_from;

        return $this;
    }

    public function getSeasonTo(): ?\DateTimeInterface
    {
        return $this->season_to;
    }

    public function setSeasonTo(?\DateTimeInterface $season_to): self
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
}
