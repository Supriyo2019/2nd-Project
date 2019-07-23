var app = angular.module("myApp", ['ngRoute']);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider   
    
    .when('/UserView', {
			templateUrl: 'User/UserView.html',
			controller: 'UserController as ctrl'
		

})
	.when('/ViewProfile', {
		templateUrl: 'User/ViewProfile.html',
		controller: 'UserController as ctrl'
	})
	.when('/MyProfile', {
		templateUrl: 'User/MyProfile.html',
		controller: 'UserController as ctrl'
	})
	.when('/AddUser', {
			templateUrl: 'User/AddUser.html',
			controller: 'UserController as ctrl'
		})
		.when('/EditUser', {
		templateUrl: 'User/EditUser.html',
		controller: 'UserController as ctrl'
		})
		.when('/Login', {
		templateUrl: 'User/Login.html',
		controller: 'UserController as ctrl'
		})
		.when('/logout', {
			templateUrl: 'User/logout.html',
			controller: 'UserController as ctrl'
		})
		
		
		// blog
		
		
		 .when('/BlogView', {
			templateUrl: 'Blog/BlogView.html',
			controller: 'BlogController as ctrl'
		

})
.when('/BlogDetails', {
		templateUrl: 'Blog/BlogDetails.html',
		controller: 'BlogController as ctrl'
	})
		
		.when('/AddBlog', {
		templateUrl: 'Blog/AddBlog.html',
		controller: 'BlogController as ctrl'
	})
	.when('/ApproveBlog', {
		templateUrl: 'Blog/ApproveBlog.html',
		controller: 'BlogController as ctrl'
	})
		
	.when('/PendingBlog', {
		templateUrl: 'Blog/PendingBlog.html',
		controller: 'BlogController as ctrl'
	})	
	.when('/EditBlog', {
		templateUrl: 'Blog/EditBlog.html',
		controller: 'BlogController as ctrl'
		})
		
		.when('/MyAllBlog', {
		templateUrl: 'Blog/MyAllBlog.html',
		controller: 'BlogController as ctrl'
		})
		
		//BlogComment
		 .when('/BlogCommentView', {
			templateUrl: 'BlogComment/BlogCommentView.html',
			controller: 'BlogCommentController as ctrl'
		 })
		 
		 .when('/BlogCommentDetails', {
			templateUrl: 'BlogComment/BlogCommentDetails.html',
			controller: 'BlogCommentController as ctrl'
		})
		 
		 	.when('/AddBlogComment', {
		templateUrl: 'BlogComment/AddBlogComment.html',
		controller: 'BlogCommentController as ctrl'
	})
	 .when('/EditBlogComment', {
			templateUrl: 'BlogComment/EditBlogComment.html',
			controller: 'BlogCommentController as ctrl'
		})
		 
	//Forum
		 .when('/ForumView', {
			templateUrl: 'Forum/ForumView.html',
			controller: 'ForumController as ctrl'
		})
		 .when('/ApproveForum', {
			templateUrl: 'Forum/ApproveForum.html',
			controller: 'ForumController as ctrl'
		})
		 .when('/ForumDetails', {
			templateUrl: 'Forum/ForumDetails.html',
			controller: 'ForumController as ctrl'
		})
		
		 .when('/AddForum', {
			templateUrl: 'Forum/AddForum.html',
			controller: 'ForumController as ctrl'
		})
		
		
		 .when('/EditForum', {
			templateUrl: 'Forum/EditForum.html',
			controller: 'ForumController as ctrl'
		})
		
		
		//ForumComment
		
		.when('/ForumCommentView', {
			templateUrl: 'ForumComment/ForumCommentView.html',
			controller: 'ForumCommentController as ctrl'
		})
		
	.when('/ForumCommentDetails', {
			templateUrl: 'ForumComment/ForumCommentDetails.html',
			controller: 'ForumCommentController as ctrl'
		})
		.when('/AddForumComment', {
			templateUrl: 'ForumComment/AddForumComment.html',
			controller: 'ForumCommentController as ctrl'
		})
		.when('/EditForumComment', {
			templateUrl: 'ForumComment/EditForumComment.html',
			controller: 'ForumCommentController as ctrl'
		})
		
		//Job
		
		.when('/viewJob', {
	templateUrl: 'Job/viewJob.html',
	controller: 'JobController as m'
})
.when('/addJob', {
	templateUrl: 'Job/addJob.html',
	controller: 'JobController as m'
})

.when('/viewJobById', {
	templateUrl: 'Job/viewJobById.html',
	controller: 'JobController as m'
})
.when('/updateJob', {
	templateUrl: 'Job/updateJob.html',
	controller: 'JobController as m'
})

.when('/jobApplied', {
	templateUrl: 'Job/jobApplied.html',
	controller: 'JobController as m'
})
.when('/allJobApplications', {
	templateUrl: 'Job/allJobApplications.html',
	controller: 'JobController as m'
})



.when('/ImageUpload', {
		templateUrl : 'Image/ImageUpload.html',
		controller : 'ImageController as ctrl'
	})


		//Friend
		.when('/FriendView', {
			templateUrl: 'Friend/FriendView.html',
			controller: 'FriendController as ctrl'
		})
		
		.when('/FriendDetails', {
			templateUrl: 'Friend/FriendDetails.html',
			controller: 'FriendController as ctrl'
		})
		.when('/FriendRequest', {
			templateUrl: 'Friend/FriendRequest.html',
			controller: 'FriendController as ctrl'
		})
		
		
		//Chat
		.when('/chat', {
			templateUrl : 'Chat/chat.html',
			controller : 'ChatController as ctrl'
		})
		
		
		//notification
		.when('/notificationdetail', {
			templateUrl : 'Notification/notificationdetail.html',
			controller : 'NotificationController as ctrl'
		})
		
		
}]);



app.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }]);
