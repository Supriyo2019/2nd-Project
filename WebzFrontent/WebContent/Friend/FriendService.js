app
		.factory('FriendService',['$http','$q','$rootScope',
						function($http, $q, $rootScope) {
							console.log("FriendService...");

							var BASE_URL = 'http://localhost:8081/Webz'
							return {
								getMyFriends : function() {
									return $http
											.get(BASE_URL + '/MyFriends')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error("-->updateFriendRequest : Error while fetching friends.");
														return $q
																.reject(errResponse);
													});
								},
								
								
								
								getSelectedFriend : function(id) {
									console.log("-->FriendService : calling getSelectedFriend() method with id : " + id);
									return $http
												.get(BASE_URL+'/user/'+ id)
												.then(function(response) {
													$rootScope.selectedUser = response.data;
													return response.data;
												},
												function(errResponse) {
													console.error('Error while Fetching Profile.');
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
								
								
								
								
								
								getNewFriendRequests : function() {
									return $http
											.get(BASE_URL + '/newFriendRequest')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error("-->updateFriendRequest : Error while fetching friends.");
														return $q
																.reject(errResponse);
													});
								},
								
								//accept friend
								acceptFriend : function(f, id) {
									console.log("--> FriendService : calling 'acceptFriend' method with id : "+id);
									console.log (f);
									return $http.put(BASE_URL+'/acceptFriend/'+id, f)
									.then(function(response) {
												return response.data;
											},
											function(errResponse) {
												console.error("-->FriendService : Error while accepting friend request.")
											});
								},
								
								//reject friend		
								
								
								rejectFriend : function(f, id) {
									console.log("--> FriendService : calling 'rejectFriend' method with id : "+id);
									console.log (f);
									return $http.put(BASE_URL+'/rejectFriend/'+id, f)
									.then(function(response) {
												return response.data;
											},
											function(errResponse) {
												console.error("-->FriendService : Error while rejecting friend request.")
											});
								},
								
								
								
								
								//unfrnd
								unFriend : function(friend, id) {
									console
											.log("--> FriendService : calling 'unFriend' method with id : "+ id);
									return $http.put(
													BASE_URL+ '/unFriend/'+ id, friend)
															
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error("-->FriendService : Error while unFriending existing friend.")
													});
								},
								
								
								
								
								
								
								
								
								
							};
						} ]);