.PHONY : init clean update deploy

GIT_HASH := $(shell git rev-parse --short HEAD)
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
IMAGE_NAME := "codewarriorz/backend"

default:
	echo "default"

clean:
	echo "clean"

update:
	echo "update"

deploy:
	echo "deploy"

run-local: mongo
	node index

watch-local: mongo
	pm2 delete server-1 | true
	pm2 start index.js --watch --name=server-1

mongo:
	docker rm -f mongo | true
	docker run -p 27017:27017 --name mongo -d mongo
