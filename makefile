# Environment variables to set
DOCKER_IMAGE=jefe-dev
DIST_FOLDER=dist
NODE_FOLDER=node_modules
BOWER_FOLDER=bower_components
TMP_FOLDER=tmp
SERVER_PORT=4200
LIVERELOAD_PORT=7020
TEST_PORT=7357
DIR := ${CURDIR}

build_dev:
	docker build -t ${DOCKER_IMAGE}:${DOCKER_IMAGE} .

install_deps:
	docker run \
			--rm \
			-ti \
			-v ${DIR}:/app \
			-p ${SERVER_PORT}:${SERVER_PORT} \
			-p ${LIVERELOAD_PORT}:${LIVERELOAD_PORT} \
			-p ${TEST_PORT}:${TEST_PORT} \
			${DOCKER_IMAGE} \
			bash -c \
				"npm i && \
				bower i"

start_dev:
	docker run \
			--rm \
			-ti \
			-v ${DIR}:/app \
			-p ${SERVER_PORT}:${SERVER_PORT} \
			-p ${LIVERELOAD_PORT}:${LIVERELOAD_PORT} \
			-p ${TEST_PORT}:${TEST_PORT} \
			${DOCKER_IMAGE} \
			bash -c \
				"ember server"

clean:
	rm -rf ${DIST_FOLDER} ${NODE_FOLDER} ${BOWER_FOLDER} ${TMP_FOLDER}

inotify_patch:
	docker run --rm --privileged ${DOCKER_IMAGE} sysctl -w fs.inotify.max_user_watches=524288

install_all:
	make build_dev
	make install_deps

update_all:
	make clean
	make install_all
