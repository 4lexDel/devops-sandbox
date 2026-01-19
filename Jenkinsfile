pipeline {
  agent any

  options {
    timestamps()
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
  }

  post {
    success {
      echo 'CI pipeline succeeded ✅'
    }
    failure {
      echo 'CI pipeline failed ❌'
    }
  }
}
