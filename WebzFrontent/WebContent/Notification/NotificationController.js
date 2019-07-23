'use strict'
app.controller('NotificationController', ['NotificationService', '$scope', '$location', '$rootScope',  
function(NotificationService, $scope, $location, $rootScope)
{
			console.log('NotificationController...');
			var self = this;
			
			self.notification =
			{
			notificationId : '',  
			blogTitle : '', 
			rejectionReason : '',
			approvedOrRejected : '', 
			viewed : '', 
			userId : '',
			errorCode : '',
			errorMessage : ''
			};

			self.notifications = [];


			 self.getNotifications=function(){
				NotificationService.getNotifications().then(
						function(d){
							console.log('details '+d);
							$rootScope.notifications=d ;
							$rootScope.notificationCount=$rootScope.notifications.length;
							console.log("--> notificationCount "+$rootScope.notificationCount);
						},
						function(response){
							if(response.status==401)
								$location.path('/login')
						})
			 }
			
		self.getNotifications();
			
		
		
		
		
		self.getNotification=function(notificationId){
            NotificationService.getNotification(notificationId).then(
			    			function(d){
							    self.notification=d;
							    console.log(' fetch data '+d);
								$rootScope.notification=self.notification;
							},
			    			function(response){
			    				if(response.status==401)
			    					$location.path('/login')
			    			})
			    }
        
			

} 
]
);