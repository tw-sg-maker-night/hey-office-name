'use strict';

var util = require('util')
var Lex = require('lex-sdk')
var NameRepository = require('./name_repository')

function inspect(obj) {
  return util.inspect(obj, false, null)
}

var handlers = {
  'WhoAmI': function() {
    NameRepository.getName(this.event.userId, (name) => {
      this.emit(':tell', 'Your name is '+name);
    })
  }
}

module.exports.whoAmI = (event, context, callback) => {
  console.log("Event = " + inspect(event))
  var lex = Lex.handler(event, context)
  lex.registerHandlers(handlers)
  lex.execute()
};
