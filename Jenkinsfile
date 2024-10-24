pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                // Usa o Node.js configurado com 'nodejs' para os passos subsequentes
                nodejs(nodeJSInstallationName: 'Node 20.x', configId: '<config-file-provider-id>') {
                    bat 'npm config ls'  // Exibe a configuração do npm
                    bat 'npm install'    // Instala as dependências
                }
            }
        }

        // Outras etapas do pipeline...
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
