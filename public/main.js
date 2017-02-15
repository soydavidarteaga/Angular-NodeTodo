angular.module('angularTodo',[]);
function mainController($scope,$http)
{
	$scope.formData = {};
	//Cuando se cargue la pagina, pide del Api todos los datos
	$http.get('/api/todos')
		.success(function(data)
		{
			$scope.todos = data;
			console.log(data)
		})
		.error(function(data){
			console.log('Error' + data);
		});
	//Cuando se añade un nuevo TODO, manda el texto a la API
	$scope.createTodo = function(){
		$http.post('/api/todos',$scope.formData)
			.success(function(data){
				$scope.formData = {};
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error' + data);
			});
	};

	$scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
}	//Borra un TODO despues de checkearlo como acabado
	
