<?php

$url = "https://api.twitter.com/1.1/search/tweets.json"; // base url
//$url = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2"
$query = "atlharvest"; //search for this word
echo twitterSearch($url, $query, '3');

function twitterSearch($url, $query, $count='15', $result_type='mixed'){
	$bearer_token = "AAAAAAAAAAAAAAAAAAAAANMJTQAAAAAAuNt8AxnJN1wEDA%2BUqITzPHdBQbA%3Dk6Cjf028a5BQgSz3v0VD3sWLxyt6BqxU6HVeFJDTeQ";
	$q = urlencode(trim($query)); // query term
	$formed_url ='?q='.$q; // fully formed url
	if($result_type!='mixed'){$formed_url = $formed_url.'&result_type='.$result_type;} // result type - mixed(default), recent, popular
	if($count!='15'){$formed_url = $formed_url.'&count='.$count;} // results per page - defaulted to 15
	$formed_url = $formed_url.'&include_entities=true'; // makes sure the entities are included, note @mentions are not included see documentation

	$headers = array( 
		"GET /1.1/search/tweets.json".$formed_url." HTTP/1.1", 
		"Host: api.twitter.com", 
		"User-Agent: Atlanta Harvest v0.0.1",
		"Authorization: Bearer ".$bearer_token."",
	);

	$ch = curl_init($url . $formed_url);

	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

	$retreived = curl_exec($ch);
	curl_close($ch);

	return $retreived;
}

?>

