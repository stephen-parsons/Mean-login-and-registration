// require mongoose
var mongoose = require('mongoose');
// create the schema
var bcrypt = require("bcrypt-as-promised")
var UserSchema = new mongoose.Schema({
   email: {

       type: String,

       required: [true, "Please enter an email."],

       match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,

       unique: [true, "Email already exists."]

   },
  first_name: {type: String, minlength: 1, required: [true, "Please enter a first name."]},
  last_name: {type: String, minlength: 1, required: [true, "Please enter a last name."]},
  password: {type: String, minlength: [8, "Password must be at least 8 characters"], maxlenght: 32, required: [true, "Please enter a password."]},
  birthday: {type: String, required: [true, "Please enter a birthday."]}
})

UserSchema.pre('save', function(done){
	// console.log("test");	
	// console.log(this.password);
	bcrypt.hash(this.password, 10)
	.then(hashed_password => {
		this.password = hashed_password;
		done();
	})
	.catch(error => {
		console.log(error);
		done();
	});
});

// register the schema as a model
var User = mongoose.model('User', UserSchema);