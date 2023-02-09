<?php

declare(strict_types=1);

namespace App\Command;

use App\Elastic\Elastic;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'elastic:test',
    description: 'Pour tester elastic',
)]
class ElasticTestCommand extends Command
{
    public function __construct(private Elastic $elastic, private EntityManagerInterface $em)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this->addArgument('index_name', InputArgument::REQUIRED);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        try {
            $this->elastic->removeIndex($input->getArgument('index_name'));
        } catch (\Exception $e) {
        }
        $this->elastic->createIndex($input->getArgument('index_name'));

        $config = $this->elastic->getIndexConfig($input->getArgument('index_name'));
        $this->elastic->indexDocuments($this->em->getRepository($config['entity'])->findAll(), $input->getArgument('index_name'));

        return Command::SUCCESS;
    }
}
