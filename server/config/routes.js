var users = require('../controllers/users.js');
module.exports = function(app){  
	function home(req,res){
		req.session.user = null;
		res.render('index', {context: [req.flash('errors'), req.flash('pw_error')]});
	}

	function register(req, res){
		users.create(req,res);
	}

	app.get('/', home);

	app.get('/users', function(req, res) {
		if (req.session.user != null){
			users.show(req,res); 
		}
		else{
			res.redirect('/');
		}
	})

	app.post('/users', function(req, res) {
		users.login(req,res);
	})

	app.post('/new', register);
};