pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Clona o repositório
                script {
                    // Faz o checkout na branch principal (substitua 'main' pela branch que você deseja)
                    try {
                        git branch: 'main', url: 'https://github.com/Our-time-Fatec/API-2024_2-Back.git'
                    } catch (Exception e) {
                        error "Failed to checkout Git repository: ${e.message}"
                    }
                }
            }
        }

        stage('Set up environment') {
            steps {
                script {
                    writeFile file: '.env.dev', text: """
                    PORT=3060
                    JWT_SECRET=secretKey
                    JWT_SECRET_REFRESH=secretRefresh
                    DB_URI=mongodb://localhost:27017/ABPunitarytest
                    ADMIN_PASSWORD=12345
                    NODE_ENV=test
                    """
                }
            }
        }

        stage('Run MongoDB') {
            steps {
                script {
                    docker.image('mongo:5.0').withRun('-p 27017:27017') { mongo ->
                        sleep(10)
                    }
                }
            }
        }

        stage('Install dependencies') {
            steps {
                bat  'npm install'
            }
        }

        stage('Build project') {
            steps {
                bat  'npm run build'
            }
        }

        stage('Run tests') {
            steps {
                bat  'npm run teste'
            }
        }
    }

    post {
        always {
            bat  'docker rm -f $(docker ps -a -q --filter "ancestor=mongo:5.0") || true'
        }
    }
}
