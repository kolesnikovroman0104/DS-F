<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class CheckTokenForReset
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try{
            if ($user = Auth::guard()->user()){
                $iat = Auth::guard()->getPayLoad()->get('iat');
                if ($iat <= (Carbon::parse($user->password_updated_at)->timestamp + config('jwt.delay_to_blacklisting'))){
                    Auth::guard()->invalidate(Auth::guard()->getToken());
                    throw new TokenExpiredException('Password has been updated');
                }
            }
        }
        catch (JWTException $e){
           // something gonna wrong
        }

        return $next($request);
    }
}
