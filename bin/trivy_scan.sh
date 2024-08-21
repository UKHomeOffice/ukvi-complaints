#! /bin/bash
set -e
# Run Trivy scan and save output to a text file
export KUBE_NAMESPACE=$1
- trivy image --severity HIGH,CRITICAL --format table --output /var/run/trivy-report.txt node:lts-alpine@sha256:19eaf41f3b8c2ac2f609ac8103f9246a6a6d46716cdbe49103fdb116e55ff0cc
# Display the output for debugging (optional)
- cat /var/run/trivy-report.txt
# Store the scan result into an environment variable for Slack notification
- export SLACK_MESSAGE=$(cat /var/run/trivy-report.txt)
- curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"\`\`\` $SLACK_MESSAGE \`\`\`\"}" $SLACK_WEBHOOK_URL