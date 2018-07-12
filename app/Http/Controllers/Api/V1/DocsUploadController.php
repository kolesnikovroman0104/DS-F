<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Entities\DocumentTypes;
use App\Models\Entities\DocumentUploaded;
use App\Http\Controllers\Api\ApiController;
use App\Jobs\ImageOptimaze;
use App\Models\Entities\Order;
use \Dingo\Api\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DocsUploadController extends ApiController
{
    public function __construct()
    {
        $this->middleware('api.auth');
    }


    public function rules(){
        return [
            'order_id' => 'required|int|exists:orders,id',
        ];
    }

    /**
     * Upload document
     * @param Request $request
     * @return string
     */
    public function uploadDoc(Request $request){

        $this->validateDingo($request,$this->rules());

        $orderId = $request->input('order_id');
        $order = Order::find($orderId);

        if ($this->guard()->user()->cant('using',$order))
            throw new AccessDeniedHttpException('Your can`t update not your order');

        $path = $request->file('doc')->store('orig_docs');
        $thumbPath = $this->makeThumb($path);
        $document = new DocumentUploaded();

        $document->order()->associate($order);
        $document->path = $path;
        $document->thumb_path = $thumbPath;
        $document->save();
        ImageOptimaze::dispatch($document);
        return app('Dingo\Api\Routing\UrlGenerator')
            ->version('v1')
            ->route('doc.thumb',[
                'order_id' => $orderId,
                'doc_id' => $document->id
            ]);
    }

    /**
     * Set uploaded document type
     *
     * @param Request $request
     * @param Order $order
     * @return \Dingo\Api\Http\Response
     */
    public function updateDocumentType(Request $request, Order $order){
        $rules = [
            'type_id' => 'required|int|exists:document_types,id',
            'doc_id' => 'required|int|exists:documents_uploaded,id',
        ];

        $this->validateDingo($request,$rules);

        $typeId = $request->input('type_id');
        $docId = $request->input('doc_id');

        $document = $this->getOrderDocument($order,$docId);

        $type = DocumentTypes::find($typeId);
        if (null == $type)
            throw new NotFoundHttpException('Incorrect Type Of Document');

        $document->type()->associate($type);
        $document->save();

        return $this->response()->created();
    }

    /**
     * Delete document and document images
     *
     * @param Request $request
     * @param Order $order
     * @return \Dingo\Api\Http\Response
     */
    public function deleteDoc(Request $request, Order $order){
        $rules = [
            'doc_id' => 'required|int|exists:documents_uploaded,id',
        ];

        $this->validateDingo($request,$rules);

        $docId = $request->input('doc_id');

        $document = $this->getOrderDocument($order,$docId);

        Storage::delete($document->thumb_path);
        Storage::delete($document->path);

        $document->delete();

        return $this->response()->created();
    }

    /**
     * Return image thumb of uploaded document
     *
     * @param Request $request
     * @param Order $order
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function getThumb(Order $order, DocumentUploaded $document){
        if (!($order == $document->order))
            throw new AccessDeniedException('You can view not your document');
        return response()->download(Storage::path($document->thumb_path));
    }

    /**
     * Generating thumb for images by Imagick
     * @param string $path
     * @param int $height
     * @param int $width
     * @return string
     */
    protected function makeThumb(string $path, int $height = 300, int $width = 0) : string{
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
     * Check that order has specified document by id and return them
     * @param Order $order
     * @param $docId
     * @throws NotFoundHttpException
     * @return DocumentUploaded
     */
    protected function getOrderDocument(Order $order,$docId){
        if ($this->guard()->user()->cant('using',$order))
            throw new AccessDeniedHttpException('Your can`t update not your order');

        $document = $order->uploadedDocuments()->where('id',$docId)->first();

        if (null == $document)
            throw new NotFoundHttpException('Document not found');

        return $document;
    }
}
