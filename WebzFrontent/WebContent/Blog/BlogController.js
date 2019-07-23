app.controller('BlogController', [
		'$scope',
		'BlogService',
		'BlogCommentService',
		'$location',
		'$rootScope',
		'$route',
		'$window',
		function($scope, BlogService,BlogCommentService, $location, $rootScope,$route,$window) {
			console.log("BlogController...")

			var self = this;
			self.blog = {
			    errorCode : '',
				errorMessage : '',
				blogId : '',
				blogContent : '',
				blogTitle : '',
				blogDate : '',
				userId : '',
				blogStatus : '',
				blogCountLike : '',
				blogCommentCount : '',
				}
			self.blogs = [];
			self.blogComments = [];
			
			

			self.blogLike={
					
					errorCode : '',
		    		errorMessage : '',
	 				blogLikeId:'',
					userId:'',
					blogId:'',
					userName:'',
					blogLikeDate:'',
	    		
	    	}
	    
	    self.blogLikes=[];
			
			
			
			//fetching all blogs
			self.fetchAllBlogs = function() {
				console.log("--> BlogController : calling fetchAllBlogs method.");
				BlogService.fetchAllBlogs().then(
				function(d) {
				self.blogs = d;
				console.log(self.blogs);
								}, function(errResponse) {
									console.error('Error while fetching blogs...');
								});
					};
				self.fetchAllBlogs();
				
				
				
				
				
				
				
				//show blogDetail by Id
					
				self.getSelectedBlog = function(id) {
					console.log("-->BlogController : calling getSelectedBlog method : getting blog with id : " + id);
					BlogService.getSelectedBlog(id).then(
							function(d) {
								self.blogs = d;
							console.log('id '+ self.blogs.blogId);
							$rootScope.blog= self.blogs;
							console.log(' r id '+ $rootScope.blog.blogId);
							$location.path('/BlogDetails');
							self.getSelectedBlogComment(id);
							console.log('comments '+$rootScope.blogcomment);
								}, 
							function(errResponse) {
							console.error('Error while fetching Blog...');
								});
									};
									
									
									
									
									
									
									
									
									
									
				
				//create blog
									self.createBlog = function(blog) {
										console.log("--> BlogController : calling createBlog method.");
										BlogService.createBlog(blog).then(
										function(d) {
											self.blogs = d;
											alert('Blog Created Successfully...')
											$location.path('/index');
											},
											function(errResponse) {
											console.error('Error while creating blog...');
												});
								  					};	
								  					
								  					
								  					
								  					
								  					
								  					
								  					
								  					self.getSelectedBlogComment = function(id) {
														console.log("-->BlogCommentController : calling getSelectedBlogComment method : getting blogComment with id : " + id);
														BlogCommentService.getSelectedBlogComment(id).then(
																function(d) {
																self.blogComments = d;
																console.log(self.blogComment);
																console.log('id '+ self.blogComments.blogCommentId);
																$rootScope.blogComments= self.blogComments;
																console.log(' r id '+ $rootScope.blogComments.blogCommentId);
																
																	}, 
																function(errResponse) {
																console.error('Error while fetching BlogComment...');
																	});
																		};	
																		
																		
																		
																		
																		
																	//created blogComment 	
																		self.createBlogComment = function(blogComment) {
																			blogComment.blogId= $rootScope.blog.blogId ;
																			console.log("-->BlogController : calling 'createBlogComment' method.", blogComment);
																			console.log("-->BlogController BlogId :" +blogComment.blogId);
																			BlogService.createBlogComment(blogComment).then
																						(function(d) 
																						{
																							console.log('Current User :',$rootScope.currentUser.userId)
																							self.blogComment = d;
																							console.log(self.blogComment)
																							self.getSelectedBlogComment(self.blogComment.blogId);
																							$location.path('/BlogDetails');
																							
																						},
																						function(errResponse) {
																							console.error('Error while creating blogComment...');
																						}
																						);
																		};				
								  									  					
								  									  					
								  									  					
								  									  					
								  									  					
								  									  					
								  									  					
								  									  					
				
				
						
				                            //update Blog
				
				          

												  					self.updateBlog = function(blog, id) {
												  						console.log("--> BlogController : calling updateBlog method.");
												  						BlogService.updateBlog(blog, id).then(function(d) {
												  							self.blogs = d;
												  							$location.path('/ApproveBlog');
												  							}, function(errResponse) {
												  								console.error('--> BlogController : Error while updating Blog...');
												  							});
												  					};
												  					
												  					
												  					
												  					
				
												  					self.fetchAllApprovedBlogs = function() {
												  						console.log("--> BlogController : calling fetchAllAprovedBlogs method.");
												  						BlogService.fetchAllApprovedBlogs().then(
												  						function(d) {
												  						self.approvedBlogs = d;
												  								}, 
												  						function(errResponse) {
												  						console.error('Error while fetching Blogs...');
												  								});
												  					};
												  					
												  					self.fetchAllApprovedBlogs();
												  					
												  					
												  					
												  					
												  					
												  					
				
												  					
												  					self.approveBlog = function(blog, id)
												  					{
												  						console.log("-->BlogController : calling approveBlog() method : Blog id is : " + id);
												  						console.log("-->BlogController",self.blog);
												  						BlogService.approveBlog(blog, id).then
												  						(
												  								function(d)
												  								{
												  								alert('Accept Blog?'),
												  								self.blog=d,
												  								self.fetchAllBlogs();
												  								$location.path('/BlogView');
												  								},
												  								function(errResponse) 
												  								{
												  									console.error("Error while approving blog...")
												  								}
												  						);
												  					};	  					
												  					
												  					
												  					
												  					self.rejectBlog = function(blog, id) 
												  					{
												  						console.log("-->BlogController : calling rejectBlog() method : Blog id is : " + id);
												  						console.log("-->BlogController",self.blog);
												  						BlogService.rejectBlog(blog, id).then
												  						(
												  								function(d)
												  								{
												  								alert('Reject Blog?'),
												  								self.blog=d,
												  								self.fetchAllBlogs();
												  								$location.path('/BlogView');
												  								},
												  								function(errResponse) 
												  								{
												  									console.error("Error while rejecting blog...")
												  								}
												  						);
												  					};
												  					
												  					
												  					
												  					
												  					
												  					
				
				
												  				//****************************************** Blog Like ************************************************//		
												  					
																							
												  				//like blog by blog id................						
																	self.likeBlog = function(blog, id)
																	{
																		console.log("-->BlogController : calling likeBlog() method : Blog id is : "+id);
																		console.log("-->BlogController", self.blog);
																		BlogService.likeBlog(blog, id).then
																		( function() 
																			{
																			self.getSelectedBlog(id);
																			self.listblogs;
																			self.fetchAllBlogLikes(id);
																			$location.path('/BlogDetails');
																			} ,
																			function(errResponse)
																			{
																				console.error("Error while liking the blog...");
																			});
																		
																		
																	};
																	
																	
												//	fetchAllBlogLikes by blog id.............				
																	self.fetchAllBlogLikes = function(id)
																	{
																		console.log("-->BlogController : calling fetchAllBlogLikes method with id : "+ id);
																		BlogService.fetchAllBlogLikes(id).then
																		(function(d) 
																		{
																			self.blogLikes = d;
																		},
																		function(errResponse) 
																		{
																			console.error('Error while fetching BlogLikes...');
																		}
																		);
																	};
																					
																	  					
												  					
												  					
												  					
												  					
												  					
												  					
												  					
												  					
												  					
												  					
												  					
												  					
												  					
												  					
												  					
												  					
												  					
												  					
												  					
												  					
												  					
												  					
												  					
				
				
				
				
				
					self.reset = function() {
						console.log('submit a new Blog', self.blogs);
						self.blog = {
							    errorCode : '',
								errorMessage : '',
								blogId : '',
								blogContent : '',
								blogTitle : '',
								blogDate : '',
								userId : '',
								blogStatus : '',
								blogCountLike : '',
								blogCommentCount : '',
								

						};
						$scope.myForm.$setPristine(); // reset form...
					};
		} ]);