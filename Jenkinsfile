pipeline {
    agent any

    // =========================
    // BUILD PARAMETERS
    // =========================
    parameters {
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'webkit'],
            description: 'Select browser for Playwright test execution'
        )
    }

    stages {

        // =========================
        // CHECKOUT
        // =========================
        stage('Checkout') {
            steps {
                echo 'Source code checkout completed'
            }
        }

        // =========================
        // INSTALL DEPENDENCIES
        // =========================
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node dependencies...'
                bat 'call npm ci'
            }
        }

        // =========================
        // PLAYWRIGHT VERSION
        // =========================
        stage('Playwright Version') {
            steps {
                bat 'call npx playwright --version'
            }
        }

        // =========================
        // INSTALL SELECTED BROWSER
        // =========================
        stage('Install Browser') {
            steps {
                echo "Installing browser: ${params.BROWSER}"
                bat "call npx playwright install ${params.BROWSER}"
            }
        }

        // =========================
        // RUN TESTS
        // =========================
        stage('Run Tests') {
            steps {
                echo "Running Playwright tests on: ${params.BROWSER}"
                bat "call npx playwright test --project=${params.BROWSER}"
            }
        }
    }

    // =========================
    // POST BUILD
    // =========================
    post {

        always {
            echo 'LeafGround pipeline execution completed'
        }

        success {
            echo "Playwright tests PASSED on ${params.BROWSER}"
        }

        failure {
            echo "Playwright tests FAILED on ${params.BROWSER}"
        }
    }
}