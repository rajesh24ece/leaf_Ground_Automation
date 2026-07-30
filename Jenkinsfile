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
                echo 'Checking Playwright version...'
                bat 'call npx playwright --version'
            }
        }

        stage('Install Browser') {
            steps {
                echo 'Installing Chromium...'
                bat 'call npx playwright install chromium'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running Playwright tests on Chromium...'
                bat 'call npx playwright test --project=chromium'
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
            echo 'Playwright tests PASSED'

            slackSend(
                channel: '#jenkins-reports',
                color: 'good',
                message: """
✅ *Jenkins Build PASSED*

*Job:* ${env.JOB_NAME}
*Build:* #${env.BUILD_NUMBER}
*Browser:* Chromium
*Status:* SUCCESS
*Build URL:* ${env.BUILD_URL}
"""
            )
        }

        failure {
            echo 'Playwright tests FAILED'

            slackSend(
                channel: '#jenkins-reports',
                color: 'danger',
                message: """
❌ *Jenkins Build FAILED*

*Job:* ${env.JOB_NAME}
*Build:* #${env.BUILD_NUMBER}
*Browser:* Chromium
*Status:* FAILED
*Build URL:* ${env.BUILD_URL}
"""
            )
        }
    }
}