package com.niit.Webz.Dao;

import java.util.List;

import com.niit.Webz.Model.UserDetails;



public interface UserDetailsDao {

	public boolean saveUser(UserDetails user);
	public boolean updateUser(UserDetails user);
	public boolean deleteUser(UserDetails user);
	public List<UserDetails> getAllUser();
	public UserDetails UserAuthentication(String userId, String userPassword);
	public UserDetails getUserByUserId(String id);

}
