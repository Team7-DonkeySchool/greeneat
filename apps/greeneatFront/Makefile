
PHONY: help

help:
	@grep -E '^[a-zA-Z_-]+:.?## .$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	@npm install
	@ng add @ng-bootstrap/ng-bootstrap
	@npm install localstorage-polyfill

start: ## Run the app
	@npm run dev:ssr

open: ## Open the app
	@ng serve --o
