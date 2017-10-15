//// app/models/user-registration-model.js
//// grab the mongoose module
var mongoose = require('mongoose');

// define our user model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('employeeModels', {
    name : {type : String, default: ''},
    email : {type : String, default: ''},
    dob : { type: String, default: '' },
    department : {type : String, default: ''},
    gender : {type : String, default: ''}
    
});