<?php

use GuzzleHttp\Client;

class ApiClient
{
    private $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    public function getData(string $url): array
    {
        $response = $this->client->get($url);
        $data = json_decode($response->getBody(), true);

        return $data;
    }
}