package com.niit.Webz.Controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.niit.Webz.Dao.ForumCommentDao;
import com.niit.Webz.Dao.ForumDao;
import com.niit.Webz.Model.Blog;
import com.niit.Webz.Model.BlogComment;
import com.niit.Webz.Model.Forum;
import com.niit.Webz.Model.ForumComment;
import com.niit.Webz.Model.Forum;
import com.niit.Webz.Model.UserDetails;
import com.niit.Webz.Model.Forum;


@RestController
public class ForumController {

	@Autowired
	ForumDao fD;
	@Autowired
	ForumComment forumComment;
	@Autowired
	ForumCommentDao forumCommentDao;  
	@Autowired
	Forum f;
	
	//########################################### FORUM ###########################################################//
	
	
	@RequestMapping(value="/forumlist", method=RequestMethod.GET)
	public ResponseEntity<List<Forum>> getAllForums(){
		List<Forum> forum=fD.getAllForums();
		if(forum.isEmpty()){
			return new ResponseEntity<List<Forum>>(forum, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Forum>>(forum, HttpStatus.OK);
	}
	
	
	
	
	@RequestMapping(value="/addforum/", method=RequestMethod.POST)
	public ResponseEntity<Forum> creatForum(@RequestBody Forum forum,HttpSession session )
	{
		UserDetails user=(UserDetails) session.getAttribute("loggedInUser");
		
		if(fD.getForumByForumId(forum.getForumId())==null){
			forum.setForumCreationDate(new Date(System.currentTimeMillis()));
			forum.setForumStatus("Pending");
			forum.setUserId(user.getUserId());
			forum.setUserName(user.getName());
			fD.saveForum(forum);
			return new ResponseEntity<Forum>(forum,HttpStatus.OK);
		}
		forum.setErrorMessage("Forum already exist with id : "+forum.getForumId());
		return new ResponseEntity<Forum>(forum, HttpStatus.OK);
	
}
	@RequestMapping(value= "/viewforum/{id}",method=RequestMethod.GET)
	public ResponseEntity<Forum>getForum(@PathVariable("id")int id){
		Forum forum = fD.getForumByForumId(id);
		if (forum == null){
			forum = new Forum();
			forum.setErrorMessage("User does not exist with id : " + id);
				return new ResponseEntity<Forum>(forum, HttpStatus.NOT_FOUND);
				
		}
		return new ResponseEntity<Forum>(forum, HttpStatus.OK);
	}
	
	
	//update forum
	@RequestMapping(value="/Editforum/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Forum> updateForum(@PathVariable("id") int id, @RequestBody Forum forum){
		if(fD.getAllForums()==null){
			forum =new Forum();
			forum.setErrorMessage("User does not exist with id : " +forum.getForumId());
			return new ResponseEntity<Forum>(forum, HttpStatus.NO_CONTENT);
		}
		forum.setForumCreationDate(new Date(System.currentTimeMillis()));
		forum.setForumStatus("Pending");
		fD.updateForum(forum);
		return new ResponseEntity<Forum>(forum, HttpStatus.OK);
	}
	
	//delete forum
	@RequestMapping(value="/deleteForum/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Forum> deleteForum(@PathVariable("id")int id){
		Forum forum=fD.getForumByForumId(id);
		if(forum == null){
			forum = new Forum();
			forum.setErrorMessage("forum does not exist with id : " + id);
			return new ResponseEntity<Forum>(forum, HttpStatus.NOT_FOUND);
			
		}
		fD.deleteForum(forum);
		return new ResponseEntity<Forum>(forum, HttpStatus.OK);
	}
	//approveforum by Admin
	@RequestMapping(value="/approveForum/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Forum>approveForum(@PathVariable("id") int id,HttpSession session)
	{	
		
			Forum forum=fD.getForumByForumId(id);
			if(((UserDetails)session.getAttribute("loggedInUser")).getRole().equals("ADMIN")&&
					(forum!=null))
			{
						forum.setForumStatus("Approved");
						fD.updateForum(forum);
						return new ResponseEntity<Forum>(forum,HttpStatus.OK);
					}
			else
			{
						
						return new ResponseEntity<Forum>(forum,HttpStatus.NOT_FOUND);
					}
			
		}
	@RequestMapping(value="/rejectForum/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Forum>rejectForum(@PathVariable("id") int id,HttpSession session)
	{	
		
			Forum forum=fD.getForumByForumId(id);
			if(((UserDetails)session.getAttribute("loggedInUser")).getRole().equals("ADMIN")&&
					(forum!=null))
			{
						forum.setForumStatus("Reject");
						fD.updateForum(forum);
						return new ResponseEntity<Forum>(forum,HttpStatus.OK);
					}
			else
			{
						
						return new ResponseEntity<Forum>(forum,HttpStatus.NOT_FOUND);
					}
			
		}
	
	
	
	
	// 5 Showing Approved Forum List........
	
			@RequestMapping(value= "/approvedForumList",method=RequestMethod.GET)
			public ResponseEntity<List<Forum>>getAllApprovedForums(){
				List<Forum> forums=fD.getAllApprovedForums();
				if(forums.isEmpty()){
					return new ResponseEntity<List<Forum>>(forums,HttpStatus.NO_CONTENT);
				}
				System.out.println(forums.size());
				System.out.println("approved forums displaying");
				return new ResponseEntity<List<Forum>>(forums,HttpStatus.OK);
			}
			
	
	
	//########################################### FORUM COMMENT###########################################################//
	//list of forumcomment
	@RequestMapping(value="/forumcomment", method=RequestMethod.GET)
	public ResponseEntity<List<ForumComment>> getAllForumComments(){
		List<ForumComment> forumComment=forumCommentDao.getAllForumComments();
		if(forumComment.isEmpty()){
			return new ResponseEntity<List<ForumComment>>(forumComment, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<ForumComment>>(forumComment, HttpStatus.OK);
	}
	//add forumcomment
	@RequestMapping(value="/newForumComment/", method=RequestMethod.POST)
	public ResponseEntity<ForumComment> createForumComment(@RequestBody ForumComment forumComment,HttpSession session){
		System.out.println("Create ForumComment");
		
		UserDetails user=(UserDetails) session.getAttribute("loggedInUser");
		
		
		forumComment.setForumCommentDate(new Date(System.currentTimeMillis()));
		forumComment.setUserId(user.getUserId());
		forumComment.setUserName(user.getName());
		forumCommentDao.save(forumComment);
		System.out.println("forumComment" + forumComment.getForumId());
		return new ResponseEntity<ForumComment>(forumComment,HttpStatus.OK);
				
		}
	//Update forumcomment
	
	
		@RequestMapping(value="/EditforumComment/{id}", method=RequestMethod.PUT)
		public ResponseEntity<ForumComment>updateforumComment(@PathVariable("id") int id, @RequestBody ForumComment forumcomment){
			if(forumCommentDao.getAllForumComments()==null){
				forumcomment =new ForumComment();
				forumcomment.setErrorMessage("ForumComment does not exist with id : " +forumcomment.getForumCommentId());
				return new ResponseEntity<ForumComment>(forumcomment, HttpStatus.NO_CONTENT);
			}
			forumcomment.setForumCommentDate(new Date(System.currentTimeMillis()));
			forumcomment.setForumId(forumcomment.getForumId());
			forumCommentDao.update(forumcomment);
			return new ResponseEntity<ForumComment>(forumcomment, HttpStatus.OK);
		}
	
	//Delete ForumComment
	
	@RequestMapping(value="/deleteForumComment/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<ForumComment>delete(@PathVariable("id")int id){
		ForumComment forumComment=forumCommentDao.getByForumCommentId(id);
		if(forumComment== null){
			forumComment = new ForumComment();
			forumComment.setErrorMessage("BlogComment does not exist with id : " + id);
			return new ResponseEntity<ForumComment>(forumComment, HttpStatus.NOT_FOUND);
			
		}
		forumCommentDao.delete(forumComment);
		return new ResponseEntity<ForumComment>(forumComment, HttpStatus.OK);
	}
	//Getting a single forum comment by forum comment Id.....
	@RequestMapping(value= "/forumCommentDetails/{id}",method=RequestMethod.GET)
	public ResponseEntity<ForumComment>getByForumCommentId(@PathVariable("id")int id){
		ForumComment forumComment = forumCommentDao.getByForumCommentId(id);
		if (forumComment == null){
			forumComment = new ForumComment();
			forumComment.setErrorMessage("ForumComment does not exist with id : " + id);
				return new ResponseEntity<ForumComment>(forumComment, HttpStatus.NOT_FOUND);
				
		}
		return new ResponseEntity<ForumComment>(forumComment, HttpStatus.OK);
	}
	//Show forumCommentList By userId//
		@RequestMapping(value= "/forumcommentListByUserId/{id}",method=RequestMethod.GET)
		public ResponseEntity<List<ForumComment>>getlistByUserId(@PathVariable("id") String id){
			List<ForumComment>forumComment =forumCommentDao.listByUserId(id);
			if (forumComment == null){
				f.setErrorMessage("Comment does not exist with userId : " + id);
					return new ResponseEntity<List<ForumComment>>(forumComment, HttpStatus.NOT_FOUND);
					
			}
			return new ResponseEntity<List<ForumComment>>(forumComment, HttpStatus.OK);
		}
		//forumComment by forumId
		@RequestMapping(value= "/forumCommentDetailsbyforumId/{id}",method=RequestMethod.GET)
		public ResponseEntity<ForumComment>forumCommentbyBlogId(@PathVariable("id")int id){
			ForumComment forumComment = forumCommentDao.getByForumCommentId(id);
			if (forumComment == null){
				forumComment = new ForumComment();
				forumComment.setErrorMessage("ForumComment does not exist with id : " + id);
					return new ResponseEntity<ForumComment>(forumComment, HttpStatus.NOT_FOUND);
					
			}
			return new ResponseEntity<ForumComment>(forumComment, HttpStatus.OK);
		}
		//Show forumCommentList By forumId//
				@RequestMapping(value= "/forumcommentListByForumId/{id}",method=RequestMethod.GET)
				public ResponseEntity<List<ForumComment>>getlistByUserId(@PathVariable("id") int id){
					List<ForumComment>forumComment =forumCommentDao.listByForumId(id);
					if (forumComment == null){
						f.setErrorMessage("Comment does not exist with userId : " + id);
							return new ResponseEntity<List<ForumComment>>(forumComment, HttpStatus.NOT_FOUND);
							
					}
					return new ResponseEntity<List<ForumComment>>(forumComment, HttpStatus.OK);
				}
				//get my all Forums
			/*	@RequestMapping(value= "/MyForum",method=RequestMethod.GET)
				public ResponseEntity<List<Forum>>getMyForums(HttpSession session){
				UserDetails user=(UserDetails) session.getAttribute("loggedInUser");
				return new ResponseEntity<List<Forum>>(fD.getMyForums(user.getUserId()),HttpStatus.OK);
				}*/
	
		
}