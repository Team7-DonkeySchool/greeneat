
PHONY: help

help:
	@grep -E '^[a-zA-Z_-]+:.?## .$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	@npm install
	@ng add @ng-bootstrap/ng-bootstrap

start: ## Run the app
	@npm start

open: ## Open the app
	@open http://localhost:4200

run: ## Run the app
	make start && make open