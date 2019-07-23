                                                                                                                                  package com.niit.Webz.Controller;

import java.util.List;

import javax.servlet.http.HttpSession;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.niit.Webz.Dao.UserDetailsDao;
import com.niit.Webz.Model.Blog;
import com.niit.Webz.Model.UserDetails;


	@RestController
	public class UserDetailsController {

		@Autowired
		UserDetailsDao  u1;
		@Autowired
		UserDetails UserDetail;
		
		
		
		//show userlist
		
		@RequestMapping(value="/userlist", method=RequestMethod.GET)
		@ResponseBody
		public ResponseEntity<List<UserDetails>> getAllUser(){
			List<UserDetails> users=u1.getAllUser();
			if(users.isEmpty()){
				return new ResponseEntity<List<UserDetails>>(users,HttpStatus.NO_CONTENT);
			}
			System.out.println(users.size());
			System.out.println("fetching all users");
			return new ResponseEntity<List<UserDetails>>(users,HttpStatus.OK);
		}
		
		
		
		//Add users
		@RequestMapping(value="/Adduser/", method=RequestMethod.POST)
		public ResponseEntity<UserDetails> creatUser(@RequestBody UserDetails users){
			if(u1.getUserByUserId(users.getUserId())==null){
				users.setRole("USER");
				users.setStatus("ACTIVE");
				users.setIsOnline("No");
				u1.saveUser(users);
				return new ResponseEntity<UserDetails>(users,HttpStatus.OK);
			}
			users.setErrorMessage("User already exist with id : "+users.getUserId());
			return new ResponseEntity<UserDetails>(users, HttpStatus.OK);
		}
		
		
		
		//Log in user
		@RequestMapping(value = "/userProfile/authenticate/", method = RequestMethod.POST)
		public ResponseEntity<UserDetails> UserAuthentication(@RequestBody UserDetails users, HttpSession session){
			users = u1.UserAuthentication(users.getUserId(), users.getPassword());
			if(users == null){
				users = new UserDetails();
				users.setErrorMessage("Invalid userId or password...");
			}
			else {
				
				session.setAttribute("loggedInUser", users);
				System.out.println("logged session set ");
				session.setAttribute("loggedInUserID", users.getUserId());
				users.setIsOnline("Yes");
				users.setStatus("Active");
				u1.updateUser(users);
			}
			return new ResponseEntity<UserDetails>(users, HttpStatus.OK);
		}
		
		
		//Getting all userDetails by Id
		@RequestMapping(value= "/user/{id}",method=RequestMethod.GET)
		public ResponseEntity<UserDetails>getAllUser(@PathVariable("id")String id){
			UserDetails users = u1.getUserByUserId(id);
			if (users == null){
				users = new UserDetails();
				users.setErrorMessage("User does not exist with id : " + id);
					return new ResponseEntity<UserDetails>(users, HttpStatus.NOT_FOUND);
					
			}
			return new ResponseEntity<UserDetails>(users, HttpStatus.OK);
		}
		
		
		
		
		//update user
		
		@RequestMapping(value="/Edituser/{id}", method=RequestMethod.PUT)
		public ResponseEntity<UserDetails> updateuser(@PathVariable("id") String id, @RequestBody UserDetails user){
			if(u1.getAllUser()==null){
				user =new UserDetails();
				user.setErrorMessage("User does not exist with id : " +user.getUserId());
				return new ResponseEntity<UserDetails>(user, HttpStatus.NO_CONTENT);
			}
			u1.updateUser(user);
			return new ResponseEntity<UserDetails>(user, HttpStatus.OK);
		}
		
		//delete user
		
		@RequestMapping(value="/deleteUser/{id}", method=RequestMethod.DELETE)
		public ResponseEntity<UserDetails>deleteUserDetails(@PathVariable("id")String id){
			UserDetails user=u1.getUserByUserId(id);
			if(user == null){
				user = new UserDetails();
				user.setErrorMessage("UserDetails does not exist with id : " + id);
				return new ResponseEntity<UserDetails>(user, HttpStatus.NOT_FOUND);
				
			}
			u1.deleteUser(user);
			return new ResponseEntity<UserDetails>(user, HttpStatus.OK);
		}
		
		
		
		//Log out users
		@RequestMapping(value= "/logout/{id}",method=RequestMethod.PUT)
		public ResponseEntity<UserDetails>logout(@PathVariable("id") String id, @RequestBody UserDetails users,HttpSession session){
			System.out.println("hello  "+users.getName());	
			users.setIsOnline("No");
			u1.updateUser(users);	
				session.invalidate();
				 
				
					return new ResponseEntity<UserDetails>(new UserDetails(), HttpStatus.OK);
					
			}
	}
