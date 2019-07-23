app.controller('BlogCommentController', [
		'$scope',
		'BlogCommentService',
		'$location',
		'$rootScope',
		'$route',
		'$window',
		function($scope, BlogCommentService, $location, $rootScope,$route,$window) {
			console.log("BlogCommentController...")

			var self = this;
			self.blogComment = {
			    errorCode : '',
				errorMessage : '',
				blogCommentId : '',
				blogId : '',
				userId : '',
				blogComment : '',
				userName : '',
				blogCommentDate : '',
				}
			self.blogComments = [];
			
			
			//fetching all blogComments
			self.fetchAllBlogComments = function() {
				console.log("--> BlogCommentController : calling fetchAllBlogComments method.");
				BlogCommentService.fetchAllBlogComments().then(
				function(d) {
				self.blogComments = d;
								}, function(errResponse) {
									console.error('Error while fetching blogComments...');
								});
					};
				self.fetchAllBlogComments();
			
				
				
				
			
				//show blogCommentDetail by Id
				
				self.getSelectedBlogComment = function(id) {
					console.log("-->BlogCommentController : calling getSelectedBlogComment method : getting blogComment with id : " + id);
					BlogCommentService.getSelectedBlogComment(id).then(
							function(d) {
							self.blogComment = d;
							console.log('id '+ self.blogComment.blogCommentId);
							$rootScope.blogComment= self.blogComment;
							console.log(' r id '+ $rootScope.blogComment.blogCommentId);
							//$location.path('/BlogCommentDetails');
								}, 
							function(errResponse) {
							console.error('Error while fetching BlogComment...');
								});
									};
			
									
									
									
									
									
									
									
			
									//create blogComment
									self.createBlogComment = function(blogComment) {
										console.log("--> BlogCommentController : calling createBlogComment method.");
										BlogCommentService.createBlogComment(blogComment).then(
										function(d) {
											self.blogComment = d;
											alert('BlogComment Created Successfully...')
											},
											function(errResponse) {
											console.error('Error while creating blogComment...');
												});
								  					};
			
			
			
			

						                            //update BlogComment
						
						          

														  					self.updateBlogComment = function(blogComment, id) {
														  						console.log("--> BlogCommentController : calling updateBlogComment method.");
														  						BlogCommentService.updateBlogComment(blogComment, id).then(function(d) {
														  							self.blogComments = d;
														  							$location.path('/EditBlogComment');
														  							}, function(errResponse) {
														  								console.error('--> BlogCommentController : Error while updating BlogComment...');
														  							});
														  					};
						
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			

			self.reset = function() {
				console.log('submit a new BlogComment', self.blogComments);
				self.blogComment = {
						 errorCode : '',
							errorMessage : '',
							blogCommentId : '',
							blogId : '',
							userId : '',
							blogComment : '',
							userName : '',
							blogCommentDate : '',
							}
						$scope.myForm.$setPristine(); // reset form...
			};
} ]);