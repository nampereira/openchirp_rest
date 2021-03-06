// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schemaOptions = require('./schema_options');

//Schema
var serviceSchema = new Schema({
	name:  { type: String, required: true },
	description: { type: String, required: true },
	pubsub : {
  		protocol : { type: String, enum: ['XMPP', 'MQTT', 'AMQP'] , default: 'MQTT'}
  	},
  properties : { type: Schema.Types.Mixed },
  config_required: [{
    _id : false,
  	key_name : { type : String },
  	key_description : { type : String },
  	key_example : { type : String },
  	key_required : { type : Boolean , default : false }
  }],
	owner: { type: Schema.Types.ObjectId, ref: 'User' , required : true },  
}, 
 schemaOptions 
);

serviceSchema.virtual('pubsub.endpoint').get(function () {
  return 'openchirp/services/' + this._id;
});

serviceSchema.virtual('pubsub.news_endpoint').get(function(){
  return this.pubsub.endpoint + '/thing/news';
});


serviceSchema.index({ name :"text" , description : "text" });
// Return model
module.exports = mongoose.model('Service', serviceSchema);
