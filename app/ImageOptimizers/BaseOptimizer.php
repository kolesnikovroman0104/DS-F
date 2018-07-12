<?php

namespace App\ImageOptimizers;

use Spatie\ImageOptimizer\Image;
use Spatie\ImageOptimizer\Optimizer;

abstract class BaseOptimizer implements Optimizer
{
    public $mimes = ['image/png','image/bmp','image/jpeg'];

    public $options = [];

    public $imagePath = '';

    public function __construct($options = [])
    {
        $this->setOptions($options);
    }

    public function binaryName(): string
    {
        return $this->binaryName;
    }

    public function setImagePath(string $imagePath)
    {
        $this->imagePath = $imagePath;

        return $this;
    }

    public function setOptions(array $options = [])
    {
        $this->options = $options;

        return $this;
    }

    public function getCommand(): string
    {
        $optionString = implode(' ', $this->options);

        return "\"{$this->binaryName}\" {$optionString} ".escapeshellarg($this->imagePath);
    }

    public function canHandle(Image $image): bool
    {
        return (in_array($image->mime(),$this->mimes));
    }
}
