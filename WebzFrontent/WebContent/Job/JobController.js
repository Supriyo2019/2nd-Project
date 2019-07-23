app.controller('JobController', [
		'$scope',
		'JobService',
		'$location',
		'$rootScope',
		'$route',
		'$window',
		function($scope, JobService, $location, $rootScope,$route,$window) {
			console.log("JobController...")

		var self = this;
		self.jobcomment = {
		errorCode : '',
		errorMessage : '',
		jobId : '',
		companyName : '',
		location : '',
		description : '',
		jobDate : '',
		status : '',
		noOfApplicants: '',
		
		
		}
		
		self.jobs = [];
		
		self.jobApplication = {
				
				jobApplicationId : '',
				userid : '',
				Jobid : '',
				status : '',
				remarks : '',
				errorCode: '',
				errorMessage: ''
		};
		
		self.jobApplications = [];
		
		
		
		self.listJobs = function() {
			console.log("-->JobController : calling 'listJobs' method.");
			JobService
						.listJobs()
						.then(function(d) {
							self.jobs = d;
						},
						function(errResponse) {
							console.error("Error while getting job list.")
						});
		};		
		self.listJobs();
		
		
		
		self.listOpenJobs = function() {
			console.log("-->JobController : calling 'listOpenJobs' method.");
			JobService
						.listOpenJobs()
						.then(function(d) {
							self.vacantJobs = d;
						},
						function(errResponse) {
							console.error("Error while getting job list.")
						});
		};		
		self.listOpenJobs();
		
		
		self.getMyAppliedJobs = function() {
			console.log('calling the method getMyAppliedJobs...');
			JobService.getMyAppliedJobs().then
			(function(d) {
			self.jobApplication = d;
						},
						function(errResponse) {
							console.error('Error while fetching all applied jobs...');
						});
		};
		
		self.getMyAppliedJobs();
		
		
		self.fetchAllJobApplications = function() {
			console.log("--> JobController : calling fetchAllJobApplications method");
			JobService.fetchAllJobApplications().then(
			function(s) {
			self.jobApplications = s;
							}, function(errResponse) {
								console.error('Error while fetchingBlogs...');
							});
				};
				self.fetchAllJobApplications();
				
				
				
				
		
		self.createJob = function(job) {
			console.log("-->JobController : calling 'createJob' method.");
			JobService
						.createJob(job)
						.then(function(d) {
							self.job = d;
							alert('Post job?')
							$location.path('/list_jobs');
						},
						function(errResponse) {
							console.error('Error while posting new Job...');
						});
		};
		
		
		

			self.updateJob = function(job, id) {
				console.log("--> jobController : calling updateJob method.")
				JobService.updateJob(job, id).then(
			function(d) {
				alert('Job updated Successfully...')
				console.log(self.job);
				$location.path('/viewJob');
				}, function(errResponse) {
						console.error('--> jobController : Error while updating Job...');
					});
			};

		
		
		
		self.getJob = function(id) {
			console.log("-->JobController : calling 'getJob' method with jobId : "+id);
			JobService
						.getJob(id)
						.then(function(d) {
							self.job = d;
							$location.path('/viewJobById');
						},
						function(errResponse) {
							console.error('Error while fetching job details...')
						});
		};
		
		
		
		self.rejectJobApplication = function(jobApplication, id) 
		{
			console.log("-->JobController : calling rejectJobApplication() method : JobApplication jobApplicationId is : " + id);
			console.log("-->JobController",self.jobApplication);
			JobService.rejectJobApplication(jobApplication, id).then
			(
					function(d)
					{
					alert('Reject Job Application?'),
					self.jobApplication=d,
					self.fetchAllJobApplications(id);
					},
					function(errResponse) 
					{
						console.error("Error while rejecting job application...")
					}
			);
		};
		
		
		
		
		self.approveJobApplication = function(jobApplication, id)
		{
			console.log("-->JobController : calling approveJobApplication() method : job application with job application id is : " + id);
			console.log("-->JobController",self.jobApplication);
			JobService.approveJobApplication(jobApplication, id).then
			(
					function(d)
					{
					alert('Accept Job Application?'),
					self.jobApplication=d,
					self.fetchAllJobApplications(id);
					},
					function(errResponse) 
					{
						console.error("Error while approving job application...")
					}
			);
		};
		
		
		
		
	
								
								
								
		self.applyForJob = function(job,jobId) {
			console.log("-->JobController : calling 'applyForJob' method with jobId:"+jobId);
			JobService
						.applyForJob(job,jobId)
						.then(function(d) {
							self.jobApplication = d;
							alert("You have successfully applied for the job...");
							self.listJobs();
							console.log("-->JobController : ", self.jobApplication);
							console.log("-->JobController : ", self.job);
							},
						function(errResponse) {
							console.error('Error while applying for job...')
						});

		};
		
		
		
		
		self.apply = function() {
			console.log("-->JobController : calling 'apply()' method.", self.job);
			self.applyForJob(job);
			console.log('Job applied successfully...', job);
		};
		
		self.submit = function() {
			{
				console.log("-->JobController : calling 'submit()' method.", self.job);
				self.createJob(self.job);
				console.log('Saving new Job', self.job);
			}
			self.reset();
			
			};
		self.reset = function() {
			console.log('submit a new job', self.job);
			self.job = {
					jobId : '',
					companyName : '',
					location : '',
					description : '',
					jobDate : '',
					status : '',
					noOfApplicants: '',
					errorCode: '',
					errorMessage: '',
					};
			$scope.myForm.$setPristine();	//reset form...
		};
								

	}]);
			
			