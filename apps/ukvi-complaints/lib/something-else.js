'use strict';
const Complaint = require('./complaint');

class SomethingElseComplaint extends Complaint {
  constructor(values) {
    super(values);
    this.complaintAttributes.complaint.complaintType = 'SOMETHING_ELSE';
  }
}

module.exports = SomethingElseComplaint;
