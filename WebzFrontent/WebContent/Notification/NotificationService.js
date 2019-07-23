
app.factory
('NotificationService', 
['$http', '$q', '$rootScope',
function($http, $q, $rootScope) 
{
console.log("NotificationService");
var BASE_URL='http://localhost:8081/Webz'
return {
	
						
	
           getNotifications : function() 
           {
				console.log("-->getNotifications: calling 'getNotificationsNotViewed' method.");
				return $http.get(BASE_URL+'/getnotificationsnotviewed').then
				(function(response) 
						{
								console.log('fetching notification'+response.data);
								return response.data;
						},
						function(errResponse)
						{
								console.error('Error while getting Blog list...');
								return $q.reject(errResponse);
						}
				);
			},

			getNotification :function(notificationId){
				return $http.get(BASE_URL + "/getnotification/"+notificationId)
				.then(function(response) {
						$rootScope.getNotification = response.data;
						return response.data;
				}
				);
			},
			
			updateNotification :function(notificationId){
				return $http.put(BASE_URL + "/updatenotification/"+notificationId);
			},
			
			
			
			
			
	};
	

}]);