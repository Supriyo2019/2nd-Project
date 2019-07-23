
app.controller('ForumCommentController', [
		'$scope',
		'ForumCommentService',
		'$location',
		'$rootScope',
		'$route',
		'$window',
		function($scope, ForumCommentService, $location, $rootScope,$route,$window) {
			console.log("ForumCommentController...")

			var self = this;
			self.forumComment = {
			    errorCode : '',
				errorMessage : '',
				forumCommentId : '',
				forumId : '',
				forumComment : '',
				forumCommentDate : '',
				userId : '',
				userName : '',
				
				}
			self.forumComments = [];
			
		//forumcommentlist	
			self.fetchAllForumComments = function() {
				console.log("--> ForumCommentController : calling fetchAllForumComments method.");
				ForumCommentService.fetchAllForumComments().then(
				function(d) {
				self.forumComments = d;
								}, function(errResponse) {
									console.error('Error while fetching forumComments...');
								});
					};
				self.fetchAllForumComments();
			
				
				
				
	//show forumCommentDetail by Id
				
				self.getSelectedForumComment = function(id) {
					console.log("-->ForumCommentController : calling getSelectedForumComment method : getting forumComment with id : " + id);
					ForumCommentService.getSelectedForumComment(id).then(
							function(d) {
							self.forumComment = d;
							console.log('id '+ self.forumComment.forumCommentId);
							$rootScope.forumComment= self.forumComment;
							console.log(' r id '+ $rootScope.forumComment.forumCommentId);
							$location.path('/ForumCommentDetails');
								}, 
							function(errResponse) {
							console.error('Error while fetching ForumComment...');
								});
									};
				
				
				

									//create forumComment
									self.createForumComment = function(forumComment) {
										console.log("--> ForumCommentController : calling createForumComment method.");
										ForumCommentService.createForumComment(forumComment).then(
										function(d) {
											self.forumComment = d;
											alert('ForumComment Created Successfully...')
											},
											function(errResponse) {
											console.error('Error while creating forumComment...');
												});
								  					};
			
			
			
			

						                            //update ForumComment
						
						          

														  					self.updateForumComment = function(forumComment, id) {
														  						console.log("--> ForumCommentController : calling updateForumComment method.");
														  						ForumCommentService.updateForumComment(forumComment, id).then(function(d) {
														  							self.forumComments = d;
														  							$location.path('/EditForumComment');
														  							}, function(errResponse) {
														  								console.error('--> ForumCommentController : Error while updating ForumComment...');
														  							});
														  					};
						
									
									
									
				
			
			
			
			self.reset = function() {
				console.log('submit a new ForumComment', self.forumComments);
				self.forumComment = {
					    errorCode : '',
						errorMessage : '',
						forumCommentId : '',
						forumId : '',
						forumComment : '',
						forumCommentDate : '',
						userId : '',
						userName : '',
						};
				$scope.myForm.$setPristine();
			};
		} ]);