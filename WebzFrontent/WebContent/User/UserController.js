app.controller('UserController', [
		'$scope',
		'UserService',
		'$location',
		'$rootScope',
		'$route',
		'$window',
		function($scope, UserService, $location, $rootScope,$route,$window) {
			console.log("UserController...")

			var self = this;
			self.user = {
			    errorCode : '',
				errorMessage : '',
				userId : '',
				name : '',
				password : '',
				role : '',
				email : '',
				description : '',
				gender : '',
				DOB : '',
				address : '',
				contactNo : '',
				IsOnline : '',
				status : '',
				image : ''
				}
			self.users = [];
			
			
			//fetching all users
			self.fetchAllUsers = function() {
				console.log("--> UserController : calling fetchAllUsers method.");
				UserService.fetchAllUsers().then(
				function(d) {
				self.users = d;
								}, function(errResponse) {
									console.error('Error while fetching Users...');
								});
					};
				self.fetchAllUsers();
			//show userDetail by Id
				self.getSelectedUser = function(id) {
					console.log("-->UserController : calling getSelectedUser method : getting user with id : " + id);
					UserService.getSelectedUser(id).then(
							function(d) {
								self.user = d;
								$location.path('/ViewProfile');
							}, 
							function(errResponse) {
								console.error('Error while fetching User...');
							});
				};
				
				

				self.sendFriendRequest = function sendFriendRequest(friendId) {
					console.log("--> sendFriendRequest : "+friendId);
					UserService.sendFriendRequest(friendId).then(
					function(d) {
					self.friend = d;
				
					alert('Friend request sent...')
					},
					function(errResponse) {
					console.error('Error while friends...');
					});
					
							
						
				};
				
				
				
				
				
				
				//to create user

				self.createUser = function(user) {
					console.log("--> UserController : calling createUser method.");
					UserService.createUser(user).then(
					function(d) {
						self.user = d;
						alert('User Created Successfully...')
						$location.path('/MyProfile');
						},
						function(errResponse) {
						console.error('Error while creating user...');
							});
			  					};

			  		//update user
			  					

			  					self.updateUser = function(user, id) {
			  						console.log("--> UserController : calling updateUser method.");
			  						UserService.updateUser(user, id).then(function(d) {
			  							self.users = d;
			  							alert('User Updated...')
			  							$location.path('/MyProfile');
			  							}, function(errResponse) {
			  								console.error('--> UserController : Error while updating User...');
			  							});
			  					};
			  					   
			  //login	
			  					self.authenticateUser = function(user) {
			  						console.log("-->UserController : calling authenticateUser method.");
			  						UserService.authenticateUser(user).then(
			  							function(d) {
			  								self.user = d;
			  					$rootScope.currentUser =self.user;
			  								console.log (self.user.userId);
			  								console.log ($rootScope.currentUser.role);
			  								$location.path('/test');
			  									}, 
			  							function(errResponse) {
			  							console.error('Error while fetching User...');
			  							});
			  						};
		  					
		  	//logout
			  						
			  						self.logout = function(user,id) 
			  						{
			  							console.log("--> UserController : calling logout method.");
			  							alert(user.userId+id);
			  							UserService.logout(user,id);
			  							$rootScope.currentUser = {};
			  							//$rootScope.remove('currentUser');
			  							console.log("-->UserController : User Logged out.");
			  							$window.location.reload();
			  							$location.path('/index');
			  						}	
		  					
		  					
			
			self.reset = function() {
				console.log('submit a new User', self.user);
				self.user = {
						    errorCode : '',
							errorMessage : '',
							userId : '',
							name : '',
							password : '',
							role : '',
							email : '',
							description : '',
							gender : '',
							DOB : '',
							address : '',
							contactNo : '',
							IsOnline : '',
							status : '',
							image : '' 

				};
				$scope.myForm.$setPristine(); // reset form...
			};
		} ]);