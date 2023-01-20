<?php

namespace App\Repository;

use App\Entity\IngredientImage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<IngredientImage>
 *
 * @method IngredientImage|null find($id, $lockMode = null, $lockVersion = null)
 * @method IngredientImage|null findOneBy(array $criteria, array $orderBy = null)
 * @method IngredientImage[]    findAll()
 * @method IngredientImage[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class IngredientImageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, IngredientImage::class);
    }

    public function save(IngredientImage $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(IngredientImage $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return IngredientImage[] Returns an array of IngredientImage objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('i.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?IngredientImage
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
