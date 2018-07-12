<?php

namespace App\Jobs;

use App\Models\Entities\DocumentUploaded;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Log;
use App\Services\ImageService;
use Symfony\Component\Process\Process;
use Illuminate\Support\Facades\Storage;

class ImageOptimaze implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var $document DocumentUploaded
     */
    protected $document;

    /**
     * Create a new job instance.
     *
     * @param DocumentUploaded $document
     */
    public function __construct(DocumentUploaded $document)
    {
        $this->document = $document;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Make Copy of original documents
        $copyPath = 'docs/'.basename($this->document->path);
        Storage::copy($this->document->path,$copyPath);
        $params = '-resize \'>1300\' -quality 90';
        $compress = true;
        $pdfNeed = false;

        $resultFullPath = $inputFullPath = Storage::disk('local')->path($copyPath);

        if (\Storage::mimeType($copyPath) == 'image/tiff')
            $deleteCopy = null;
        else
            $deleteCopy = $resultFullPath;

        if (!in_array(\Storage::mimeType($copyPath),['application/pdf','image/tiff'])){
            $copyPath = preg_replace('/((?:\.)(?!.*\.).*)/','.png',$copyPath);
            $resultFullPath = preg_replace('/((?:\.)(?!.*\.).*)/','.png',$inputFullPath);
            $pdfNeed = true;
            $deleteImage = $resultFullPath;
        }
        else if (Storage::size($copyPath) < 8485760)
            $compress = false;

        // Выполняем сжатие файлов если необходимо
        if ($compress)
            ImageService::compress($params,$inputFullPath,$resultFullPath);

        // Получаем pdf из изображений
        if ($pdfNeed){
            $copyPath = preg_replace('/((?:\.)(?!.*\.).*)/','.pdf',$copyPath);
            $resultFullPath = preg_replace('/((?:\.)(?!.*\.).*)/','.pdf',$inputFullPath);
            $deletePdf = $resultFullPath;
            ImageService::getPdf($inputFullPath,$resultFullPath);
        }


        $tiffPath = preg_replace('/((?:\.)(?!.*\.).*)/','.tiff',$copyPath);
        $tiffFullPath = Storage::path($tiffPath);

        if (\Storage::mimeType($copyPath) == 'application/pdf')
            $process = new Process("ghostscript -dNOPAUSE -dBATCH -sDEVICE=tiffg4 -r300x300 -sCompression=lzw -sOutputFile=$tiffFullPath $resultFullPath");
        else if (Storage::size($copyPath) > 5500000){
            $process = new Process("convert -compress lzw -resize 70% -scale 50% $resultFullPath $tiffFullPath");
        }
        else
            $process = new Process("convert $resultFullPath $tiffFullPath");

        $process->run();
        $process->wait();

        $this->document->converted_path = $tiffPath;
        $this->document->is_converted = true;
        $this->document->save();

        if (isset($deleteCopy))
            \File::delete($deleteCopy);
        if (isset($deleteImage) && \File::exists($deleteImage))
            \File::delete($deleteImage);
        if (isset($deletePdf) && \File::exists($deletePdf))
            \File::delete($deletePdf);

    }
}
