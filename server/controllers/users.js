var mongoose = require('mongoose');
var bcrypt = require('bcrypt-as-promised');
var User = mongoose.model('User');

module.exports = {
  show: function(req, res) {
    User.find({}, function(err, users) {
        if(err){
          console.log(err);
              res.render('index', {errors: user.errors})
          }
        console.log(users); 
        res.render('users', {list: users});
    }) 
  },
  create: function(req, res) {
    console.log("POST DATA", req.body);
    
    var user = new User(req.body);
    user.save(function(err) {
      if (req.body.password != req.body.confirm_pw){ 
        console.log("test");
        req.flash('pw_error', "Passwords must match!");
        res.redirect('/');
        }
      else if(err) {
        console.log('something went wrong'); 
        req.flash('errors', user.errors); 
        res.redirect('/');
      }
      else{ 
        req.session.user = user._user;
        console.log(req.session.user);
        console.log('successfully added a user!');
        res.redirect('/');
      } 
    })
  },
  login: function(req,res){
    console.log("POST DATA", req.body);
    User.find({email: req.body.email}, function(err, user){
      if (err){
        console.log('email not found'); 
        req.flash('errors', err); 
        res.redirect('/');
      }
      else{
        console.log(user);
        (bcrypt.compare(req.body.password, user[0].password)
          .then(function(){
            console.log("successfully logged in")
            req.session.user = user[0]._id;
            res.redirect('/users');
          })
          .catch(error=>{
            req.flash('errors', error);
            res.redirect('/');
          }))
      }      
    })
  }
}