
    var express  = require('express');
    var app      = express();                               // integrating express
    var mongoose = require('mongoose');                     // integrating mongoose library for mongodb
    var retrieveVal = require('body-parser');    			// retrieve information from HTML POST of index.html
    var methodOverride = require('method-override'); 		// simulate DELETE and PUT (express4)


	// Connecting with the mongoDB through mongoose
     mongoose.connect('mongodb://localhost/todoApp'); 

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(retrieveVal.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(retrieveVal.json());                                     // parse application/json
    app.use(retrieveVal.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

	 // define model to configure the database
    var Todo = mongoose.model('Todo', {
        text : String
    });
	
    // starting app with node server.js
    app.listen(8080);
    console.log("App listening on port 8080");

	// Routing of all the functionalities
	
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

    // Creating todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    // Deleting a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // Retrieve all the todos after deletion
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });
	
	
	   // Link for the application to load the HTML page where all the work will be done
    app.get('*', function(req, res) {
        res.sendfile('./public/myTodoApp/index.html');
    });
	
	