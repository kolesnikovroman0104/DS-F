<?php

namespace App\Models\Entities;

use App\Models\Entities\Logs\TransactionLog;
use App\Models\IndexConfigurators\InfoIndexConfigurator;
use \Cartalyst\Sentinel\Users\EloquentUser as EloquentUser;
use Illuminate\Auth\Authenticatable;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use League\Flysystem\Exception;
use ScoutElastic\Searchable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Carbon\Carbon;

/**
 * Class User
 *
 * Особое внимение на интерфейсы, была проблема с JWT/Sentinel, смотреть интерфейсы
 * @see \Illuminate\Foundation\Auth\User
 * Для адекватной работы необходим @see \Illuminate\Contracts\Auth\Authenticatable
 * Остальные необходимо проверить по ходу разработки
 *
 * @package App
 */
class User extends EloquentUser implements JWTSubject, AuthenticatableContract
{

    use Authenticatable,Authorizable,Searchable;

    protected $indexConfigurator = InfoIndexConfigurator::class;

    protected $searchRules = [
        //
    ];

    protected $mapping = [
        'properties' => [
            'id' => [
                'type' => 'integer',
                'index' => 'true',
            ],
            'first_name' => [
                'type' => 'text',
                'analyzer' => 'russian',
            ],
            'last_name' => [
                'type' => 'text',
                'analyzer' => 'russian',
            ],
            'email' => [
                'type' => 'keyword',
            ],
            'corporate.email_fns' => [
                'type' => 'keyword',
            ],
            'company_name' => [
                'type' => 'text',
            ],

        ]
    ];


    /**
     * Get the indexable data array for the model.
     *
     * @return array
     */
    public function toSearchableArray(){
        $array = $this->load('corporate')->toArray();
        \Log::debug($array);
        return $array;
    }

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    /**
     * User constructor.
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        $this->setRawAttributes([
            'password_updated_at' => Carbon::now(),
        ], true);

        parent::__construct($attributes);
    }

    public function getJWTCustomClaims()
    {
        // TODO: Implement getJWTCustomClaims() method.
        return [];
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getFullNameAttribute(){
        return $this->first_name.' '.$this->last_name;
    }

    public function corporate(){
        return $this->belongsTo('App\Models\Entities\Corporation','corp_id');
    }

    public function orders(){
        return $this->hasMany('App\Models\Entities\Order');
    }

    /** Get All user permissions */
    public function getAllPermissions()
    {
        $permissions = $this->permissions;

        $roles = $this->roles;

        foreach ($roles as $role){
            $permissions = array_replace($role->permissions,$permissions);
        }

        return $permissions;
    }



    public function increaseBalance($amount, $comment){
        try{
            DB::beginTransaction();
            $corporate = $this->corporate()->lockForUpdate()->first();

            $corporate->balance = $corporate->balance + $amount;
            $corporate->save();
            DB::commit();

            $log = new TransactionLog();

            $log->from()->associate(Auth::user());
            $log->to()->associate($this);
            $log->amount = $amount;
            $log->comment = $comment;

            $log->save();
            return true;
        }
        catch (Exception $e){
            DB::rollBack();
            throw $e;
        }
    }

    public function getMainAccount(){
        if ($this->isMainCorp)
            return $this;
        else
            return User::where('corp_id',$this->corp_id)->where('is_main_corp',true);
    }
}
