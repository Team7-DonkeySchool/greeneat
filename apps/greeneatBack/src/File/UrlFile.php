<?php

declare(strict_types=1);

namespace App\File;

use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class UrlFile extends UploadedFile
{
    public function __construct(string $url, string $mimeType = null, int $error = null, bool $test = false)
    {
        $fileName = tempnam(sys_get_temp_dir(), 'img-');
        $name = array_slice(explode('/', $url), -1)[0];
        $content = file_get_contents($url);

        if (!$content) {
            return;
        }

        $fp = fopen((string) $fileName, 'w');

        if (!$fp) {
            throw new \RuntimeException();
        }
        fputs($fp, $content);
        fclose($fp);

        parent::__construct((string) $fileName, $name, $mimeType, $error, $test);
    }

    public function move(string $directory, string $name = null): File
    {
        $target = $this->getTargetFile($directory, $name);

        set_error_handler(function (int $type, string $msg) use (&$error) {
            $error = $msg;

            return true;
        });

        try {
            $renamed = rename($this->getPathname(), (string) $target);
        } finally {
            restore_error_handler();
        }
        if (!$renamed) {
            throw new FileException(sprintf('Could not move the file "%s" to "%s" (%s).', $this->getPathname(), $target, strip_tags((string) $error)));
        }

        chmod((string) $target, 0666 & ~umask());

        return $target;
    }
}
