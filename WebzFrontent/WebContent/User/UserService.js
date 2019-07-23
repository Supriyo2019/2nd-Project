app.factory('UserService', ['$http', '$q', '$rootScope',
		function($http, $q, $rootScope) {
			console.log("UserService...")

			var BASE_URL = 'http://localhost:8081/Webz'
				return {
				fetchAllUsers : function() {
					console.log("--> UserService : calling 'fetchAllUsers' method.");
									return $http
									.get(BASE_URL + '/userlist')
									.then(function(response) {
									return response.data;
										}, 
									function(errResponse) {
									console.error('Error while fetching Users');
									return $q.reject(errResponse);
										});
									},
					//selected userDetails				
									getSelectedUser : function(id) {
										console.log("-->UserService : calling getSelectedUser() method with id : " + id);
										return $http
													.get(BASE_URL+'/user/'+ id)
													.then(function(response) {
														$rootScope.selectedUser = response.data;
														return response.data;
													},
													function(errResponse) {
														console.error('Error while Fetching User.');
														return $q.reject(errResponse);
													});
								
									},
									
									
									
									sendFriendRequest : function(friendId) {
										return $http
												.post(
														BASE_URL + '/addFriend/'
																+ friendId)
												.then(
														function(response) {
															return response.data;
														},
														function(errResponse) {
															console
																	.error("-->updateFriendRequest : Error while creating friend.")
															return $q
																	.reject(errResponse);
														});
									},
									
									
									
									
									
					//create User
									createUser : function(user) {
										console.log("--> UserService : calling 'createUser' method.");
										return $http
										.post(BASE_URL + '/Adduser/', user)
										.then(function(response) {
										return response.data;
												}, 
										function(errResponse) {
											console.error('Error while creating user');
											return $q.reject(errResponse);
												});
										},
										
										
							//update user
										
										updateUser : function(user, id) {
											console.log("--> UserService : calling 'updateUser' method.");
											return $http
														.put(BASE_URL+'/Edituser/'+id, user)
														.then(function(response) {
															return response.data;
														},
														function(errResponse) {
															console.error('Error while updating User...');
															return $q.reject(errResponse);
														});
										},
										
					//logIn					
										authenticateUser : function(user) {
											console.log("--> UserService : calling 'authenticateUser' ");
											return $http
										            .post(BASE_URL+'/userProfile/authenticate/', user)
												.then(function(response) {
													return response.data;
													},
													function(errResponse) {
												console.log('Error while fetching  User');
												return $q.reject(errResponse);
													});
											},			
				//logout
											logout: function(user, id) 
											{
												console.log("--> UserService : calling 'logout' method.");
												alert(user.userId+id);
												return $http.put(BASE_URL+'/logout/'+id,user).then
												(function(response) 
														{
																return response.data;
														},
														function(errResponse) 
														{
													
															console.error('Error while logging out.');
																return $q.reject(errResponse);
														}
												);
											}


								

										
													};
			
}]);
			