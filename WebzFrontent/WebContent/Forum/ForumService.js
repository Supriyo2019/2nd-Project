app.factory('ForumService', ['$http', '$q', '$rootScope',
		function($http, $q, $rootScope) {
			console.log("ForumService...")

			var BASE_URL = 'http://localhost:8081/Webz'
				return {
				fetchAllForums : function() {
					console.log("--> ForumService : calling 'fetchAllForums' method.");
									return $http
									.get(BASE_URL + '/forumlist')
									.then(function(response) {
									return response.data;
										}, 
									function(errResponse) {
									console.error('Error while fetching Forums');
									return $q.reject(errResponse);
										});
									},
						//forumDetails			
									getSelectedForum : function(id) {
										console.log("-->ForumService : calling getSelectedForum() method with id : " + id);
										return $http
											.get(BASE_URL+'/viewforum/'+ id)
											.then(function(response) {
											$rootScope.selectedForum = response.data;
											return response.data;
												},
											function(errResponse) {
											console.error('Error while Fetching forum.');
											return $q.reject(errResponse);
														});
											},	
											
//create forum
											
											createForum : function(forum) {
													console.log("--> ForumService : calling 'createForum' method.");
													return $http
													.post(BASE_URL + '/addforum/', forum)
													.then(function(response) {
													return response.data;
															}, 
													function(errResponse) {
														console.error('Error while creating forum');
														return $q.reject(errResponse);
															});
													},
													
													
													
													
													
													
													
													
													//create forumComment
													
													createForumComment : function(forumcomment)
													{
														console.log("-->ForumService : calling 'createForumComment' method.");
														return $http.post(BASE_URL + '/newForumComment/', forumcomment).then
														(function(response)
																{
																		return response.data;
																}, 
																function(errResponse) 
																{
																		console.error('Error while creating forumcomment');
																		return $q.reject(errResponse);
																}
														);
													},
													
													
													
													
													//update forum
													
													updateForum : function(forum, id) {
														console.log("--> ForumService : calling 'updateForum' method.");
														return $http
																	.put(BASE_URL+'/Editforum/'+id, forum)
																	.then(function(response) {
																		return response.data;
																	},
																	function(errResponse) {
																		console.error('Error while updating Forum...');
																		return $q.reject(errResponse);
																	});
													},									
													
													
													 // Show all Approved Forum to user...............
													
													fetchAllApprovedForums : function() {
														console.log("--> ForumService : calling 'fetchAllApprovedForums' method.");
														return $http
														.get(BASE_URL + '/approvedForumList')
														.then(function(response) 
														{
														return response.data;
														}, 
														function(errResponse) 
														{
														console.error('Error while fetching Forums');
														return $q.reject(errResponse);
														});
														},
													
								//approve forum by admin					
													
													approveForum : function(forum, id)
													{
														console.log("-->ForumService : calling approveForum() method : getting forum with id : " + id);
														return $http.put(BASE_URL+'/approveForum/'+ id, forum).then
																	(function(response) 
																	{
																		return response.data;
																	},
																	function(errResponse) 
																	{
																		console.log("Error while approving Forum");
																		return $q.reject(errResponse);
																	}
																	);
													},
													
													
							//reject forum by admin						
													
													rejectForum : function(forum, id) 
													{
														console.log("-->ForumService : calling rejectForum() method : getting forum with id : " + id);
														return $http.put(BASE_URL+'/rejectForum/'+ id, forum).then
																	(function(response)
																	{
																		return response.data;
																	},
																	function(errResponse)
																	{
																		console.log("Error while rejecting Forum");
																		return $q.reject(errResponse);
																	}
																    );
													},
													
													
													
													
													
													
													
													
													
													
													
													
													
													
													
													
													
													
													
													
													
													
													
											
			};
			}]);