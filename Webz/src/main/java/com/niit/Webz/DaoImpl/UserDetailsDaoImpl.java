package com.niit.Webz.DaoImpl;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.niit.Webz.Dao.UserDetailsDao;
import com.niit.Webz.Model.UserDetails;

@Repository("usersDetailsDao")
@Transactional
public class UserDetailsDaoImpl implements UserDetailsDao{

    private SessionFactory sessionFactory;
	
	public  UserDetailsDaoImpl(SessionFactory sessionFactory) {
		super();
		this.sessionFactory = sessionFactory;
	}

	protected Session getSession() {
		return sessionFactory.openSession();
	}


	public boolean saveUser(UserDetails user) {
		try
		{
			Session session = getSession();

			session.save(user);

			session.flush(); 

			session.close();
			
			return true;
		}
		catch(HibernateException e)
		{
			return false;
		}
	}

	public boolean updateUser(UserDetails user) {
		try
		{
			Session session = getSession();

			session.update(user);

			session.flush(); 

			session.close();
			
			return true;
		}
		catch(HibernateException e)
		{
			return false;
		}
	}

	public boolean deleteUser(UserDetails user) {
		try
		{
			Session session = getSession();

			session.delete(user);

			session.flush(); 

			session.close();
			
			return true;
		}
		catch(HibernateException e)
		{
			return false;
		}
		
	}

	public List<UserDetails> getAllUser() {
		Session session = getSession();
		Query query=session.createQuery("from UserDetails");
		List<UserDetails> userlist=query.list();
		session.close();
		return userlist;
		
	}
	public UserDetails UserAuthentication(String userId, String userPassword) {
		Session session = getSession();
		Query query=session.createQuery("FROM UserDetails s where userId=:userId and password=:password");
		query.setParameter("userId", userId);
		query.setParameter("password", userPassword);
		UserDetails s=(UserDetails)query.uniqueResult();
		if( s==null)
		{
		 return s;
				 
		}
		 else
		 {
			
		 return s;
		 }
		
	}

	public UserDetails getUserByUserId(String id) {
	
	     Session session = getSession();
		Query query=session.createQuery("FROM UserDetails s where userId=:userId");
		query.setParameter("userId", id);
		UserDetails s=(UserDetails)query.uniqueResult();
		session.close();
		return s;
		
	}

}

