app.controller('FriendController', [ 'FriendService', 'UserService', '$scope',
		'$location', '$rootScope',
		function(FriendService, UserService, $scope, $location, $rootScope) {
			console.log("FriendController...");

			var self = this;
			self.friend = {
				id : '',
				userId : '',
				friendId : '',
				status : '' ,
				isOnline : ''
				
			};
			self.friends = [];
			
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
			
			
			
			
			
			
			//get my all frnd
			self.getMyFriends = function() {
				console.log("--> getMyFriends");
				var currentUser = $rootScope.currentUser
				if (typeof currentUser == 'undefined') {
					alert("Please Sign in to check Friend List...")
					console.log('User not logged in , to check Friend List...');
					$location.path('/login');
				};
				FriendService.getMyFriends().then(
						function(d) {
							self.friends = d;
							console.log("Got the Friendlist.");
						},
						function(errResponse) {
							console.error("Error while fetching Friends.");
						}
					);
			};
			
			self.getMyFriends();
			
			
			self.getSelectedFriend = function(id) {
				console.log("-->FriendController : calling getSelectedFriend method : getting friend with id : " + id);
				FriendService.getSelectedFriend(id).then(
						function(d) {
						self.friend = d;
						self.user = d;
						console.log('id '+ self.friend.friendId);
						$rootScope.friend= self.friend;
						$rootScope.user= self.user ;
						console.log(' r id '+ $rootScope.friend.friendId);
						$location.path('/FriendDetails');
							}, 
						function(errResponse) {
						console.error('Error while fetching Friend...');
							});
								};
			
			
			
								self.sendFriendRequest = function sendFriendRequest(friendId) {
									console.log("--> sendFriendRequest : "+friendId);
									FriendService.sendFriendRequest(friendId).then(
									function(d) {
									self.friend = d;
									
									alert('Friend request sent...')
									$location.path('/index');
									},
									function(errResponse) {
									console.error('Error while friends...');
									});
									
											
										
								};
			
			
			
			
								self.getNewFriendRequests = function() {
									console.log("--> getMyFriendRequests");
									var currentUser = $rootScope.currentUser
									if (typeof currentUser == 'undefined') {
										alert("Please Sign in to check Friend List...")
										console.log('User not logged in , to check Friend List...');
										$location.path('/Login');
									};
									FriendService.getNewFriendRequests().then(
											function(d) {
												self.newFriendRequests = d;
												$rootScope.newFriendRequests=self.newFriendRequests;
												console.log("Got the Friendlist.");
											},
											function(errResponse) {
												console.error("Error while fetching Friends.");
											}
										);
								};
			
								self.getNewFriendRequests();
			
			//accept frnd
								self.acceptFriend = function(f, id) {
									console.log("--> FriendController : calling nnnn  'acceptFriend' method with id : "+id);
							        FriendService
													.acceptFriend(f, id)
													.then(function(d) {
														self.friend = d;
														self.getMyFriends();
														alert('Friend request accepted successfully');
														$location.path('/index');
														
													},
													function(errResponse) {
														console.error("Error while updating friend");
													});
								};
			
			//reject friend
								
								  self.rejectFriend = function(f, id) {
										console.log("--> FriendController : calling   'rejectFriend' method with id : "+id);
										
										FriendService
														.rejectFriend(f, id)
														.then(function(d) {
															self.friend = d;
															self.getMyFriends();
															alert('Friend request rejected successfully');
															$location.path('/index');
															
														},
														function(errResponse) {
															console.error("Error while updating friend.");
														});
									};	
			
			//unfrnd
									self.unFriend = function(friend, id) {
										console.log("--> FriendController : calling 'unFriend' method with id : "+id);
										console.log("--> FriendController",self.friend);
										FriendService
														.unFriend(friend, id)
														.then(function(d) {
															self.friend = d;
															self.getMyFriends();
															$location.path('/index');
														},
														function(errResponse) {
															console.error("Error while updating friend.");
														});
									};	
			
			
			
			
			
			
} ]);