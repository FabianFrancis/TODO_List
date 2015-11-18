var todoApp = angular.module('todoApp', []);

function todoController($scope, $http) {
    $scope.formData = {};

    // Display all the todos in the application while page-load
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
			var todos = $scope.todos;
			var completed = false;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

	 // Function to delete a todo after cliking the X button
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
	
    // HTTP post used to send the data to Node API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}


/*
Redundant code. I was trying to bring an underline when a check was done

$scope.toggleCompleted = function (todo, completed) {
		if (angular.isDefined(completed)) {
			todo.completed = completed;
		}
		
		store.put(todo, todos.indexOf(todo))
			.then(function success() {}, function error() {
				todo.completed = !todo.completed;
			});
	};

	$scope.clearCompletedTodos = function () {
			store.clearCompleted();
		};


			$scope.saveEdits = function (todo, event) {
		// Blur events are automatically triggered after the form submit event.
		// This does some unfortunate logic handling to prevent saving twice.
		if (event === 'blur' && $scope.saveEvent === 'submit') {
			$scope.saveEvent = null;
			return;
		}
	};

*/