package com.niit.Webz.Dao;

import java.util.List;

import com.niit.Webz.Model.ForumComment;


public interface ForumCommentDao {
	
	public boolean save(ForumComment forumComment);
	public boolean update(ForumComment forumComment);
	public boolean saveOrUpdate(ForumComment forumComment);
	public boolean delete(ForumComment forumComment);
	public ForumComment getByForumCommentId(int id);
	public List<ForumComment> listByUserId(String id);
	public List<ForumComment> listByForumId(int id);
	public List<ForumComment> getAllForumComments();

}
