app.factory('BlogCommentService', ['$http', '$q', '$rootScope',
		function($http, $q, $rootScope) {
			console.log("BlogCommentService...")

			var BASE_URL = 'http://localhost:8081/Webz'
				return {
				fetchAllBlogComments : function() {
					console.log("--> BlogCommentService : calling 'fetchAllBlogComments' method.");
									return $http
									.get(BASE_URL + '/blogCommentlist')
									.then(function(response) {
									return response.data;
										}, 
									function(errResponse) {
									console.error('Error while fetching BlogCommentComments');
									return $q.reject(errResponse);
										});
									},
									
	//selected blogCommentDetails				
									
									getSelectedBlogComment : function(id) {
										console.log("-->BlogCommentService : calling getSelectedBlogComment() method with id : " + id);
										return $http
											.get(BASE_URL+'/BlogcommentListByBlogId/'+ id)
											.then(function(response) {
												alert(response.data);
											$rootScope.selectedBlogComment = response.data;
											
											return response.data;
												},
											function(errResponse) {
											console.error('Error while Fetching blogcomment.');
											return $q.reject(errResponse);
														});
											},	
											
											
											
											
											
//create blogComment
											
											createBlogComment : function(blogComment) {
													console.log("--> BlogCommentService : calling 'createBlogComment' method.");
													return $http
													.post(BASE_URL + '/addBlogComment/', blogComment)
													.then(function(response) {
													return response.data;
															}, 
													function(errResponse) {
														console.error('Error while creating blogComment');
														return $q.reject(errResponse);
															});
													},
											
											
													
													
													
													//update blogComment
													
													updateBlogComment : function(blogComment, id) {
														console.log("--> BlogCommentService : calling 'updateBlogComment' method.");
														return $http
																	.put(BASE_URL+'/EditblogComment/'+id, blogComment)
																	.then(function(response) {
																		return response.data;
																	},
																	function(errResponse) {
																		console.error('Error while updating BlogComment...');
																		return $q.reject(errResponse);
																	});
													},						
													
													
													
													
													
													
													
													
													
													
													
									
									
			};

}]);