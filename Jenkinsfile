pipeline {
    agent any

    environment {
        GITLAB_REPOSITORY_URL = credentials('GITLAB_REPOSITORY_URL')
        DOCKERHUB_USERNAME = credentials('DOCKERHUB_USERNAME')
        DOCKERHUB_REPOSITORY = credentials('DOCKERHUB_REPOSITORY')
        EC2_INSTANCE_PRIVATE_KEY = credentials('EC2_INSTANCE_PRIVATE_KEY')
        EC2_INSTANCE_PORT = 22
        DOCKERHUB_NAME = credentials('DOCKERHUB_NAME')
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    sh 'rm -rf S11P12C109'
                    echo "Cloning repository from: ${GITLAB_REPOSITORY_URL}"
                    sh "git clone ${GITLAB_REPOSITORY_URL}"
                }
            }
        }

        stage('Build Project') {
            steps {
                script {
                    dir('S11P12C109/server') {
                        sh 'chmod +x ./gradlew'
                        
                        sh './gradlew clean build'
                    }
                }
            }
        }

        stage('Docker Build and Push') {
            steps {
                script {
                    // Docker build and push
                    sh "docker build -t ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPOSITORY} ."
                    sh "docker push ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPOSITORY}:latest"
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    sh """
                    ssh -o StrictHostKeyChecking=no -i ${EC2_INSTANCE_PRIVATE_KEY} ubuntu@i11c109.p.ssafy.io -p ${EC2_INSTANCE_PORT} << 'ENDSSH'

                        docker pull ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPOSITORY}:latest

                        docker stop ${DOCKERHUB_NAME} || true

                        docker rm ${DOCKERHUB_NAME} || true{MYSQL_PASSWORD} -d -p 3306:3306 mysql:latest

                        
                        docker run --name ${DOCKERHUB_NAME} -d -p 8080:8080 ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPOSITORY}:latest
                        
                        docker image prune -f
                    ENDSSH
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        success {
            echo 'Build was successful!'
        }
        failure {
            echo 'Build failed.'
        }
    }
}
