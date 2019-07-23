app.factory('BlogService', ['$http', '$q', '$rootScope',
		function($http, $q, $rootScope) {
			console.log("BlogService...")

			var BASE_URL = 'http://localhost:8081/Webz'
				return {
				fetchAllBlogs : function() {
					console.log("--> BlogService : calling 'fetchAllBlogs' method. ??? ");
									return $http
									.get(BASE_URL + '/bloglist')
									.then(function(response) {
										
										console.log(response.data);
										console.log('---------');
									return response.data;
										}, 
									function(errResponse) {
									console.error('Error while fetching Blogs');
									return $q.reject(errResponse);
										});
									},
									//selected blogDetails				
									
									getSelectedBlog : function(id) {
										console.log("-->BlogService : calling getSelectedBlog() method with id : " + id);
										return $http
											.get(BASE_URL+'/viewblog/'+ id)
											.then(function(response) {
											$rootScope.selectedBlog = response.data;
											return response.data;
												},
											function(errResponse) {
											console.error('Error while Fetching blog.');
											return $q.reject(errResponse);
														});
											},	
									
									
											//create blog by blog Id
											
											createBlog : function(blog) {
													console.log("--> BlogService : calling 'createBlog' method.");
													return $http
													.post(BASE_URL + '/addBlog/', blog)
													.then(function(response) {
													return response.data;
															}, 
													function(errResponse) {
														console.error('Error while creating blog');
														return $q.reject(errResponse);
															});
													},
													
													
													//create BlogComment 
													
													createBlogComment : function(blogComment)
													{
														console.log("-->BlogService : calling 'createBlogComment' method.");
														return $http.post(BASE_URL + '/addBlogComment/', blogComment).then
														(function(response)
																{
																		return response.data;
																}, 
																function(errResponse) 
																{
																		console.error('Error while creating blogComment');
																		return $q.reject(errResponse);
																}
														);
													},
																
													
													
									
								
																		
																						
																		
																		
																		//update blog
																							
																							updateBlog : function(blog, id) {
																								console.log("--> BlogService : calling 'updateBlog' method.");
																								return $http
																											.put(BASE_URL+'/Editblog/'+id, blog)
																											.then(function(response) {
																												return response.data;
																											},
																											function(errResponse) {
																												console.error('Error while updating Blog...');
																												return $q.reject(errResponse);
																											});
																							},						
																		
																							// Display	All Approved Blogs..........			
																							
																							fetchAllApprovedBlogs : function() {
																								console.log("--> BlogService : calling 'fetchAllApprovedBlogs' method.");
																								return $http
																								.get(BASE_URL + '/approvedBloglist')
																								.then(function(response) 
																								{
																								return response.data;
																								}, 
																								function(errResponse) 
																								{
																								console.error('Error while fetching Uss');
																								return $q.reject(errResponse);
																								});
																								},
																							
																							
																							
																							
																							
																			//approve blog by admin				
																							
																							approveBlog : function(blog, id)
																							{
																								console.log("-->BlogService : calling approveBlog() method : getting blog with id : " + id);
																								return $http.put(BASE_URL+'/approvedBlog/'+ id, blog).then
																											(function(response) 
																											{
																												return response.data;
																											},
																											function(errResponse) 
																											{
																												console.log("Error while approving Blog");
																												return $q.reject(errResponse);
																											}
																											);
																							},												
																							
																							
																							
																							
																							rejectBlog : function(blog, id) 
																							{
																								console.log("-->BlogService : calling rejectBlog() method : getting blog with id : " + id);
																								return $http.put(BASE_URL+'/rejectedBlog/'+ id, blog).then
																											(function(response)
																											{
																												return response.data;
																											},
																											function(errResponse)
																											{
																												console.log("Error while rejecting Blog");
																												return $q.reject(errResponse);
																											}
																										    );
																							},			
																							
																							
																							
																							
																							
																							
																							
																							
																							
																							
																							
																							// likeBlog by blog Id...................

																							likeBlog : function(blog, id) 
																							{
																								console.log("-->BlogService : calling likeBlog() method : getting blog with id : " + id);
																								return $http.put(BASE_URL+'/likeBlog/'+id, blog).then
																											(function(response) 
																											{
																												return response.data;
																											},
																											function(errResponse)
																											{
																												console.log("Error while liking Blog.");
																												return $q.reject(errResponse);
																											});
																											
																							},

																							// fetchAllBlogLikes by blog id...........
																							fetchAllBlogLikes : function(id)
																							{
																								console.log("-->BlogService : calling 'fetchAllBlogLikes' method for id : " + id);
																								return $http.get(BASE_URL + '/bloglike/'+id).then
																								(function(response) 
																										{
																												$rootScope.selectedBlogLikes = response.data;
																												return response.data;
																										}, 
																											function(errResponse) {
																												console.error('Error while fetching BlogLikes');
																												return $q.reject(errResponse);
																											});
																					                        	},
																							
																							
																							
																							
																							
																							
																							
																							
																							
																							
																							
																							
																							
																							
																							
																							

																										};

																							}]);