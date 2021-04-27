const test = require('th_unit09_unit_tests');
const Procmonrest = require('procmonrest');

    
 describe('an end-to-end test', function () {
   this.timeout(5000)
   
   const serverProcess = new Procmonrest({
   command: 'npm start',
   waitFor: /listening on port \d{4}/i
   });
  
   before(() => {
     return serverProcess.start();
   })
  
   after(() => {
     if (serverProcess.running) {
       return serverProcess.stop();
     }
   })

   test.meetsRun(); 
   
 })