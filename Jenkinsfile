pipeline {
    agent any

    triggers {
        pollSCM('H/5 * * * *') // Poll SCM every 5 minutes
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub') // Jenkins credentials ID for Docker Hub
        IMAGE_NAME_BACKEND = '[hayder69]/mern-backend' 
        IMAGE_NAME_FRONTEND = '[hayder69]/mern-frontend' 
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo 'Starting Git checkout...'
                    git branch: 'main',
                        url: 'git@github.com:guedhami/Ticket-management.git',
                        credentialsId: 'github' // Jenkins credentials ID for GitLab SSH key
                }
            }
        }

        stage('Build backend Image') {
            steps {
                script {
                    echo 'Building backend image...'
                    dir('backend') {
                        dockerImageBackend = docker.build("${IMAGE_NAME_BACKEND}")
                    }
                }
            }
        }

        stage('Build frontend Image') {
            steps {
                script {
                    echo 'Building frontend image...'
                    dir('frontend') {
                        dockerImageFrontend = docker.build("${IMAGE_NAME_FRONTEND}")
                    }
                }
            }
        }

        stage('Scan backend Image') {
            steps {
                script {
                    echo 'Scanning backend image...'
                    sh """
                        docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \\
                            aquasec/trivy:latest image --exit-code 0 \\
                            --severity LOW,MEDIUM,HIGH,CRITICAL \\
                            ${IMAGE_NAME_BACKEND}
                    """
                }
            }
        }

        stage('Scan frontend Image') {
            steps {
                script {
                    echo 'Scanning frontend image...'
                    sh """
                        docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \\
                            aquasec/trivy:latest image --exit-code 0 \\
                            --severity LOW,MEDIUM,HIGH,CRITICAL \\
                            ${IMAGE_NAME_FRONTEND}
                    """
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    echo 'Pushing images to Docker Hub...'
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh "docker login -u ${USERNAME} -p ${PASSWORD}"
                        dockerImageServer.push('latest') // Push server image with 'latest' tag
                        dockerImageClient.push('latest') // Push client image with 'latest' tag
                    }
                }
            }
        }
    }
}

