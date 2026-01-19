pipeline {
  agent any

  options {
    timestamps()
  }

  environment {
    DOCKERHUB_USER = "4lexdel"
    IMAGE_NAME     = "devops-sandbox-app"
    IMAGE_TAG      = "${GIT_COMMIT[0..7]}"
    FULL_IMAGE     = "${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Run tests') {
      steps {
        sh 'npm test'
      }
    }

    stage('Docker Build') {
      steps {
        sh '''
          docker build -t ${FULL_IMAGE} .
        '''
      }
    }

    stage('Docker Login') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-creds',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          sh '''
            echo "$DOCKER_PASS" | docker login \
              -u "$DOCKER_USER" \
              --password-stdin
          '''
        }
      }
    }

    stage('Docker Push') {
      steps {
        sh '''
          docker push ${FULL_IMAGE}
        '''
      }
    }
  }

  post {
    success {
      echo "Image pushed: ${FULL_IMAGE} 🚀"
    }
    always {
      sh 'docker logout || true'
    }
  }
}
