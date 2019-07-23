package com.niit.Webz.Dao;

import java.util.List;

import com.niit.Webz.Model.Blog;
import com.niit.Webz.Model.Forum;



public interface ForumDao {
	
	
    public boolean saveForum(Forum forum);
	
	public boolean deleteForum(Forum forum);
	
	public boolean updateForum(Forum forum);
	
	public Forum getForumByForumId(int forumId);
	
	public List<Forum> getAllForums();
	
	public List<Forum> getAllApprovedForums();

	//public List<Forum> getMyForums(String userid);//get my blog
}
