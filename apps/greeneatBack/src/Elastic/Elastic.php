<?php

namespace App\Elastic;

//use Elastic\Elasticsearch\ClientBuilder;
//use Elastic\Elasticsearch\Client;
use Elasticsearch\Client;
use Elasticsearch\ClientBuilder;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Component\PropertyAccess\PropertyAccessorInterface;
use Symfony\Component\Yaml\Yaml;

class Elastic
{
    private ?Client $client = null;

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
        $this->getClient()
                ->indices()
                ->create($this->getIndexConfig($indexName));
    }

    private function getIndexConfig(string $indexName): array
    {
        return Yaml::parseFile($this->configDir.DIRECTORY_SEPARATOR.$indexName.'.yml');

    }

    private function getClient(): Client
    {
        if ($this->client) {
            return $this->client;
        }

        return $this->client = ClientBuilder::create()
            ->setHosts($this->elasticHosts)
            ->setSSLVerification(false)
            ->setBasicAuthentication('elastic', 'pass123')
            ->build();
    }
}