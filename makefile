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
APP_DIR = /app
CONTAINER_NAME := ${DOCKER_IMAGE}

# Build targets
build_docker_img:
	docker image build -t ${DOCKER_IMAGE}:${APP_VERSION} .

install_deps:
	docker container run \
										--rm \
										-v ${DIR}:${APP_DIR}:cached \
										${DOCKER_IMAGE}:${APP_VERSION} \
										/bin/sh -c "npm i && bower i"

install_all:
	make build_docker_img
	make install_deps

start_container:
	docker container run \
										--rm \
										--name ${CONTAINER_NAME} \
										-v ${DIR}:${APP_DIR}:cached \
										-p ${APP_PORT}:${APP_PORT} \
										-p ${LIVERELOAD_PORT}:${LIVERELOAD_PORT} \
										-p ${TEST_PORT}:${TEST_PORT} \
										-it \
										--env-file .env \
										${DOCKER_IMAGE}:${APP_VERSION} \
										/bin/sh

stop_container:
	docker stop ${CONTAINER_NAME}

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
	make install_deps

update_all:
	make clean_all
	make install_all

# Use this, if you have issues with inotify poisoning on linux systems
inotify_add_limit:
	echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
	sudo sysctl -p

# Ember Generate Wrapper
container_shell:
	docker exec -it ${CONTAINER_NAME} /bin/sh
