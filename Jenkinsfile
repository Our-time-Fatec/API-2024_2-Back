pipeline {
    agent {
        docker { image 'node:20.18.0-alpine3.20' }  // Define um agente Docker para todo o pipeline
    }
    stages {
        stage('Checkout repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Our-time-Fatec/API-2024_2-Back'
            }
        }

        stage('Install dependencies') {
            steps {
                echo "Instalando dependências do Node.js"
                sh 'npm install'  // Instala as dependências
            }
        }

        stage('Set up MongoDB') {
            steps {
                script {
                    echo "Configurando o contêiner MongoDB..."
                    // Inicia o contêiner MongoDB
                    sh "docker run --name mongo-test -d -p 27017:27017 -e MONGO_INITDB_DATABASE=ABPunitarytest mongo:5.0"
                }
            }
        }

        stage('Wait for MongoDB') {
            steps {
                script {
                    echo "Aguardando o MongoDB iniciar..."
                    // Aguarda até que o MongoDB esteja acessível
                    sh """
                    while ! docker exec mongo-test mongo --eval "db.runCommand({ ping: 1 })"; do
                        echo "Aguardando MongoDB..."
                        sleep 2
                    done
                    echo "MongoDB está disponível."
                    """
                }
            }
        }

        stage('Build project') {
            steps {
                sh 'npm run build'  // Constrói o projeto
            }
        }

        stage('Run tests') {
            steps {
                sh 'npm run teste'  // Executa os testes
            }
        }
    }

    post {
        always {
            script {
                echo "Parando o contêiner do MongoDB..."
                // Para e remove o contêiner do MongoDB
                try {
                    sh "docker stop mongo-test || echo 'O contêiner já está parado.'"
                    sh "docker rm mongo-test"
                } catch (err) {
                    echo "Erro ao parar/remover o contêiner: ${err}"
                }
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
