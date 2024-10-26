pipeline {
agent none
stages {
stage('Back-end') {
agent {
docker ( image 'maveni3.8.1-adoptopenjdk-11' )
}
steps {
sh "mvn --version"
}
}
stage("Front-end") {
agent {
docker { image 'node:16-alpine' }
}
steps {
sh 'node --version'
}
}
}

}