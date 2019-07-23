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

import com.niit.Webz.Dao.FriendDao;
import com.niit.Webz.Dao.UserDetailsDao;
import com.niit.Webz.Model.Friend;
import com.niit.Webz.Model.UserDetails;

@RestController
public class FriendController {
	@Autowired
	Friend friend;
	
	@Autowired
	FriendDao friendDao;
	
	@Autowired
	UserDetailsDao userdetailsDao;

	//get my all friendList
	@RequestMapping(value = "/MyFriends" , method=RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Friend>>getMyFriends(HttpSession session) {
		System.out.println("Starting of myFriends() method");
		UserDetails loggedInUser = (UserDetails) session.getAttribute("loggedInUser");
		System.out.println("Friends"+loggedInUser.getUserId()); // A= for approved friends and R= for reject U= unfriend
		List<Friend> myFriends = friendDao.getMyFriends(loggedInUser.getUserId());
		System.out.println("End of myFriends() method");
		return new ResponseEntity<List<Friend>> (myFriends, HttpStatus.OK);
	}
	
	//Add frnd
	@RequestMapping(value = "/addFriend/{friendId}" , method=RequestMethod.POST)			
	public ResponseEntity<Friend> sendFriendRequest(@PathVariable("friendId") String friendId, HttpSession session) {
		System.out.println("sendFriendRequest() method");
		Friend frnd = new Friend();
		UserDetails user = (UserDetails) session.getAttribute("loggedInUser");
		
		Friend f=friendDao.get(user.getUserId(), friendId);
		
		System.out.println(user.getUserId()+" "+friendId);
		if(f==null)
		{
			frnd.setUserId(user.getUserId());
		
			frnd.setFriendId(friendId);
			frnd.setStatus("N");	
			friendDao.save(frnd);
		}
		
		else
		{
			f.setStatus("N");
			friendDao.update(f);
		}
		System.out.println("retriving of sendFriendRequest() method");
		return new ResponseEntity<Friend> (frnd, HttpStatus.OK);
	}
	
	
	
	//new frnd
	@RequestMapping(value = "/newFriendRequest",method=RequestMethod.GET )	

	public ResponseEntity<List<Friend>> newFriendRequests(HttpSession session) {
		System.out.println(" newFriendRequests() method.");
		UserDetails user = (UserDetails) session.getAttribute("loggedInUser");
		List<Friend> friends = friendDao.getNewFriendRequests(user.getUserId());
		System.out.println("retrieving new friends");
		return new ResponseEntity<List<Friend>>(friends, HttpStatus.OK);
	}
	//accept frnd
	@RequestMapping(value = "/acceptFriend/{friendId}"  , method=RequestMethod.PUT)			
	public ResponseEntity<Friend> acceptFriendRequest(@PathVariable("friendId") String friendId, HttpSession session) {
		
		UserDetails user = (UserDetails) session.getAttribute("loggedInUser");
		String userId=user.getUserId();
		
		Friend frnd = friendDao.getRequest(userId, friendId);
		
		frnd.setUserId(user.getUserId());
		
		frnd.setFriendId(userId);
		frnd.setUserId(friendId);
		frnd.setStatus("A");	
		friendDao.update(frnd);
		
		return new ResponseEntity<Friend> (frnd, HttpStatus.OK);
	}
	//reject frnd
	@RequestMapping(value = "/rejectFriend/{friendId}"  , method=RequestMethod.PUT)			
	public ResponseEntity<Friend> rejectFriendRequest(@PathVariable("friendId") String friendId, HttpSession session) {
		System.out.println(" rejectFriendRequest() method");
		UserDetails user = (UserDetails) session.getAttribute("loggedInUser");
		String userId=user.getUserId();
		Friend frnd = friendDao.getRequest(userId, friendId);
		System.out.println("hii "+ frnd);
		frnd.setUserId(user.getUserId());
		frnd.setFriendId(userId);
		frnd.setStatus("R");	
		friendDao.update(frnd);
		System.out.println("End of rejectFriendRequest() method");
		return new ResponseEntity<Friend> (frnd, HttpStatus.OK);
	}
	//unfrnd
	@RequestMapping(value = "/unFriend/{friendId}" , method=RequestMethod.PUT)			
	public ResponseEntity<Friend> unFriend(@PathVariable("friendId") String friendId, HttpSession session) {
		System.out.println(" unFriend() method");
		UserDetails user = (UserDetails) session.getAttribute("loggedInUser");
		String userId=user.getUserId();
		Friend frnd = friendDao.get(userId, friendId);
		frnd.setUserId(user.getUserId());
		frnd.setFriendId(friendId);
		frnd.setStatus("Unfriend");	
		friendDao.update(frnd);
		System.out.println("retriving unFriend() method");
		return new ResponseEntity<Friend> (frnd, HttpStatus.OK);
	}
	
}
