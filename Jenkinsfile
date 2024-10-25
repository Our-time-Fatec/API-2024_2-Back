pipeline {
    agent any

    tools {
        nodejs 'Node'  // Nome da configuração que você fez para o Node.js
    }

    environment {
        MONGO_CONTAINER_ID = 'mongo-test'  // ID do contêiner MongoDB
    }

    stages {
        stage('Checkout repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Our-time-Fatec/API-2024_2-Back'
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

        stage('Set up MongoDB') {
            steps {
                script {
                    echo "Configurando o contêiner MongoDB..."
                    // Inicia o contêiner MongoDB
                    bat "docker run --name ${MONGO_CONTAINER_ID} -d -p 27017:27017 -e MONGO_INITDB_DATABASE=ABPunitarytest mongo:5.0"
                }
            }
        }

        stage('Wait for MongoDB') {
            steps {
                script {
                    echo "Aguardando o MongoDB iniciar..."
                    // Aguarda até que o MongoDB esteja acessível
                    bat """
                    :loop
                    docker exec ${MONGO_CONTAINER_ID} mongo --eval "db.runCommand({ ping: 1 })" && (
                        echo "MongoDB está disponível."
                        exit 0
                    ) || (
                        echo "Aguardando MongoDB..."
                        timeout /t 2 > nul
                        goto loop
                    )
                    """
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
                try {
                    // Verifica se o MONGO_CONTAINER_ID não é nulo ou vazio
                    if (env.MONGO_CONTAINER_ID) {
                        bat "docker stop ${MONGO_CONTAINER_ID} || echo 'O contêiner já está parado.'"
                        bat "docker rm ${MONGO_CONTAINER_ID} || echo 'O contêiner já foi removido.'"
                    } else {
                        echo "Nenhum contêiner MongoDB para parar ou remover."
                    }
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
