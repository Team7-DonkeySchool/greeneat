
PHONY: help

help:
	@grep -E '^[a-zA-Z_-]+:.?## .$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install:## Install the project
	cd ./apps/greeneatBack && make install
	cd ./apps/greeneatFront && make install

rebuild: ## Rebuild the project
	cd ./apps/greeneatBack && make rebuild

start: ## Start the project
	cd ./apps/greeneatBack && make start
	cd ./apps/greeneatFront && make start

open: ## Open the project
	cd ./apps/greeneatBack && make open
	cd ./apps/greeneatFront && make open