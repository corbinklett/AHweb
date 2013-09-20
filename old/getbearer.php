<?php
 
//This is all you need to configure.
$app_key = 'eLmKlFyr7PZ6aYk9Tv02Mg';
$app_token = 'GUyxrx9yoUlys1TGPhWb0yqjMjQjb5klsEA6zX1CHOM';
 
//These are our constants.
$api_base = 'https://api.twitter.com/';
$bearer_token_creds = base64_encode($app_key.':'.$app_token);
 
//Get a bearer token.
$opts = array(
  'http'=>array(
    'method' => 'POST',
    'header' => 'Authorization: Basic '.$bearer_token_creds."\r\n".
               'Content-Type: application/x-www-form-urlencoded;charset=UTF-8',
    'content' => 'grant_type=client_credentials'
  )
);
 
$context = stream_context_create($opts);
$json = file_get_contents($api_base.'oauth2/token',false,$context);
 
$result = json_decode($json,true);

echo $result['access_token'];