<?php

namespace App\Upload;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Vich\UploaderBundle\FileAbstraction\ReplacingFile;
use Vich\UploaderBundle\Mapping\PropertyMapping;
use Vich\UploaderBundle\Naming\NamerInterface;
use Vich\UploaderBundle\Util\Transliterator;

/**
 * UploadNamer.
 *
 * @author Ivan Borzenkov <ivan.borzenkov@gmail.com>
 */
final class UploadNamer implements NamerInterface
{
    private bool $transliterate = false;

    public function __construct(private readonly Transliterator $transliterator)

    {
    }

    /**
     * @param array $options Options for this namer. The following options are accepted:
     *                       - transliterate: whether the filename should be transliterated or not
     */
    public function configure(array $options): void
    {
        $this->transliterate = isset($options['transliterate']) ? (bool) $options['transliterate'] : $this->transliterate;
    }

    public function name(object $object, PropertyMapping $mapping): string
    {
        /* @var $file UploadedFile|ReplacingFile */
        $file = $mapping->getFile($object);

        $name = $this->generateCleanedName($object->getRecipe()->getName());
        $name = $name . '-' . $file->getClientOriginalName();

        return $name;
    }

    private function generateCleanedName(string $string) {
        $string = str_replace(' ','-',$string);
        $string = str_replace(',','',$string);
        $string = strtolower($string);

        return $string;
    }
}
