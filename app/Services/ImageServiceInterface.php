<?php
/**
 * Created by PhpStorm.
 * User: darevski
 * Date: 19.01.18
 * Time: 0:59
 */

namespace App\Services;


interface ImageServiceInterface
{
    /**
     * Generating thumb for image
     * @param string $path
     * @param int $height
     * @param int $width
     * @return string return path to generated thumb (using laravel storage)
     */
    public static function makeThumb(string $path, int $height = 300, int $width = 0) : string;


    /**
     * Run compress of documents
     * @param string $params attributes for convert (imagick)
     * @param $inputPath
     * @param $resultPath
     * @return void
     */
    public static function compress($params, $inputPath, $resultPath);


    /**
     * Generate Pdf from image
     * @param $inputPath
     * @param $resultPath
     * @return mixed
     */
    public static function getPdf($inputPath,$resultPath);
}