pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = credentials('DOCKERHUB_USERNAME')
        DOCKERHUB_PASSWORD = credentials('DOCKERHUB_PASSWORD')
        EC2_INSTANCE_HOST = credentials('EC2_INSTANCE_HOST')
        EC2_INSTANCE_PORT = '22'
        EC2_INSTANCE_USERNAME = credentials('EC2_INSTANCE_USERNAME')
        EC2_INSTANCE_PRIVATE_KEY = credentials('EC2_INSTANCE_PRIVATE_KEY')
        DOCKERHUB_REPOSITORY = 'leadme'
        DOCKERHUB_NAME = 'imnunu'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build with Gradle') {
            steps {
                sh './gradlew clean build'
            }
        }

        stage('Docker Build and Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKERHUB_USERNAME}") {
                        def customImage = docker.build("${DOCKERHUB_USERNAME}/${DOCKERHUB_REPOSITORY}")
                        customImage.push('latest')
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['EC2_INSTANCE_PRIVATE_KEY']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no -i ${EC2_INSTANCE_PRIVATE_KEY} ${EC2_INSTANCE_USERNAME}@${EC2_INSTANCE_HOST} -p ${EC2_INSTANCE_PORT} "
                        docker stop ${DOCKERHUB_NAME} || true &&
                        docker rm ${DOCKERHUB_NAME} || true &&
                        docker pull ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPOSITORY}:latest &&
                        docker run --name ${DOCKERHUB_NAME} -d -p 8080:8080 ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPOSITORY}:latest &&
                        docker image prune -f"
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
