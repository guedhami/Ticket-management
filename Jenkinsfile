pipeline {
    agent any

    triggers {
        pollSCM('H/5 * * * *') // Poll SCM every 5 minutes
    }

    environment {
        GIT_BRANCH = 'main'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub') // Jenkins credentials ID for Docker Hub
        IMAGE_NAME_BACKEND = 'hayder69/mern-backend' 
        IMAGE_NAME_FRONTEND = 'hayder69/mern-frontend' 
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo 'Starting Git checkout...'
                    git branch: "${GIT_BRANCH}",
                        url: 'https://github.com/guedhami/Ticket-management.git',
                        credentialsId: 'github' // Jenkins credentials ID for GitHub SSH key
                }
            }
        }

        stage('Build backend Image') {
            steps {
                script {
                    echo 'Building backend image...'
                    dir('backend') {
                        try {
                            dockerImageBackend = docker.build("${IMAGE_NAME_BACKEND}")
                        } catch (Exception e) {
                            error "Backend image build failed: ${e.message}"
                        }
                    }
                }
            }
        }

        stage('Build frontend Image') {
            steps {
                script {
                    echo 'Building frontend image...'
                    dir('frontend') {
                        try {
                            dockerImageFrontend = docker.build("${IMAGE_NAME_FRONTEND}")
                        } catch (Exception e) {
                            error "Frontend image build failed: ${e.message}"
                        }
                    }
                }
            }
        }

        stage('Scan backend Image') {
            steps {
                script {
                    echo 'Scanning backend image...'
                    sh """
                        docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                            aquasec/trivy:latest image --exit-code 1 \
                            --severity MEDIUM,HIGH,CRITICAL \
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
                        docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                            aquasec/trivy:latest image --exit-code 1 \
                            --severity MEDIUM,HIGH,CRITICAL \
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
                        dockerImageBackend.push('latest') // Push backend image with 'latest' tag
                        dockerImageFrontend.push('latest') // Push frontend image with 'latest' tag
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    echo 'Cleaning up unused Docker resources...'
                    sh 'docker system prune -f'
                }
            }
        }
    }
}
