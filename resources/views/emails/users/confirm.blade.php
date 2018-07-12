<?php
/**
 * Created by PhpStorm.
 * User: darevski
 * Date: 18.11.17
 * Time: 2:54
 */
?>

<div>
    Dear User - {{$user->full_name}}
    User-confirmation-code is - {{$activate->code}}
    Link to activate is http://ds.me/registration/activate/?token={{$activate->code}}&id={{$user->id}}
</div>
