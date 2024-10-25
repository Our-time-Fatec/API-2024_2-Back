pipeline {
    agent any

    tools {
        nodejs 'Node'  // Nome da configuração que você fez para o Node.js
    }

    stages {
        stage('Checkout repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Our-time-Fatec/API-2024_2-Back'
            }
        }

        stage('Start MongoDB') {
            steps {
                script {
                    // Inicia o contêiner MongoDB
                    bat 'docker run --name mongo-test -d -p 27017:27017 -e MONGO_INITDB_DATABASE=ABPunitarytest mongo:5.0'
                }
            }
        }

        stage('Install dependencies') {
            steps {
                nodejs('Node') {  // Usando a configuração correta
                    echo "Instalando dependências do Node.js"
                    bat 'npm install'  // Instala as dependências
                }
            }
        }

        stage('Set up .env.dev') {
            steps {
                script {
                    // Configura o arquivo .env.dev
                    writeFile file: '.env.dev', text: '''
                        PORT=3060
                        JWT_SECRET=secretKey
                        JWT_SECRET_REFRESH=secretRefresh
                        DB_URI=mongodb://localhost:27017/ABPunitarytest
                        ADMIN_PASSWORD=12345
                        NODE_ENV=test
                    '''
                }
            }
        }

        stage('Wait for MongoDB') {
            steps {
                script {
                    // Aguarda o MongoDB ficar disponível
                    waitUntil {
                        script {
                            return sh(script: 'nc -z localhost 27017', returnStatus: true) == 0
                        }
                    }
                }
            }
        }

        stage('Build project') {
            steps {
                bat 'npm run build'  // Constrói o projeto
            }
        }

        stage('Run tests') {
            steps {
                bat 'npm run teste'  // Executa os testes
            }
        }
    }

    post {
        always {
            bat 'docker stop mongo-test || true'  // Para o contêiner do MongoDB
            bat 'docker rm mongo-test || true'    // Remove o contêiner
        }
        success {
            echo 'Build and tests passed successfully!'  // Mensagem de sucesso
        }
        failure {
            echo 'Build or tests failed.'  // Mensagem de falha
        }
    }
}
