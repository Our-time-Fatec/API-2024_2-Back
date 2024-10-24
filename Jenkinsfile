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

        stage('Install dependencies') {
            steps {
                nodejs('Node') {  // Usando a configuração correta
                    echo "Instalando dependências do Node.js"
                    bat 'npm install'  // Instala as dependências
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
            bat 'docker stop $(docker ps -q --filter ancestor=mongo:5.0) || true'  // Para o contêiner do MongoDB
        }
        success {
            echo 'Build and tests passed successfully!'  // Mensagem de sucesso
        }
        failure {
            echo 'Build or tests failed.'  // Mensagem de falha
        }
    }
}
