<?php

namespace App\Jobs;

use App\Models\Entities\DocumentGenerated;
use App\Models\Entities\NeededDocs;
use App\Models\Entities\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Symfony\Component\Process\Process;
use Illuminate\Support\Facades\Storage;

class DocumentGenerate implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var $document DocumentGenerated
     */
    protected $document;

    protected $order;

    /**
     * Create a new job instance.
     *
     * @param NeededDocs $document
     * @param Order $order
     */
    public function __construct(Order $order, NeededDocs $document)
    {
        $this->order = $order;
        $this->document = $document;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $modelPath = $this->document->model->path;

        $name = $this->order->id.'_'.$this->document->id.'_'.str_random();
        $copyPath = 'generating/'.$name.'.html';

        $copyFullPath = Storage::path($copyPath);


        $result = $this->bladeHandler($modelPath);
        $md5Path = $this->createMd5Path($result).'.pdf';

        $resultFullPath = Storage::path($md5Path);

        Storage::put($copyPath,$result);

        $process = new Process("xvfb-run -a wkhtmltopdf $copyFullPath $resultFullPath");
        $process->run();
        $process->wait();

        Storage::delete($copyPath);
        $genDoc = new DocumentGenerated();
        $genDoc->type_id = $this->document->type_id;
        $genDoc->order_id = $this->order->id;
        $genDoc->path = $md5Path;
        $genDoc->save();
    }


    /**
     * @param $content
     * @return string
     */
    protected function createMd5Path($content, $prefix = 'models/generated/'){
        $md5Name = md5($content);
        $result = '';
        for ($i = 0; $i < 3; $i++) {
            $result.= substr($md5Name, 0, 2).'/';
            $md5Name = substr($md5Name,3);
        }

        Storage::makeDirectory($prefix.$result);

        return $prefix.$result.$md5Name;
    }

    /**
     * @param $bladePath
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    protected function bladeHandler($bladePath){
        $template = Storage::get($bladePath);
        return view(['template'=> $template] , ['order' => $this->order]);
    }
}
