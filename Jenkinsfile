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
                echo 'Installing Node dependencies...'
                bat 'call npm ci'
            }
        }

        stage('Playwright Version') {
            steps {
                bat 'call npx playwright --version'
            }
        }

        stage('Install Browsers') {
            steps {
                echo 'Installing Chromium and WebKit...'
                bat 'call npx playwright install chromium webkit'
            }
        }

        stage('Run Tests in Parallel') {
            parallel {

                stage('Chromium') {
                    steps {
                        echo 'Running Chromium tests...'

                        bat '''
                            call npx playwright test --project=chromium --output=test-results/chromium --reporter=list
                        '''
                    }
                }

                stage('WebKit') {
                    steps {
                        echo 'Running WebKit tests...'

                        bat '''
                            call npx playwright test --project=webkit --output=test-results/webkit --reporter=list
                        '''
                    }
                }
            }
        }
    }

    post {

        always {
            echo 'LeafGround parallel pipeline execution completed'

            echo 'Archiving Playwright test artifacts...'

            archiveArtifacts(
                artifacts: 'test-results/**/*',
                allowEmptyArchive: true,
                fingerprint: true
            )
        }

        success {
            echo 'Chromium and WebKit tests PASSED'
        }

        failure {
            echo 'One or more browser test executions FAILED'
        }
    }
}