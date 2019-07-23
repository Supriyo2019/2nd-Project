app.factory('ForumCommentService', ['$http', '$q', '$rootScope',
		function($http, $q, $rootScope) {
			console.log("ForumCommentService...")

			var BASE_URL = 'http://localhost:8081/Webz'
				return {
				fetchAllForumComments : function() {
					console.log("--> ForumCommentService : calling 'fetchAllForumComments' method.");
									return $http
									.get(BASE_URL + '/forumcomment')
									.then(function(response) {
									return response.data;
										}, 
									function(errResponse) {
									console.error('Error while fetching ForumComments');
									return $q.reject(errResponse);
										});
									},
									
							
									
									
	//selected forumCommentDetails				
									
									getSelectedForumComment : function(id) {
										console.log("-->ForumCommentService : calling getSelectedForumComment() method with id : " + id);
										return $http
											.get(BASE_URL+'/forumcommentListByForumId/'+ id)
											.then(function(response) {
												alert(response.data);
											$rootScope.selectedForumComment = response.data;
											
											return response.data;
												},
											function(errResponse) {
											console.error('Error while Fetching forumcomment.');
											return $q.reject(errResponse);
														});
											},
											
											
											
											
											
											
											
//create forumComment
											
											createForumComment : function(forumComment) {
													console.log("--> ForumCommentService : calling 'createForumComment' method.");
													return $http
													.post(BASE_URL + '/newForumComment/', forumComment)
													.then(function(response) {
													return response.data;
															}, 
													function(errResponse) {
														console.error('Error while creating forumComment');
														return $q.reject(errResponse);
															});
													},
											
											
													
													
													
													//update forumComment
													
													updateForumComment : function(forumComment, id) {
														console.log("--> ForumCommentService : calling 'updateForumComment' method.");
														return $http
																	.put(BASE_URL+'/EditforumComment/'+id, forumComment)
																	.then(function(response) {
																		return response.data;
																	},
																	function(errResponse) {
																		console.error('Error while updating ForumComment...');
																		return $q.reject(errResponse);
																	});
													},						
													
													
									
									
									
									
			};
			}]);