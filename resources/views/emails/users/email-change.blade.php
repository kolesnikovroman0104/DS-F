<?php
/**
 * Created by PhpStorm.
 * User: darevski
 * Date: 18.11.17
 * Time: 15:41
 */
?>

<div>
    Email change confirmation code is - {{$user->activate_code}}
    Link to activate is http://ds.me/registration/email-change-confirm/?token={{$user->activate_code}}
</div>