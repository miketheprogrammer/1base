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

run-local: mongo influx grafana
	node index

watch-local: mongo influx grafana
	pm2 delete server-1 | true
	pm2 start index.js --watch --name=server-1

watch: watch-local

mongo:
	docker rm -f mongo | true
	docker run -p 27017:27017 --name mongo -d mongo

influx:
	docker rm -f influx | true
	docker run -p 8086:8086 \
			-p 2003:2003 \
      -v ${PWD}/.influx:/var/lib/influxdb \
			--name influx \
			-d \
      influxdb

grafana:
	docker rm -f grafana | true
	docker run -d -p 3002:3000 \
    -v ${PWD}/.grafana:/var/lib/grafana \
    -e "GF_SECURITY_ADMIN_PASSWORD=rainbowcrack" \
		--name grafana \
		-d \
    grafana/grafana
