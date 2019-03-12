# Environment variables to set
DOCKER_IMAGE=jefe
APP_VERSION=1.0-dev
DIST_FOLDER=dist
NODE_FOLDER=node_modules
BOWER_FOLDER=bower_components
TMP_FOLDER=tmp
APP_PORT=4200
LIVERELOAD_PORT=7020
TEST_PORT=7357
DIR := ${CURDIR}
CONTAINER_NAME := ${DOCKER_IMAGE}

# Build targets
build_docker_img:
	docker image build -t ${DOCKER_IMAGE}:${APP_VERSION} .

install_project:
	docker container run \
										 --rm \
										 -v ${DIR}:/app \
										 ${DOCKER_IMAGE}:${APP_VERSION} \
										 /bin/sh -c "npm i && bower i"

install_all:
	make build_docker_img
	make install_project

# Runtime targets
start_project:
	docker container run \
										 --rm \
										 --name ${CONTAINER_NAME} \
										 -v ${DIR}:/app \
										 -p ${APP_PORT}:${APP_PORT} \
										 -p ${LIVERELOAD_PORT}:${LIVERELOAD_PORT} \
										 -p ${TEST_PORT}:${TEST_PORT} \
										 ${DOCKER_IMAGE}:${APP_VERSION}

#Clean targets
clean_project:
	- rm -rf ${DIST_FOLDER} ${NODE_FOLDER} ${BOWER_FOLDER} ${TMP_FOLDER}

clean_docker_img:
	- docker image rm ${DOCKER_IMAGE}:${APP_VERSION}

clean_all:
	make clean_project
	make clean_docker_img

# Update Targets
update_docker_img:
	make clean_docker_img
	make build_docker_img

update_project:
	make clean_project
	make install_project

update_all:
	make clean_all
	make install_all

# Use this, if you have issues with inotify poisoning
inotify_patch:
	docker container exec \
										 --privileged \
										 --user root \
										 ${CONTAINER_NAME} \
										 sysctl -w fs.inotify.max_user_watches=524288

run_bash:
		docker container run \
										 --rm \
										 --privileged \
										 -t \
										 -i \
										 -v ${DIR}:/app \
										 ${DOCKER_IMAGE}:${APP_VERSION} \
										 /bin/bash

run_bash_root:
		docker container run \
										 --rm \
										 --privileged \
										 --user root \
										 -t \
										 -i \
										 -v ${DIR}:/app \
										 ${DOCKER_IMAGE}:${APP_VERSION} \
										 /bin/bash