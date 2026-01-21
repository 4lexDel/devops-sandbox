pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  environment {
    DOCKERHUB_USER = "4lexdel"
    IMAGE_NAME     = "devops-sandbox-app"
    IMAGE_TAG      = "${GIT_COMMIT[0..7]}"
    FULL_IMAGE     = "${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
  }

  stages {

    stage('Info') {
      steps {
        echo "Branch        : ${env.BRANCH_NAME}"
        echo "Commit        : ${env.GIT_COMMIT}"
        echo "Docker image  : ${env.FULL_IMAGE}"
      }
    }

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run tests') {
      steps {
        sh 'npm test'
      }
    }

    stage('Docker Build') {
      when {
        branch 'main'
      }
      steps {
        sh '''
          docker build \
            -t ${FULL_IMAGE} \
            .
        '''
      }
    }

    stage('Docker Push') {
      when {
        branch 'main'
      }
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

            docker push ${FULL_IMAGE}
          '''
        }
      }
    }

    stage('Ansible Deploy') {
      when {
        branch 'main'
      }
      steps {
        sh '''
          ansible-playbook \
            -i ansible/inventory \
            ansible/deploy.yml \
            --extra-vars "docker_image=${FULL_IMAGE}"
        '''
      }
    }
  }

  post {
    success {
      echo "✅ Pipeline succeeded"
      echo "🚀 Application deployed with image ${FULL_IMAGE}"
    }
    failure {
      echo "❌ Pipeline failed"
    }
    always {
      sh 'docker logout || true'
    }
  }
}
