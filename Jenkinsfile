pipeline {
    agent any

    tools {
        nodejs 'NodeJS_20'  // Nome da configuração que você fez para o Node.js 20.x
    }

    stages {
        stage('Checkout repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Our-time-Fatec/API-2024_2-Back'
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build project') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Run tests') {
            steps {
                bat 'npm run teste'
            }
        }
    }

    post {
        always {
            bat 'docker stop $(docker ps -q --filter ancestor=mongo:5.0) || true'
        }
        success {
            echo 'Build and tests passed successfully!'
        }
        failure {
            echo 'Build or tests failed.'
        }
    }
}
