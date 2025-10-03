const cds = require('@sap/cds')

module.exports = async () => {
  // Debug: Check CDS environment
  console.log('CDS requires.messaging:', JSON.stringify(cds.env.requires.messaging, null, 2));
  console.log('VCAP_SERVICES keys:', Object.keys(process.env.VCAP_SERVICES ? JSON.parse(process.env.VCAP_SERVICES) : {}));
  
  const messaging = await cds.connect.to('messaging')
  
  // Debug: Check the messaging service configuration
  console.log('Messaging service options:', JSON.stringify(messaging.options, null, 2));
  console.log('Messaging service credentials:', messaging.options?.credentials ? 'Found' : 'NOT FOUND');

  setInterval(async () => {
      let eventType = "ns.fh.employee.feedbackCollector.create.v1"
      const result = await messaging.emit(eventType, { data: 'testdata', headers: {"ce-xsapcomplianteventspec": true} });
      console.log(`Emit result for ${eventType}:`, result);
  }, 30000);
}
