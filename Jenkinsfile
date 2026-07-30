pipeline {
    agent any

    parameters {
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'webkit'],
            description: 'Select browser for Playwright test execution'
        )
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Source code checkout completed'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node dependencies...'
                bat 'call npm ci'
            }
        }

        stage('Playwright Version') {
            steps {
                echo 'Checking Playwright version...'
                bat 'call npx playwright --version'
            }
        }

        stage('Install Browser') {
            steps {
                echo "Installing browser: ${params.BROWSER}"
                bat "call npx playwright install ${params.BROWSER}"
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running Playwright tests on: ${params.BROWSER}"
                bat "call npx playwright test --project=${params.BROWSER}"
            }
        }
    }

    post {

        always {
            echo 'LeafGround pipeline execution completed'

            echo 'Archiving Playwright test artifacts...'

            archiveArtifacts(
                artifacts: 'test-results/**/*',
                allowEmptyArchive: true,
                fingerprint: true
            )
        }

        success {
            echo "Playwright tests PASSED on ${params.BROWSER}"
        }

        failure {
            echo "Playwright tests FAILED on ${params.BROWSER}"
        }
    }
}