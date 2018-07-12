<?php

namespace App\Http\Controllers\Api\V2;

use App\Models\Entities\NeededDocs;
use App\Models\Entities\DocumentTypes;
use App\Models\Entities\DocumentUploaded;
use App\Http\Controllers\Api\ApiController;
use App\Jobs\ImageOptimaze;
use App\Models\Entities\Order;
use App\Services\ImageService;
use App\Transformers\V1\DocNeedToUpload;
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
        $thumbPath = ImageService::makeThumb($path);
        $document = new DocumentUploaded();

        $document->order()->associate($order);
        $document->path = $path;
        $document->thumb_path = $thumbPath;
        $document->save();
        ImageOptimaze::dispatch($document);
        return app('Dingo\Api\Routing\UrlGenerator')
            ->version('v2')
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

        if ($this->guard()->user()->cant('using',$order))
            throw new AccessDeniedHttpException('Your can`t update not your order');


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

        if ($this->guard()->user()->cant('using',$order))
            throw new AccessDeniedHttpException('Your can`t delete not your order');

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
     * @param Order $order
     * @param DocumentUploaded $document
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function getThumb(Order $order, DocumentUploaded $document){
        if ($this->guard()->user()->cant('using',$order))
            throw new AccessDeniedHttpException('Your can`t view not your order');

        if (!($order == $document->order))
            throw new AccessDeniedException('You can view not your document');
        return response()->download(Storage::path($document->thumb_path));
    }

    /**
     * Check that order has specified document by id and return them
     * @param Order $order
     * @param DocumentUploaded $document
     * @throws NotFoundHttpException
     * @return DocumentUploaded
     */
    protected function getOrderDocument(Order $order, DocumentUploaded $document){
        if ($this->guard()->user()->cant('using',$order))
            throw new AccessDeniedHttpException('Your can`t view not your order');

        if (!($order == $document->order))
            throw new AccessDeniedException('You can view not your document');

        if (null == $document)
            throw new NotFoundHttpException('Document not found');

        if (!$document->is_converted)
            throw new NotFoundHttpException('Document generating, please wait');

        return response()->download(Storage::path($document->converted_path));
    }


    public function getNeededDocs(Order $order){
        if ($this->guard()->user()->cant('using',$order))
            throw new AccessDeniedHttpException('Your can`t use not your order');

        return $this->response()->collection(NeededDocs::getUploaded($order), new DocNeedToUpload());
    }
}
