'use strict';

const fs = require('fs');
const path = require('path');
const { expect } = require('chai');

describe('File Vault branch hostname', () => {
  const host = 'fv-ukvic-{{ .DRONE_SOURCE_BRANCH }}.branch.sas-notprod.homeoffice.gov.uk';
  const files = {
    'kube/file-vault/file-vault-ingress.yml': [
      `- ${host}`,
      `- host: ${host}`
    ],
    'kube/file-vault/file-vault-deployment.yml': [
      `value: https://${host}`,
      `value: https://${host}`
    ],
    'kube/app/deployment.yml': [`value: https://${host}/file`],
    'kube/cron/generate-csv-reports.yaml': [`value: https://${host}/file`]
  };

  Object.entries(files).forEach(([file, expected]) => {
    it(`uses the application-specific host in ${file}`, () => {
      const contents = fs.readFileSync(path.join(__dirname, '../..', file), 'utf8');
      expected.forEach(line => {
        expect(contents.split('\n').filter(actual => actual.trim() === line)).to.have.length(
          expected.filter(item => item === line).length
        );
      });
      expect(contents).not.to.include('fv-{{ .DRONE_SOURCE_BRANCH }}.branch.sas-notprod.homeoffice.gov.uk');
    });
  });
});
