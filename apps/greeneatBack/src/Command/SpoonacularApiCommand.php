<?php

namespace App\Command;

use App\Entity\Ingredient;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[AsCommand(
    name: 'spoonacular:get',
    description: 'recording in database spoonacular recipes'
)]
class SpoonacularApiCommand extends Command
{
    public function __construct(private HttpClientInterface $client)
    {
        parent::__construct();
    }

    private function fetchSpoonacularRecipes(): array
    {
        $response = $this->client->request(
            'GET',
            'https://api.spoonacular.com/recipes/9/information?apiKey=dbfb5a18aa1949a78c5aa7bb02494fd9',
        );

        $statusCode = $response->getStatusCode();
        // $statusCode = 200
        $contentType = $response->getHeaders()['content-type'][0];
        // $contentType = 'application/json'
        $content = $response->getContent();
        // $content = '{"id":521583, "name":"symfony-docs", ...}'
        $content = $response->toArray();
        // $content = ['id' => 521583, 'name' => 'symfony-docs', ...]

        return $content;
    }

    protected function configure(): void
    {

    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        dd($this->fetchSpoonacularRecipes());
        return Command::SUCCESS;
    }
}