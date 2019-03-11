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

# Build targets
build_docker_img:
	docker build -t ${DOCKER_IMAGE}:${DOCKER_IMAGE} .

install_project:
	docker run \
			--rm \
			-ti \
			-v ${DIR}:/app \
			-p ${SERVER_PORT}:${SERVER_PORT} \
			-p ${LIVERELOAD_PORT}:${LIVERELOAD_PORT} \
			-p ${TEST_PORT}:${TEST_PORT} \
			${DOCKER_IMAGE}:${DOCKER_IMAGE} \
			bash -c \
				"npm i && \
				bower i"

install_all:
	make build_docker_img
	make install_project

# Runtime targets
start_project:
	docker run \
			--rm \
			-ti \
			-v ${DIR}:/app \
			-p ${SERVER_PORT}:${SERVER_PORT} \
			-p ${LIVERELOAD_PORT}:${LIVERELOAD_PORT} \
			-p ${TEST_PORT}:${TEST_PORT} \
			${DOCKER_IMAGE}:${DOCKER_IMAGE} \
			bash -c \
				"ember server"

#Clean targets
clean_project:
	- rm -rf ${DIST_FOLDER} ${NODE_FOLDER} ${BOWER_FOLDER} ${TMP_FOLDER}

clean_docker_img:
	- docker image rm ${DOCKER_IMAGE}:${DOCKER_IMAGE}

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
	docker run --rm --privileged --user root ${DOCKER_IMAGE}:${DOCKER_IMAGE} sysctl -w fs.inotify.max_user_watches=524288
