pipeline {
     agent {
        docker {
            image 'node:20'  // Imagem Docker com Node.js e npm
            args '-u root:root'  // Para evitar problemas de permissões
        }
    }

    // environment {
    //     DB_URI = "mongodb://localhost:27017/ABPunitarytest"
    //     PORT = "3060"
    //     JWT_SECRET = "secretKey"
    //     JWT_SECRET_REFRESH = "secretRefresh"
    //     ADMIN_PASSWORD = "12345"
    //     NODE_ENV = "test"
    // }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Set up Node.js') {
            tools {
                nodejs 'Node'  // Nome da instalação configurada no Jenkins
            }
            steps {
                sh 'node -v'  // Verifica a versão do Node.js instalada
                sh 'npm -v'   // Verifica a versão do npm instalada
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'  // Instala as dependências do projeto
            }
        }

        stage('Set up MongoDB') {
            steps {
                script {
                    // Inicia um contêiner do MongoDB com Docker
                    docker.image('mongo:5.0').withRun('-p 27017:27017 -e MONGO_INITDB_DATABASE=ABPunitarytest') { mongo ->
                        echo "MongoDB started on port 27017"
                    }
                }
            }
        }

        stage('Set up .env.dev file') {
            steps {
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

        stage('Wait for MongoDB') {
            steps {
                script {
                    retry(5) {  // Tenta 5 vezes, esperando o MongoDB estar pronto
                        sleep(time: 2, unit: 'SECONDS')
                        sh 'nc -z localhost 27017'  // Verifica se o MongoDB está acessível
                    }
                }
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build'  // Compila o projeto
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm run teste'  // Executa os testes do projeto
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            // Aqui você pode adicionar qualquer limpeza de ambiente se necessário
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
