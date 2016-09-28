var logger = require('fluent-logger')
// The 2nd argument can be omitted. Here is a default value for options.
logger.configure('docker', {
   host: 'localhost',
   port: 24224,
   timeout: 3.0,
   reconnectInterval: 600000 // 10 minutes
});
var client = {
  increment : function() {},
  set : function() {},
  Histograms : function() {}
};
var paymentId = ()=>{return 'payment1'},
    venderId = () => {},
    taskId = ()=>{},
    clientId = ()=>{};
var bigClientList = [];
for(var i = 0 ; i < 100 ; ++i ){
      bigClientList.push('client' + i);
    }


var successfulRegisterationClient = function(id){
  logger.emit('appEvent', {id:id, action:'new', type:'client'})
}
var successfulRegisterationVenders = function(id){
  logger.emit('appEvent', {id:id, action:'new', type:'vender'})
}

var newTask = function(id){
 logger.emit('appEvent', {id:id, action:'new', type:'task'})
  client.increment('newTask');
}
var cancelTask = function(id) {
 logger.emit('appEvent', {id:id, action:'cancel', type:'task'})
 client.increment('cancelledTasks');
}
var closeBidding = function(taskId) {
 logger.emit('appEvent', {id:taskId, action:'close', type:'task'})
 client.increment('closedTasks');
}
var signContract = function(id) {
 logger.emit('appEvent', {id:id, action:'sign', type:'task'})
 client.increment('signedTasks')
}

var bidTasks = function(taskId, bidId){
 logger.emit('appEvent', {id:bidId, taskId:taskId, action:'new', type:'bid'})
 logger.emit('appEvent', {id:taskId, bidId:bidId, action:'bid', type:'task'})
 client.increment('bids');
}
var successfulpaymentFromClient = function(taskId, amount){
  logger.emit('appEvent', {id:taskId, action:'clientPayment', type:'task', amount:amount})
  var paymentId = 'payment1';
  logger.emit('appEvent', {id:paymentId, action:'new', type:'payment', amount:amount})
  client.Histograms('payments', amount);
}
var acceptWork = function(taskid){
 logger.emit('appEvent', {id:taskid, action:'accept', type:'task'})
  client.increment('acceptWork');
}

var taskIds = ['task1'], venderIds = ['vender1', 'vender2'], clientids = ['client1', 'client2'];
setInterval(()=>{
  successfulRegisterationClient(clientids[0])
  successfulRegisterationVenders(venderIds[0])
  newTask('task1');
  newTask('task2');
  successfulRegisterationVenders(venderIds[1])
  bidTasks('task1' , 'bid1');
  bidTasks('task1' , 'bid2');
  bidTasks('task1' , 'bid11');
  closeBidding('task1');
  signContract('task1');
  successfulpaymentFromClient('task1', 200);
  acceptWork('task1');
}, 1000*40);
 //
 //
 // // Catch socket errors so they don't go unhandled, as explained
 // // in the Errors section below
 // client.socket.on('error', function(error) {
 //   console.error("Error in socket: ", error);
 // });
 //
 // // Timing: sends a timing command with the specified milliseconds
 // client.timing('response_time', 42);
 //
 // // Increment: Increments a stat by a value (default is 1)
 // client.increment('my_counter');
 //
 // // Decrement: Decrements a stat by a value (default is -1)
 // client.decrement('my_counter');
 //
 // // Histogram: send data for histogram stat (DataDog and Telegraf only)
 // client.histogram('my_histogram', 42);
 //
 // // Gauge: Gauge a stat by a specified amount
 // client.gauge('my_gauge', 123.45);
 //
 // // Set: Counts unique occurrences of a stat (alias of unique)
 // client.set('my_unique', 'foobar');
 // client.unique('my_unique', 'foobarbaz');
 //
 // // Event: sends the titled event (DataDog only)
 // client.event('my_title', 'description');
 //
 // // Check: sends a service check (DataDog only)
 // client.check('service.up', client.CHECKS.OK, { hostname: 'host-1' }, ['foo', 'bar'])
 //
 // // Incrementing multiple items
 // client.increment(['these', 'are', 'different', 'stats']);
 //
 // // Sampling, this will sample 25% of the time the StatsD Daemon will compensate for sampling
 // client.increment('my_counter', 1, 0.25);
 //
 // // Tags, this will add user-defined tags to the data (DataDog and Telegraf only)
 // client.histogram('my_histogram', 42, ['foo', 'bar']);
 //
 // // Using the callback.  This is the same format for the callback
 // // with all non-close calls
 // client.set(['foo', 'bar'], 42, function(error, bytes){
 //   //this only gets called once after all messages have been sent
 //   if(error){
 //     console.error('Oh noes! There was an error:', error);
 //   } else {
 //     console.log('Successfully sent', bytes, 'bytes');
 //   }
 // });
 //
 // // Sampling, tags and callback are optional and could be used in any combination (DataDog and Telegraf only)
 // client.histogram('my_histogram', 42, 0.25); // 25% Sample Rate
 // client.histogram('my_histogram', 42, ['tag']); // User-defined tag
 // client.histogram('my_histogram', 42, next); // Callback
 // client.histogram('my_histogram', 42, 0.25, ['tag']);
 // client.histogram('my_histogram', 42, 0.25, next);
 // client.histogram('my_histogram', 42, ['tag'], next);
 // client.histogram('my_histogram', 42, 0.25, ['tag'], next);
 //
 // // Use a child client to add more context to the client.
 // // Clients can be nested.
 // var childClient = client.childClient({
 //   prefix: 'additionalPrefix.',
 //   suffix: '.additionalSuffix',
 //   globalTags: ['globalTag1:forAllMetricsFromChildClient']
 // });
 // childClient.increment('my_counter_with_more_tags');
 //
 // // Close statsd.  This will ensure all stats are sent and stop statsd
 // // from doing anything more.
 // client.close(function(err) {
 //   console.log('The close did not work quite right: ', err);
 // });
