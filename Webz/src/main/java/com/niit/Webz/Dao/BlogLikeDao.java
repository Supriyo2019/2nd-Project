package com.niit.Webz.Dao;

import java.util.List;

import com.niit.Webz.Model.BlogLike;

public interface BlogLikeDao {

	public List<BlogLike>getBlogLikesByBlogId(int blogId);
	public boolean saveBlogLike(BlogLike blogLike);
	public boolean isExist(int blogId,String userId);
}

