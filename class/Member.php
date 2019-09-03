<?php
namespace Phppot;

class Member
{

    private $host = "http://localhost:5000/";

    function __construct()
    {
        // $host_url = ';
    }

    function getBucketList() {

        $url = $this->host.'bucketlists/';
        $ch = curl_init($url);
        $headr = array();
        $headr[] = 'Content-type: application/json';
        $headr[] = 'Authorization: Bearer '.$_SESSION["access_token"];
        curl_setopt($ch, CURLOPT_HTTPHEADER,$headr);
        // curl_setopt($ch,CURLOPT_HEADER,TRUE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //Return data instead printing directly in Browser
        $result = json_decode(curl_exec($ch));
        curl_close($ch);
        return $result;
    }
    
    public function processLogin($email, $password) {
        
        $url = $this->host.'auth/login';
        //create a new cURL resource
        $ch = curl_init($url);
        $data = array(
            'email' => $email,
            'password' => $password
        );
        $payload = json_encode($data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
         
        // Set HTTP Header for POST request 
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($payload))
        );
         
        // Submit the POST request
        $response = json_decode(curl_exec($ch));
        // json_decode($response));
        if (! isset($response->access_token)) {
            $result['error'] = true;
            $result['errorMessage'] = $response->message;
            return $result;
        }
        $_SESSION['access_token'] = $response->access_token;
        $result['error'] = false;
        curl_close($ch);
        return $result;
    }

    public function processRegistration($email, $password) {
        $url = $this->host.'auth/register';
        //create a new cURL resource
        $ch = curl_init($url);
        $data = array(
            'email' => $email,
            'password' => $password
        );
        $payload = json_encode($data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
         
        // Set HTTP Header for POST request 
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($payload))
        );
         
        // Submit the POST request
        $response = json_decode(curl_exec($ch));
        curl_close($ch);
        return $response->message;
    }
}