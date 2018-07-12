<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Symfony\Component\Process\Process;
use App\ImageOptimizers\Jpegoptim;
use App\ImageOptimizers\Optipng;
use App\ImageOptimizers\Pngquant;
use Spatie\ImageOptimizer\OptimizerChain;

/**
 * Created by PhpStorm.
 * User: darevski
 * Date: 19.01.18
 * Time: 0:57
 * TODO: вынести параметры в отдельный конфиг
 */
class ImageService implements ImageServiceInterface
{
    /**
     * @inheritdoc
     */
    public static function makeThumb(string $path, int $height = 300, int $width = 0) : string{
        $fullPath = Storage::path($path);

        $thumb = 'thumb/'.preg_replace('/((?:\.)(?!.*\.).*)/','_thumb.png',basename($path));
        $thumbPath = Storage::path($thumb);

        $imagick = new \Imagick();

        if ('application/pdf'==\File::mimeType($fullPath)){
            $fullPath = $fullPath.'[0]';
        }

        $imagick->readImage($fullPath);
        $imagick->thumbnailImage($height,$width);
        $imagick->writeImage($thumbPath);

        $imagick->clear();
        return $thumb;
    }

    /**
     * @inheritdoc
     */
    public static function compress($params, $inputPath, $resultPath){
        // TODO : сделать конфиг параметров для ресайза
        $process = new Process("convert $params $inputPath $resultPath");
        $process->run();
        $process->wait();
        // TODO: Write exception for failed images
        if ($process->isSuccessful()){

            $optimizeChain = (new OptimizerChain)
                ->addOptimizer(
                    new Pngquant([
                        '--force'
                    ])
                )->addOptimizer(
                    new Optipng([
                        '-i0',
                        '-o3',
                        '-quiet',
                    ])
                )->addOptimizer(
                    new Jpegoptim([
                        '-m85',
                        '--strip-all',
                        '--all-progressive',
                    ])
                );
            $optimizeChain->optimize($resultPath);

        }
        unset($process);
    }

    /**
     * @inheritdoc
     */
    public static function getPdf($inputPath,$resultPath){
        $process = new Process("convert -resize 2500 -page 2478x3507 $inputPath $resultPath");
        $process->run();
        $process->wait();
    }

}