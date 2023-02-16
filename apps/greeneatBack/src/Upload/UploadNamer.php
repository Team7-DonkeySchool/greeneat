<?php

namespace Vich\UploaderBundle\Naming;

use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Vich\UploaderBundle\FileAbstraction\ReplacingFile;
use Vich\UploaderBundle\Mapping\PropertyMapping;
use Vich\UploaderBundle\Util\Transliterator;

/**
 * UploadNamer.
 *
 * @author Ivan Borzenkov <ivan.borzenkov@gmail.com>
 */
final class UploadNamer implements NamerInterface, ConfigurableInterface
{
    private bool $transliterate = false;

    public function __construct(private readonly Transliterator $transliterator, private LoggerInterface $logger)
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

        //récupérer recipe
        
        //récupérer name de recipe

        // $name = $file->getClientOriginalName();
        $name = $file->getClientOriginalName();

        $this->logger->info('test',[
            'file'=> $file,
        ]);
        if ($this->transliterate) {
            $name = $this->transliterator->transliterate($name);
        }

        return \uniqid().'_'.$name;
    }
}
