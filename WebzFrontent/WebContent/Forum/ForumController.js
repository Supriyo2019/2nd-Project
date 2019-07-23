app.controller('ForumController', [
		'$scope',
		'ForumService',
		'ForumCommentService',
		'$location',
		'$rootScope',
		'$route',
		'$window',
		function($scope, ForumService,ForumCommentService, $location, $rootScope,$route,$window) {
			console.log("ForumController...")

			var self = this;
			self.forum = {
			    errorCode : '',
				errorMessage : '',
				forumId : '',
				forumName : '',
				forumDescription : '',
				userId : '',
				userName : '',
				forumCreationDate : '',
				forumStatus : '',
				forumCountComment : '',
				forumUserCount : '',
				}
			self.forums = [];
			self.forumComments = [];
			
			
			
			
			
			
			//ForumList
			self.fetchAllForums = function() {
				console.log("--> ForumController : calling fetchAllForums method.");
				ForumService.fetchAllForums().then(
				function(d) {
				self.forums = d;
								}, function(errResponse) {
									console.error('Error while fetching forums...');
								});
					};
				self.fetchAllForums();
				
				
				
				
				
				
				
			
			//FORUMDETAILS
				
			
				self.getSelectedForum = function(id) {
					console.log("-->ForumController : calling getSelectedForum method : getting forum with id : " + id);
					ForumService.getSelectedForum(id).then(
							function(d) {
							self.forums = d;
							console.log('id '+ self.forums.forumId);
							$rootScope.forum= self.forums;
							console.log(' r id '+ $rootScope.forum.forumId);
							$location.path('/ForumDetails');
							self.getSelectedForumComment(id);
							console.log('comments '+$rootScope.forumcomment);
								}, 
							function(errResponse) {
							console.error('Error while fetching Forum...');
								});
									};
			
									
									
									
									
									
									
									
									//create forum
									self.createForum = function(forum) {
										console.log("--> ForumController : calling createForum method.");
										ForumService.createForum(forum).then(
										function(d) {
											self.forums = d;
											alert('Forum Created Successfully...');
											$location.path('/ForumView');
											},
											function(errResponse) {
											console.error('Error while creating forum...');
												});
								  					};
								  					
								  					
								  					
								  					
								  					
								  					
								  					
								  					
								  					
								  					
								  					
								  					
								  	      //forumComments Details by forumId		

								  					self.getSelectedForumComment = function(id) {
														console.log("-->ForumCommentController : calling getSelectedForumComment method : getting forumComment with id : " + id);
														ForumCommentService.getSelectedForumComment(id).then(
																function(d) {
																self.forumComments = d;
																console.log(self.forumComments);
																console.log('id '+ self.forumComments.forumCommentId);
																$rootScope.forumComments= self.forumComments;
																console.log(' r id '+ $rootScope.forumComments.forumCommentId);
																
																	}, 
																function(errResponse) {
																console.error('Error while fetching forumComment...');
																	});
																		};
															
								  					
								  					
								  					
								  					
								  					
								  				//createForumComment	

															  self.createForumComment = function(forumComment) {
																	forumComment.forumId= $rootScope.forum.forumId ;
																	console.log("-->ForumController : calling 'createForumComment' method.", forumComment);
																	console.log("-->ForumController ForumId :" +forumComment.forumId);
																	ForumService.createForumComment(forumComment).then
																				(function(d) 
																				{
																					console.log('Current User :',$rootScope.currentUser.userId)
																					self.forumComment = d;
																					console.log(self.forumComment)
																					self.getSelectedForumComment(self.forumComment.forumId);
																					$location.path('/ForumDetails');
																				},
																				function(errResponse) {
																					console.error('Error while creating forumComment...');
																				}
																				);
																};	
								  					
								  					
								  					
								  					
								  					
								  					
								  					
								  					
								  					
								  					
			//update Forum
								  					self.updateForum = function(forum, id) {
								  						console.log("--> ForumController : calling updateForum method.");
								  						ForumService.updateForum(forum, id).then(function(d) {
								  							self.forums = d;
								  							$location.path('/ApproveForum');
								  							}, function(errResponse) {
								  								console.error('--> ForumController : Error while updating Forum...');
								  							});
								  					};
								  					
								  					// Show Approved Forum to user.....	
													
													self.fetchAllApprovedForums = function() {
								  						console.log("--> ForumController : calling fetchAllAprovedForums method.");
								  						ForumService.fetchAllApprovedForums().then(
								  						function(d) {
								  						self.approvedForums = d;
								  								}, 
								  						function(errResponse) {
								  						console.error('Error while fetching Forums...');
								  								});
								  					};
								  					
								  					self.fetchAllApprovedForums();
			
			//approve forum by admin
								  					self.approveForum = function(forum, id)
								  					{
								  						console.log("-->ForumController : calling approveForum() method : Forum id is : " + id);
								  						console.log("-->ForumController",self.forum);
								  						ForumService.approveForum(forum, id).then
								  						(
								  								function(d)
								  								{
								  								alert('Accept Forum'),
								  								self.forum=d,
								  								self.fetchAllForums();
								  								$location.path('/ForumView');
								  								},
								  								function(errResponse) 
								  								{
								  									console.error("Error while approving forum...")
								  								}
								  						);
								  					};			  					
								  					
								  					
								  		//reject forum by admin			

								  					self.rejectForum = function(forum, id) 
								  					{
								  						console.log("-->ForumController : calling rejectForum() method : Forum id is : " + id);
								  						console.log("-->ForumController",self.forum);
								  						ForumService.rejectForum(forum, id).then
								  						(
								  								function(d)
								  								{
								  								alert('Rejected Forum'),
								  								self.forum=d,
								  								self.fetchAllForums();
								  								$location.path('/ForumView');
								  								},
								  								function(errResponse) 
								  								{
								  									console.error("Error while rejecting forum...")
								  								}
								  						);
								  					};			
								  					
								  					
								  					
								  					
								  					
								  					
								  					
								  					
								  					
								  					
								  					
								  					
			
			
			
			
			
			self.reset = function() {
				console.log('submit a new Forum', self.forums);
				self.forum = {
					    errorCode : '',
						errorMessage : '',
						forumId : '',
						forumName : '',
						forumDescription : '',
						userId : '',
						userName : '',
						forumCreationDate : '',
						forumStatus : '',
						forumCountComment : '',
						forumUserCount : '',
						};
				$scope.myForm.$setPristine();
			};
		} ]);