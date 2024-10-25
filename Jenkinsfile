pipeline {
    agent any

    stages {
        stage('Check Docker') {
            steps {
                script {
                    // Verifica se o Docker está disponível
                    def result = bat(script: 'docker --version', returnStatus: true)
                    if (result != 0) {
                        error("Docker is not installed or not in PATH")
                    }
                }
            }
        }

        stage('Run MongoDB') {
            steps {
                script {
                    docker.image('mongo:5.0').withRun('-p 27017:27017') { mongo ->
                        sleep(10) // Aguarde alguns segundos para o MongoDB inicializar
                    }
                }
            }
        }

        // Restante do pipeline...
    }
}
