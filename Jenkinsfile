pipeline {
    agent any


    stages {
        stage('Build') {
            steps {

                nvm(nvmInstallURL: 'https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh',
                nvmIoJsOrgMirror: 'https://iojs.org/dist',
                nvmNodeJsOrgMirror: 'https://nodejs.org/dist',
                version: '20.10.0')
                // Get some code from a GitHub repository
                {
                    sh "npm install -g @angular/cli@18.2.12"
                    sh "npm i --legacy-peer-deps"
                    sh "ng b"
                }


            }

            post {
                // If Maven was able to run the tests, even if some of the test
                // failed, record the test results and archive the jar file.
                success {
                    sh "rsync -u nginx_webcasino_provider_route_config.conf ubuntu@11.0.10.178:/var/www/html/deployment/nginx_conf/ "
                    sh "rsync -avh dist/casino/ ubuntu@11.0.10.178:/var/www/html/deployment/webcasino/ --delete"

                    sh "ssh ubuntu@11.0.10.178 -T /home/ubuntu/deployment.sh webcasino"


                }

            }
        }
    }
}
