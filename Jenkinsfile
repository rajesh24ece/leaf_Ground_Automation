pipeline {
    agent any

    environment {
        CI = 'true'
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

            script {

                /*
                 * Default values.
                 * These are used if the JSON report cannot be found/read.
                 */
                env.TEST_TOTAL = '0'
                env.TEST_PASSED = '0'
                env.TEST_FAILED = '0'
                env.TEST_FLAKY = '0'
                env.TEST_SKIPPED = '0'
                env.SUCCESS_RATE = '0.0'

                if (fileExists('test-results/test-results.json')) {

                    echo 'Reading Playwright JSON test results...'

                    /*
                     * Use Node.js to parse the Playwright JSON report.
                     *
                     * Playwright JSON structure:
                     * suites
                     *   -> specs
                     *      -> tests
                     *         -> results
                     *
                     * The final result determines passed/failed/skipped.
                     * Multiple attempts with an earlier failure followed
                     * by a pass are counted as flaky.
                     */
                    bat '''
                    node -e "const fs=require('fs'); const r=JSON.parse(fs.readFileSync('test-results/test-results.json','utf8')); let total=0,passed=0,failed=0,flaky=0,skipped=0; function walk(suites){for(const suite of suites||[]){for(const spec of suite.specs||[]){for(const test of spec.tests||[]){total++; const results=test.results||[]; const finalResult=results[results.length-1]; const finalStatus=finalResult ? finalResult.status : test.status; const hadFailure=results.slice(0,-1).some(x=>x.status==='failed'||x.status==='timedOut'||x.status==='interrupted'); if(finalStatus==='passed'){if(hadFailure){flaky++;}else{passed++;}}else if(finalStatus==='skipped'){skipped++;}else{failed++;}}} walk(suite.suites||[]);}} walk(r.suites||[]); const rate=total===0?0:((passed+flaky)/total*100); fs.writeFileSync('test-results/jenkins-summary.properties', 'TOTAL='+total+'\\nPASSED='+passed+'\\nFAILED='+failed+'\\nFLAKY='+flaky+'\\nSKIPPED='+skipped+'\\nSUCCESS_RATE='+rate.toFixed(1)+'\\n');"
                    '''

                    def summary = readProperties(
                        file: 'test-results/jenkins-summary.properties'
                    )

                    env.TEST_TOTAL = summary.TOTAL ?: '0'
                    env.TEST_PASSED = summary.PASSED ?: '0'
                    env.TEST_FAILED = summary.FAILED ?: '0'
                    env.TEST_FLAKY = summary.FLAKY ?: '0'
                    env.TEST_SKIPPED = summary.SKIPPED ?: '0'
                    env.SUCCESS_RATE = summary.SUCCESS_RATE ?: '0.0'

                    echo """
                    ===== PLAYWRIGHT TEST SUMMARY =====
                    Total        : ${env.TEST_TOTAL}
                    Passed       : ${env.TEST_PASSED}
                    Failed       : ${env.TEST_FAILED}
                    Flaky        : ${env.TEST_FLAKY}
                    Skipped      : ${env.TEST_SKIPPED}
                    Success Rate : ${env.SUCCESS_RATE}%
                    ===================================
                    """

                } else {

                    echo 'WARNING: test-results/test-results.json was not found.'
                }
            }

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
:white_check_mark: *Playwright Tests — PASSED*

*Job:* ${env.JOB_NAME}
*Build:* #${env.BUILD_NUMBER}
*Browser:* Chromium
*Status:* SUCCESS

:bar_chart: *Test Results*
:1234: Total          => ${env.TEST_TOTAL}
:white_check_mark: Passed         => ${env.TEST_PASSED}
:x: Failed         => ${env.TEST_FAILED}
:warning: Flaky          => ${env.TEST_FLAKY}
:black_right_pointing_double_triangle_with_vertical_bar: Skipped        => ${env.TEST_SKIPPED}

:chart_with_upwards_trend: *Success Rate* => ${env.SUCCESS_RATE}%

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
:x: *Playwright Tests — FAILED*

*Job:* ${env.JOB_NAME}
*Build:* #${env.BUILD_NUMBER}
*Browser:* Chromium
*Status:* FAILED

:bar_chart: *Test Results*
:1234: Total          => ${env.TEST_TOTAL}
:white_check_mark: Passed         => ${env.TEST_PASSED}
:x: Failed         => ${env.TEST_FAILED}
:warning: Flaky          => ${env.TEST_FLAKY}
:black_right_pointing_double_triangle_with_vertical_bar: Skipped        => ${env.TEST_SKIPPED}

:chart_with_downwards_trend: *Success Rate* => ${env.SUCCESS_RATE}%

*Build URL:* ${env.BUILD_URL}
"""
            )
        }
    }
}