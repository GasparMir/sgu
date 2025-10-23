pipeline {
    agent any

stage('Parando y limpiando...') {
    steps {
        bat '''
            REM Detener servicios y eliminar contenedores, imágenes y volúmenes ligados al proyecto
            docker compose -p sgu-jgml down --rmi all -v || exit /b 0
        '''
    }
}

        stage('Obteniendo actualización...') {
            steps {
                checkout scm
            }
        }

        stage('Construyendo y desplegando servicios...') {
            steps {
                bat '''
                    docker compose up --build -d
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline ejecutado con éxito'
        }

        failure {
            echo 'Hubo un error al ejecutar el pipeline'
        }

        always {
            echo 'Pipeline finalizado'
        }
    }
}