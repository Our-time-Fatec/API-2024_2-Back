pipeline {
    agent any

    stages {
        stage('Checkout repository') {
            steps {
                // Checkout the repository
                git branch: 'main', url: 'https://github.com/your-repo-url.git'
            }
        }

        stage('Set up Node.js') {
            steps {
                // Use Node.js 20.x version
                bat 'nvm install 20'
                bat 'nvm use 20'
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Set up .env.dev file') {
            steps {
                // Create .env.dev file with required environment variables
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

        stage('Start MongoDB') {
            steps {
                script {
                    // Pull and run MongoDB container
                    bat 'docker run -d -p 27017:27017 -e MONGO_INITDB_DATABASE=ABPunitarytest mongo:5.0'
                }
            }
        }

        stage('Wait for MongoDB') {
            steps {
                // Wait until MongoDB is up and running
                script {
                    waitUntil {
                        try {
                            bat 'nc -z localhost 27017'
                            return true
                        } catch (Exception e) {
                            echo 'Waiting for MongoDB...'
                            sleep(time: 2, unit: 'SECONDS')
                            return false
                        }
                    }
                }
            }
        }

        stage('Build project') {
            steps {
                // Build the project
                bat 'npm run build'
            }
        }

        stage('Run tests') {
            steps {
                // Run the tests
                bat 'npm run teste'
            }
        }
    }

    post {
        always {
            // Cleanup MongoDB container after the build
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
