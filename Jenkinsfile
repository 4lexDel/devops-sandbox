pipeline {
  agent any

  options {
    timestamps()
  }

  environment {
    IMAGE_NAME = "devops-sandbox-app"
    IMAGE_TAG  = "latest"
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
          docker build \
            -t ${IMAGE_NAME}:${IMAGE_TAG} \
            .
        '''
      }
    }
  }

  post {
    success {
      echo "Docker image ${IMAGE_NAME}:${IMAGE_TAG} built successfully ✅"
    }
    failure {
      echo "Pipeline failed ❌"
    }
  }
}
