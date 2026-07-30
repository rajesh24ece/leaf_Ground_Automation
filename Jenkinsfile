pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Source code checkout completed'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'call npm ci'
            }
        }

        stage('Install Browser') {
            steps {
                bat 'call npx playwright install chromium'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'call npx playwright test --project=chromium'
            }
        }
    }

    post {
        always {
            echo 'LeafGround pipeline execution completed'
        }

        success {
            echo 'Playwright tests PASSED'
        }

        failure {
            echo 'Playwright tests FAILED'
        }
    }
}