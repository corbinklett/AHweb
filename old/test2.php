<?php
//$url = "https://api.twitter.com/1.1/search/tweets.json?q=grace midtown";
//$url = "https://api.twitter.com/1.1/search/tweets.json?q=corbinklett";
//$url = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=corbinklett&count=2";
$url = "https://api.twitter.com/1.1/geo/id/8173485c72e78ca5.json";
echo twitterSearch($url);

function twitterSearch($url){
	$bearer_token = "AAAAAAAAAAAAAAAAAAAAANMJTQAAAAAAuNt8AxnJN1wEDA%2BUqITzPHdBQbA%3Dk6Cjf028a5BQgSz3v0VD3sWLxyt6BqxU6HVeFJDTeQ";
	
	$headers = array( 
		"GET ".$url." HTTP/1.1", 
		"Host: api.twitter.com", 
		"User-Agent: Atlanta Harvest v0.0.1",
		"Authorization: Bearer ".$bearer_token."",
	);

	$ch = curl_init($url);

	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

	$retreived = curl_exec($ch);
	curl_close($ch);

	return $retreived;
}

?>

