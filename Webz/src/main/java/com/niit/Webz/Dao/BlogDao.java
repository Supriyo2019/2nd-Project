package com.niit.Webz.Dao;

import java.util.List;

import com.niit.Webz.Model.Blog;
import com.niit.Webz.Model.JobApplication;



public interface BlogDao {
	
public List<Blog> getAllBlogs();
	
	public boolean saveBlog(Blog blog);
	
	public boolean deleteBlog(Blog blog);
	
	public boolean updateBlog(Blog blog);
	
	public Blog getBlogByBlogId(int blogId);
	
	public List<Blog> getAllApproveBlogs();
	
	public List<Blog> getAllPendingBlogs();
	
	public List<Blog> getMyBlogs(String userid);//get my blog
}
