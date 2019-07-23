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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.niit.Webz.Dao.BlogCommentDao;
import com.niit.Webz.Dao.BlogDao;
import com.niit.Webz.Dao.BlogLikeDao;
import com.niit.Webz.Dao.NotificationDao;
import com.niit.Webz.Model.Blog;
import com.niit.Webz.Model.BlogComment;
import com.niit.Webz.Model.BlogLike;
import com.niit.Webz.Model.ForumComment;
import com.niit.Webz.Model.JobApplication;
import com.niit.Webz.Model.Notification;
import com.niit.Webz.Model.UserDetails;

@RestController
public class BlogController {

	@Autowired
	BlogDao b1;
	@Autowired
	UserDetails userDetails;
	@Autowired
	BlogCommentDao CommentDao;
	@Autowired
	BlogComment blogComment;   
	@Autowired
	Blog blg;
	@Autowired
	BlogLikeDao bld;
	@Autowired
	NotificationDao notificationDao;
	@Autowired
	Notification notification;
	//############################################### BLOG  #################################################//
	
	
	// to view blog list 
	@RequestMapping(value="/bloglist", method=RequestMethod.GET)
	public ResponseEntity<List<Blog>> getAllBlogs(){
		List<Blog> blog=b1.getAllBlogs();
		if(blog.isEmpty()){
			return new ResponseEntity<List<Blog>>(blog, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Blog>>(blog, HttpStatus.OK);
	}
	
	
	
	
	
	// to create new blog
	
	@RequestMapping(value="/addBlog/", method=RequestMethod.POST)
	public ResponseEntity<Blog> creatBlog(@RequestBody Blog blog,HttpSession session )
	{
		UserDetails user=(UserDetails) session.getAttribute("loggedInUser");
		if(b1.getBlogByBlogId(blog.getBlogId())==null){
			blog.setBlogDate(new Date(System.currentTimeMillis()));
			blog.setBlogStatus("Pending");
			blog.setUserId(user.getUserId());
			b1.saveBlog(blog);
			return new ResponseEntity<Blog>(blog,HttpStatus.OK);
		}
		blog.setErrorMessage("Blog already exist with id : "+blog.getBlogId());
		return new ResponseEntity<Blog>(blog, HttpStatus.OK);
	    }
	
	
	// to view blog by blog id
	@RequestMapping(value= "/viewblog/{id}",method=RequestMethod.GET)
	public ResponseEntity<Blog>getBlog(@PathVariable("id")int id){
		Blog blog = b1.getBlogByBlogId(id);
		if (blog == null){
			blog = new Blog();
			blog.setErrorMessage("User does not exist with id : " + id);
				return new ResponseEntity<Blog>(blog, HttpStatus.NOT_FOUND);
				
		}
		return new ResponseEntity<Blog>(blog, HttpStatus.OK);
	}
	// approved blog list display
	
	//update blog
	@RequestMapping(value="/Editblog/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Blog> updateBlog(@PathVariable("id") int id, @RequestBody Blog blog){
		if(b1.getAllBlogs()==null){
			blog =new Blog();
			blog.setErrorMessage("User does not exist with id : " +blog.getUserId());
			return new ResponseEntity<Blog>(blog, HttpStatus.NO_CONTENT);
		}
		blog.setBlogDate(new Date(System.currentTimeMillis()));
		blog.setBlogStatus("Pending");
		b1.updateBlog(blog);
		return new ResponseEntity<Blog>(blog, HttpStatus.OK);
	}
	
	
	// delete blog
	@RequestMapping(value="/deleteBlog/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Blog>deleteBlog(@PathVariable("id")int id){
		Blog blog=b1.getBlogByBlogId(id);
		if(blog == null){
			blog = new Blog();
			blog.setErrorMessage("Blog does not exist with id : " + id);
			return new ResponseEntity<Blog>(blog, HttpStatus.NOT_FOUND);
			
		}
		b1.deleteBlog(blog);
		return new ResponseEntity<Blog>(blog, HttpStatus.OK);
	}
	
	
	
	
	
    // approved blog list display
	@RequestMapping(value= "/approvedBloglist",method=RequestMethod.GET)
	public ResponseEntity<List<Blog>>getAllApprovedBlogs(){
		List<Blog> blogs=b1.getAllApproveBlogs();
		if(blogs.isEmpty()){
			return new ResponseEntity<List<Blog>>(blogs,HttpStatus.NO_CONTENT);
		}
		System.out.println(blogs.size());
		System.out.println("approved blogs displaying");
		return new ResponseEntity<List<Blog>>(blogs,HttpStatus.OK);
	}
	

	// pending blog list display
	@RequestMapping(value= "/pendingBlogList",method=RequestMethod.GET)
	public ResponseEntity<List<Blog>>getAllPendingBlogs(){
		List<Blog> blogs=b1.getAllPendingBlogs();
		if(blogs.isEmpty()){
			return new ResponseEntity<List<Blog>>(blogs,HttpStatus.NO_CONTENT);
		}
		System.out.println(blogs.size());
		System.out.println("pending blogs displaying");
		return new ResponseEntity<List<Blog>>(blogs,HttpStatus.OK);
	}
	
	// Aprove blog list display
	
	//Blog Approved by Admin...........!
	
	@RequestMapping(value="/approvedBlog/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Blog>approveBlog(@PathVariable("id") int id,HttpSession session)
	{	
		
			Blog blogs=b1.getBlogByBlogId(id);
			if(((UserDetails)session.getAttribute("loggedInUser")).getRole().equals("ADMIN")&&
					(blogs!=null))
			{
						blogs.setBlogStatus("Approved");
						b1.updateBlog(blogs);
						Notification notification=new Notification();
					    notification.setApprovedOrRejected("Approved");
					    notification.setBlogTitle(blogs.getBlogTitle());
				    	notification.setUserId(blogs.getUserId());//AUTHOR OF THE BLOGPOST
				    	notification.setViewed("False");
						notificationDao.addNotification(notification);
						return new ResponseEntity<Blog>(blogs,HttpStatus.OK);
					}
			else
			{
						
						return new ResponseEntity<Blog>(blogs,HttpStatus.NOT_FOUND);
					}
	}

//Blog Rejected by Admin..........!
	@RequestMapping(value="/rejectedBlog/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Blog>rejectBlog(@PathVariable("id") int id,HttpSession session)
	{	
		
			Blog blogs=b1.getBlogByBlogId(id);
			if(((UserDetails)session.getAttribute("loggedInUser")).getRole().equals("ADMIN")&&
					(blogs!=null))
			{
						blogs.setBlogStatus("Reject");
						b1.updateBlog(blogs);
						Notification notification=new Notification();
					    notification.setApprovedOrRejected("Rejected");
					    notification.setBlogTitle(blogs.getBlogTitle());
				    	notification.setUserId(blogs.getUserId());//AUTHOR OF THE BLOGPOST
				    	notification.setRejectionReason( "REJECTED BY ADMIN");
				    	notification.setViewed("False");//ENTERED BY ADMIN
						notificationDao.addNotification(notification);
						return new ResponseEntity<Blog>(blogs,HttpStatus.OK);
					}
			else
			{
						
						return new ResponseEntity<Blog>(blogs,HttpStatus.NOT_FOUND);
					}
			
		}
	
	//get my Blog..............!
	@RequestMapping(value= "/myBlog",method=RequestMethod.GET)
	public ResponseEntity<List<Blog>>getBlogs(HttpSession session){
	UserDetails user=(UserDetails) session.getAttribute("loggedInUser");
	return new ResponseEntity<List<Blog>>(b1.getMyBlogs(user.getUserId()),HttpStatus.OK);
	}	
	
	
	
	
	
//*********************************************BLOG LIKE****************************************************
	//Blog  like by UserId
	@RequestMapping(value="/likeBlog/{blogId}", method=RequestMethod.PUT)
	public ResponseEntity<Blog> likeBlog(@PathVariable("blogId") int blogId,HttpSession session) 
	{
		
		
			UserDetails user=(UserDetails) session.getAttribute("loggedInUser");
			System.out.println(user.getName());
			Blog blog = b1.getBlogByBlogId(blogId);
			if (blog == null)
			{
				blog = new Blog();
				
				blog.setErrorMessage("No blog exist with id : " + blogId);
	
				return new ResponseEntity<Blog>(blog, HttpStatus.NOT_FOUND);
		}
		
			else if(bld.isExist(blogId, user.getUserId()))
			{
				blog = new Blog();
				
				blog.setErrorMessage("User has already liked the blog: " + blogId);

				return new ResponseEntity<Blog>(blog, HttpStatus.NOT_FOUND);
			}
			
		blog.setBlogCountLike(blog.getBlogCountLike()+1);
		b1.updateBlog(blog);
		BlogLike blogLike=new BlogLike();
		blogLike.setBlogId(blogId);blogLike.setUserId(user.getUserId());blogLike.setUserName(user.getName());
		blogLike.setBlogLikeDate(new Date(System.currentTimeMillis()));
		bld.saveBlogLike(blogLike);
		return new ResponseEntity<Blog>(blog, HttpStatus.OK);
		}
		
		
	

	
	
	
	
//Getting blog like by Blog Id
	@RequestMapping(value="/Bloglike/{blogId}", method=RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<BlogLike>> getBlogLikesByblogId(@PathVariable("blogId") int blogId,HttpSession session) {
		Blog blog = b1.getBlogByBlogId(blogId);
		if (blog == null) {
			return new ResponseEntity<List<BlogLike>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<BlogLike>>(bld.getBlogLikesByBlogId(blogId), HttpStatus.OK);
		
	}
	
	
	
	
	
	
	//############################################### BLOG COMMENT #################################################//

	
	//Blogcommentlist
	@RequestMapping(value="/blogCommentlist", method=RequestMethod.GET)
	@ResponseBody
	
	public ResponseEntity<List<BlogComment>> getAllBlogComments(){
		List<BlogComment> blogComments=CommentDao.getAllBlogComments();
		if(blogComments.isEmpty()){
			blogComment.setErrorMessage("BlogComment does not exist at all" );
			return new ResponseEntity<List<BlogComment>>(blogComments,HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<List<BlogComment>>(blogComments,HttpStatus.OK);
	}
	//Add blogcomment
	@RequestMapping(value="/addBlogComment/", method=RequestMethod.POST)
	public ResponseEntity<BlogComment> createBlogComment(@RequestBody BlogComment blogComment,HttpSession session){
		System.out.println("Create BlogComment");
		
		UserDetails user=(UserDetails) session.getAttribute("loggedInUser");
		
		blogComment.setBlogCommentDate(new Date(System.currentTimeMillis()));
		blogComment.setUserId(user.getUserId());
		blogComment.setUserName(user.getName());
		blogComment.setBlogId(blogComment.getBlogId());
		CommentDao.save(blogComment);
		System.out.println("blogComment" + blogComment.getBlogCommentId());
		return new ResponseEntity<BlogComment>(blogComment,HttpStatus.OK);
}
	
	
	
	//blogComment by BlogId
	@RequestMapping(value= "/blogCommentDetailsbyBlogId/{id}",method=RequestMethod.GET)
	public ResponseEntity<BlogComment>BlogCommentbyBlogId(@PathVariable("id")int id){
		BlogComment blogcom = CommentDao.getByBlogCommentId(id);
		if (blogcom == null){
			blogcom = new BlogComment();
			blogcom.setErrorMessage("BlogComment does not exist with id : " + id);
				return new ResponseEntity<BlogComment>(blogcom, HttpStatus.NOT_FOUND);
				
		}
		return new ResponseEntity<BlogComment>(blogcom, HttpStatus.OK);
	}
	
	
	//Update blogcomment
	
	
	@RequestMapping(value="/EditblogComment/{id}", method=RequestMethod.PUT)
	public ResponseEntity<BlogComment>updateBlogComment(@PathVariable("id") int id, @RequestBody BlogComment blogcomment){
		if(CommentDao.getAllBlogComments()==null){
			blogcomment =new BlogComment();
			blogcomment.setErrorMessage("blogcomment does not exist with id : " +blogcomment.getBlogCommentId());
			return new ResponseEntity<BlogComment>(blogcomment, HttpStatus.NO_CONTENT);
		}
		blogComment.setBlogCommentDate(new Date(System.currentTimeMillis()));
		blogComment.setBlogId(blogComment.getBlogId());
		CommentDao.update(blogcomment);
		return new ResponseEntity<BlogComment>(blogcomment, HttpStatus.OK);
	}
	
	
	// delete blog comments
	@RequestMapping(value="/deleteBlogComment/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<BlogComment>delete(@PathVariable("id")int id){
		BlogComment blogComment=CommentDao.getByBlogCommentId(id);
		if(blogComment== null){
			blogComment = new BlogComment();
			blogComment.setErrorMessage("BlogComment does not exist with id : " + id);
			return new ResponseEntity<BlogComment>(blogComment, HttpStatus.NOT_FOUND);
			
		}
		CommentDao.delete(blogComment);
		return new ResponseEntity<BlogComment>(blogComment, HttpStatus.OK);
	}
	
	
	
	//Show BlogCommentlist By userId//
	@RequestMapping(value= "/BlogcommentListByUserId/{id}",method=RequestMethod.GET)
	public ResponseEntity<List<BlogComment>>getlistByUserId(@PathVariable("id") String id){
		List<BlogComment>blogComment =CommentDao.listByUserId(id);
		if (blogComment == null){
			blg.setErrorMessage("Comment does not exist with userId : " + id);
				return new ResponseEntity<List<BlogComment>>(blogComment, HttpStatus.NOT_FOUND);
				
		}
		return new ResponseEntity<List<BlogComment>>(blogComment, HttpStatus.OK);
	}
	//Show blogCommentList by BlogId//			
	@RequestMapping(value= "/BlogcommentListByBlogId/{id}",method=RequestMethod.GET)
	public ResponseEntity<List<BlogComment>>listByBlogId(@PathVariable("id") int id){
		List<BlogComment>blogComment =CommentDao.listByBlogId(id);
		if (blogComment == null){
			blg.setErrorMessage("blogComment does not exist with userId : " + id);
				return new ResponseEntity<List<BlogComment>>(blogComment, HttpStatus.NOT_FOUND);
				
		}
		return new ResponseEntity<List<BlogComment>>(blogComment, HttpStatus.OK);
	}
	//blogcomment by blogcommentId
	@RequestMapping(value= "/blogCommentDetails/{id}",method=RequestMethod.GET)
	public ResponseEntity<BlogComment>getByBlogCommentId(@PathVariable("id")int id){
		BlogComment blogComment = CommentDao.getByBlogCommentId(id);
		if (blogComment == null){
			blogComment = new BlogComment();
			blogComment.setErrorMessage("BlogComment does not exist with id : " + id);
				return new ResponseEntity<BlogComment>(blogComment, HttpStatus.NOT_FOUND);
				
		}
		return new ResponseEntity<BlogComment>(blogComment, HttpStatus.OK);
	}
	
	
	
	
	//get my all blogs
	//@RequestMapping(value= "/MyBlog",method=RequestMethod.GET)
	//public ResponseEntity<List<Blog>>getMyBlogs(HttpSession session){
	//UserDetails user=(UserDetails) session.getAttribute("loggedInUser");
	//return new ResponseEntity<List<Blog>>(b1.getMyBlogs(user.getUserId()),HttpStatus.OK);
	//}
}

