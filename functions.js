module.exports = function(store){
    var app={};
    var client = {
        increment : function() {},
        set : function() {},
        Histograms : function() {}
    };
    var logger = require('fluent-logger');
// The 2nd argument can be omitted. Here is a default value for options.
    logger.configure('app', {
        host: 'localhost',
        port: 24224,
        timeout: 3.0,
        reconnectInterval: 600000 // 10 minutes
    });
    app.successfulRegistrationClient = function(id){
        logger.emit('log', {id:id, action:'new', type:'client'})
        return app
    }
    app.successfulRegistrationsVendors = function(id){
        logger.emit('log', {id:id, action:'new', type:'vendor'})
        return app
    }
    app.newTask = function(id){
        logger.emit('log', {id:id, action:'new', type:'task'})
        return app
    }
    app.cancelTask = function(id) {
        logger.emit('log', {id:id, action:'cancel', type:'task'})
        return app
    }
    app.closeBidding = function(taskId) {
        logger.emit('log', {id:taskId, action:'close', type:'task'})
        return app
    }
    app.signContract = function(id) {
        logger.emit('log', {id:id, action:'sign', type:'task'})
        return app
    }
    app.bidTasks = function(taskId, bidId){
        logger.emit('log', {id:bidId, taskId:taskId, action:'new', type:'bid'})
        logger.emit('log', {id:taskId, bidId:bidId, action:'bid', type:'task'})
        return app
    }
    app.successfulPaymentFromClient = function(taskId, paymentId, amount){
        logger.emit('log', {id:taskId, action:'clientPayment', type:'task', amount:amount})
        logger.emit('log', {id:paymentId, action:'new', type:'payment', amount:amount})
        return app
    }
    app.acceptWork = function(taskid){
        logger.emit('log', {id:taskid, action:'accept', type:'task'})
        return app
    }
    return app;
}