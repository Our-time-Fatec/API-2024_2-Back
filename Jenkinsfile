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

        stage('Run MongoDB') {
            steps {
                script {
                    // Inicia um contêiner do MongoDB
                    echo "Iniciando MongoDB..."
                    def mongoContainer = docker.run('-d -p 27017:27017 -e MONGO_INITDB_DATABASE=ABPunitarytest mongo:5.0')
                    env.MONGO_CONTAINER_ID = mongoContainer.id
                }
            }
        }

        stage('Install dependencies') {
            steps {
                nodejs('Node') {
                    echo "Instalando dependências do Node.js"
                    bat 'npm install'  // Instala as dependências
                }
            }
        }

        stage('Set up .env.dev file') {
            steps {
                script {
                    echo "Configurando .env.dev..."
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

        stage('Wait for MongoDB') {
            steps {
                script {
                    echo "Aguardando o MongoDB estar pronto..."
                    // Espera até que o MongoDB esteja disponível
                    timeout(time: 60, unit: 'SECONDS') {
                        waitUntil {
                            script {
                                def response = sh(script: 'nc -z localhost 27017', returnStatus: true)
                                return response == 0
                            }
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
            script {
                echo "Parando o contêiner do MongoDB..."
                // Para e remove o contêiner do MongoDB
                bat "docker stop ${env.MONGO_CONTAINER_ID} || true"
                bat "docker rm ${env.MONGO_CONTAINER_ID} || true"
            }
        }
        success {
            echo 'Build and tests passed successfully!'  // Mensagem de sucesso
        }
        failure {
            echo 'Build or tests failed.'  // Mensagem de falha
        }
    }
}
