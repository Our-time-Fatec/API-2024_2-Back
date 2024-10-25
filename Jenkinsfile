pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Clona o repositório
                git 'https://github.com/Our-time-Fatec/API-2024_2-Back.git'
            }
        }

        stage('Set up environment') {
            steps {
                // Configura as variáveis de ambiente
                script {
                    // Cria um arquivo .env.dev
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
                // Executa o MongoDB em um contêiner
                script {
                    docker.image('mongo:5.0').withRun('-p 27017:27017') { mongo ->
                        // Aguarda o MongoDB iniciar
                        sleep(10) // Aguarde alguns segundos para o MongoDB inicializar
                    }
                }
            }
        }

        stage('Install dependencies') {
            steps {
                // Instala as dependências do projeto
                bat  'npm install'
            }
        }

        stage('Build project') {
            steps {
                // Compila o projeto
                bat  'npm run build'
            }
        }

        stage('Run tests') {
            steps {
                // Executa os testes
                bat  'npm run teste'
            }
        }
    }

    post {
        always {
            // Limpa os contêineres após a execução
            bat  'docker rm -f $(docker ps -a -q --filter "ancestor=mongo:5.0") || true'
        }
    }
}
