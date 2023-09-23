# Docker

# Installation

[you can get it here](https://docs.docker.com/get-docker/).

or

[**Docker For MacOS**](https://docs.docker.com/docker-for-mac/install/)

You can down click on to the following link to download **Docker** .dmg file for MacOS

## Docker Desktop for Mac - Docker Hub

### The fastest and easiest way to get started with Docker on Mac

hub.docker.com

[**VirtualBox**](https://github.com/docker/kitematic/blob/master/README.md)

Before installation of **Kitematic** make sure to install **VirtualBox**.

You can download **Virtualbox** installation file from the following link

## Downloads - Oracle VM VirtualBox

### Here you will find links to VirtualBox binaries and its source code. By downloading, you agree to the terms and…

www.virtualbox.org

[Kitematic](https://github.com/docker/kitematic/blob/master/README.md)

You can download **Kitematic** installation file from the following link

## docker/kitematic

### Visual Docker Container Management on Mac & Windows - docker/kitematic

github.com

# Commands

## **docker –version**

This command is used to get the currently installed version of docker

![Docker_Version - Docker Commands - Edureka](https://www.edureka.co/blog/wp-content/uploads/2017/11/Docker_Version-Docker-Commands-Edureka-3-e1510653973130.png)

 

## **docker pull**

**Usage: docker pull <image name>**

This command is used to pull images from the **docker repository**(hub.docker.com)

![Docker_Pull - Docker Commands - Edureka](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2017/11/Docker_Pull-Docker-Commands-Edureka-2-e1510653950923.png)

## **docker run**

**Usage: docker run -it -d <image name>**

This command is used to create a container from an image

![docker_run - Docker Commands - Edureka](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2017/11/docker_run-Docker-Commands-Edureka-e1510653910376.png)

## **docker ps**

This command is used to list the running containers

![docker_ps - Docker Commands - Edureka](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2017/11/docker_ps-Docker-Commands-Edureka-e1510653881541.png)

## **docker ps -a**

This command is used to show all the running and exited containers

![docker_psa - Docker Commands - Edureka](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2017/11/docker_psa-Docker-Commands-Edureka-e1510653854892.png)

## **docker exec**

**Usage: docker exec -it <container id> bash**

This command is used to access the running container

![docker_exec - Docker Commands - Edureka](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2017/11/docker_exec-Docker-Commands-Edureka-e1510653829237.png)

## **docker stop**

**Usage: docker stop <container id>**

This command stops a running container

![docker_stop - Docker Commands - Edureka](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2017/11/docker_stop-Docker-Commands-Edureka-e1510653793521.png)

## **docker kill**

**Usage: docker kill <container id>**

This command kills the container by stopping its execution immediately. The difference between ‘docker kill’ and ‘docker stop’ is that ‘docker stop’ gives the container time to shutdown gracefully, in situations when it is taking too much time for getting the container to stop, one can opt to kill it

![docker_kill - Docker Commands - Edureka](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2017/11/docker_kill-Docker-Commands-Edureka-e1510653772661.png)

## **docker commit**

**Usage: docker commit <conatainer id> <username/imagename>**

This command creates a new image of an edited container on the local system

![docker_commit - Docker Commands - Edureka](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2017/11/docker_commit-Docker-Commands-Edureka-e1510653734760.png)

## **docker login**

This command is used to login to the docker hub repository

![docker_login - Docker Commands - Edureka](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2017/11/docker_login-Docker-Commands-Edureka-1-e1510653706645.png)

## **docker push**

**Usage: docker push <username/image name>**

This command is used to push an image to the docker hub repository

![docker_push - Docker Commands - Edureka](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2017/11/docker_push-Docker-Commands-Edureka-e1510653678749.png)

## **docker images**

This command lists all the locally stored docker images

![docker_images - Docker Commands - Edureka](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2017/11/docker_images-Docker-Commands-Edureka-e1510653647888.png)

## **docker rm**

**Usage: docker rm <container id>**

This command is used to delete a stopped container

![docker_rm - Docker Commands - Edureka](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2017/11/docker_rm-Docker-Commands-Edureka-e1510653622699.png)

## **docker rmi**

**Usage: docker rmi <image-id>**

This command is used to delete an image from local storage

![docker_rmi - Docker Commands - Edureka](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2017/11/docker_rmi-Docker-Commands-Edureka-e1510653592230.png)

## **docker build**

**Usage: docker build <path to docker file>**

This command is used to build an image from a specified docker file

![docker_build - Docker Commands - Edureka](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2017/11/docker_built-Docker-Commands-Edureka-e1510653559161.png)

## **Docker copy**

**Usage: COPY <source_file> <destination_directory>**

This command copies files or directories from the host machine’s file system to the container’s file system during Docker image construction.

## **Docker history**

**Usage: docker history <image_name>**

Using this command, you may examine the evolution of a Docker image or its constituent parts.

## **Docker Logout** 

**Usage: docker logout [REGISTRY_URL]**

This command is used to log out or remove the credentials used to authenticate with a Docker registry. 

## **Docker logs**

**Usage: docker logout [REGISTRY_URL]**

This command is used to log out of a Docker registry or to delete the credentials used to login with it. 

## **Docker network**

**Usage: docker network create <network_name>**

This command manages Docker networks. Docker networks enable containers to connect securely and isolatedly with one another and with external network resources.

## **Docker restart**

**Usage: docker restart [OPTIONS] CONTAINER [CONTAINER…]**

This command is used to restart one or more Docker containers that are currently operating. Restarting a container entails gently pausing it and then restarting it with the same configuration and parameters. 

## **Docker search**

**Usage: docker search [OPTIONS] TERM**

![Course Curriculum](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/themes/edu-new/img/batch-schedule.png)

This command searches for Docker images on Docker Hub, a public registry for Docker images.

## **Docker volume**

**Usage: docker volume create my_volume**

This command creates a new Docker volume named “my_volume” in the Docker container. Volumes in Docker are generated independently of containers.

Want to learn more about docker commands? Here is a **[Docker Tutorial](https://www.edureka.co/blog/docker-tutorial)** to get you started. Alternatively, you can take a top down approach and start with this **[Devops Tutorial.](https://www.edureka.co/blog/devops-tutorial)**

*Now that you have understood what is DevOps, check out our* ***[DevOps Certification Training](https://www.edureka.co/devops/)** by Edureka, a trusted online learning company with a network of more than 250,000 satisfied learners spread across the globe. The Edureka DevOps Certification Training course helps learners gain expertise in various DevOps processes and tools such as Puppet, Jenkins, Nagios, Ansible, Chef, Saltstack and GIT for automating multiple steps in SDLC.*

*Got a question for us? Please mention it in the comments section and we will get back to you.*

# Q&A

## How to install docker on Mac command line?

Use Homebrew to install the Docker engine by running the following command: **brew install docker**. After Docker is installed, start the Docker engine by running the following command: sudo systemctl start docker. Verify that Docker is running correctly by running the following command: sudo docker run hello-world.May 3, 2023