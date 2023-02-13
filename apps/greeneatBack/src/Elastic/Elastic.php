<?php

namespace App\Elastic;

use Elasticsearch\Client as ElasticsearchClient;
use Elasticsearch\ClientBuilder as ElasticsearchClientBuilder;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\PropertyAccess\PropertyAccessorInterface;
use Symfony\Component\Yaml\Yaml;

class Elastic
{
    private ?ElasticsearchClient $client = null;

    public function __construct(
        private PropertyAccessorInterface $propertyAccessor,

        #[Autowire('%env(csv:ELASTIC_HOSTS)%')]
        private array $elasticHosts,

        #[Autowire('%kernel.project_dir%/config/elastic')]
        private string $configDir
    )
    {
    }

    public function indexDocuments(array $entities, string $indexName)
    {
        $config = $this->getIndexConfig($indexName);
        $properties = array_keys($config['body']['mappings']['properties']);

        foreach ($entities as $entity) {
            $body = [];

            foreach ($properties as $property) {
                $body[$property] = $this->propertyAccessor->getValue($entity, $property);
            }

            $this->getClient()->index([
                'index' => $config['index'],
                'id'    => $entity->getId(),
                'body'  => $body,
            ]);
        }
    }

    public function removeIndex(string $indexName)
    {
        $this->getClient()
                ->indices()
                ->delete([
                    'index' => $this->getIndexConfig($indexName)['index']
                ]);
    }

    public function createIndex(string $indexName)
    {
        $config = $this->getIndexConfig($indexName);
        unset($config['entity']);

        $this->getClient()
                ->indices()
                ->create($config);
    }

    public function getIndexConfig(string $indexName): array
    {
        return Yaml::parseFile($this->configDir.DIRECTORY_SEPARATOR.$indexName.'.yml');

    }

    public function getClient(): ElasticsearchClient
    {
        if ($this->client) {
            return $this->client;
        }

        return $this->client = ElasticsearchClientBuilder::create()
            ->setHosts($this->elasticHosts)
            ->setSSLVerification(false)
            ->setBasicAuthentication('elastic', 'pass123')
            ->build();
    }
}