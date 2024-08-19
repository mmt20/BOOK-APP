const events = require('events');
var audit = require('../model/audit.model');
const queries = require('../db/queries');
const dbConnection = require('../db/connection');

const emitter = new events.EventEmitter();
const auditEvent = 'audit';
emitter.on(auditEvent, function (audit) {
  // steps of actions - save into db
  try {
    const values = [audit.auditAction, JSON.stringify(audit.data), audit.status, audit.error, audit.auditBy, audit.auditOn];
    const auditQuery = queries.queryList.AUDIT_QUERY;
    dbConnection.dbQuery(auditQuery, values);
    console.log("Audit Event Emmiter - Audit  " + JSON.stringify(audit));
  } catch (error) {
    console.log("Audit Event Emmiter - Error : ", error);
  }
});

exports.prepareAudit = function (auditAction, data, error, auditBy, auditOn) {
  let status = 200;
  if (error)
    status = 500;

  var auditObj = new audit.Audit(auditAction, data, status, error, auditBy, auditOn);
  emitter.emit(auditEvent, auditObj);
};

exports.Audit = class Audit {
  constructor(auditAction, data, status, error, auditBy, auditOn) {
    this.auditAction = auditAction;
    this.data = data;
    this.status = status;
    this.error = error;
    this.auditBy = auditBy;
    this.auditOn = auditOn;
  }
};
