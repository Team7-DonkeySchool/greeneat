PHONY: help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install the project
	symfony composer install
	symfony console doctrine:database:create
	make rebuild

rebuild: ## Rebuild the project
	symfony console doctrine:database:drop -f
	symfony console doctrine:database:create
	symfony console doctrine:schema:update -f
	symfony console doctrine:fixtures:load -n

start: ## Start the project
	symfony server:start

open: ## Open the project
	symfony open:local
