
all:
	@make npm
	@make test

npm:
	@npm install

test:
	@( [ -d node_modules ] || make npm )
	@( node_modules/mocha/bin/mocha ./tests/*.js )

.PHONY:	npm
.PHONY:	test
.PHONY:	jshit
.PHONY:	watch
