.PHONY: all
all: init lint build cover

.PHONY: github-ci
github-ci: init lint test

.PHONY: init
init:
	npm clean-install

.PHONY: format
format:
	./scripts/annotate-deprecated.bash
	./scripts/docs_format.sh
	npm run format

.PHONY: lock
lock:
	npm install --package-lock-only --lockfile-version 2

.PHONY: clean
clean:
	-rm -rf built dist node_modules coverage

.PHONY: build
build:
	npm run prepare

.PHONY: npm-test
npm-test:
	npm test

.PHONY: test
test: typecheck npm-test example snippets

.PHONY: typecheck
typecheck:
	npm run typecheck

.PHONY: cover
cover:
	npm run cover

.PHONY: lint
lint:
	npm run lint

.PHONY: update
update:
	npm run check-updates
	npm update --lockfile-version 2
	npm outdated || true
	npm install --package-lock-only --lockfile-version 2

.PHONY: check-git
check-git:
	git fetch --depth 1 origin
	git diff origin/main --exit-code

.PHONY: publish
publish: clean init test check-git
	npm publish

.PHONY: publish-docker
publish-docker: init test
	npm publish

.PHONY: example
example:
	./scripts/run_example.sh

.PHONY: snippets
snippets:
	chmod +x scripts/*
	./scripts/run_snippets.sh

.PHONY: insert-example
insert-example:
	./scripts/insert-example.bash

.PHONY: format-doc
format-doc:
	sed -i -e '$${/^$$/d;}' "README.md"

.PHONY: after-gen
after-gen: format lock insert-example format-doc
