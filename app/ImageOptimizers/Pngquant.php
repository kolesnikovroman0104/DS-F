<?php

namespace App\ImageOptimizers;

use Spatie\ImageOptimizer\Image;

class Pngquant extends BaseOptimizer
{
    public $mimes = ['image/png'];

    public $binaryName = 'pngquant';

    public function getCommand(): string
    {
        $optionString = implode(' ', $this->options);

        return "{$this->binaryName} {$optionString}"
            .' '.escapeshellarg($this->imagePath)
            .' --output='.escapeshellarg($this->imagePath);
    }
}
