<?php

namespace App\Service;

use App\Elastic\Elastic;

class ElasticService
{
    public function __construct(private Elastic $elastic)
    {
    }

    public function getResults(string $name): array
    {
        $params = [
            'type' => 'ingredient',
            '_source' => false,
            'body' => [
                'query' => [
                    'multi_match' => [
                        'query' => $name,
                        'fuzziness' => 'AUTO'
                    ]
                ]
            ]
        ];

        $response = $this->elastic->getClient()->search($params);

        return $response;
    }
}