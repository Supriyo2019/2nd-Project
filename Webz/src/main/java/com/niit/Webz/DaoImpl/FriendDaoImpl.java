package com.niit.Webz.DaoImpl;


import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.niit.Webz.Dao.FriendDao;
import com.niit.Webz.Model.Friend;
@Transactional
@EnableTransactionManagement
@Repository(value="friendDao")
@SuppressWarnings("unchecked")
public class FriendDaoImpl implements FriendDao{

	@Autowired	
	private SessionFactory sessionFactory;

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	protected Session getSession() {
		return sessionFactory.openSession();
	}

	
	public FriendDaoImpl() { 		
		
	}	
	public FriendDaoImpl(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	
	public boolean save(Friend friend) {
		try {
			Session s=getSession();
			s.save(friend);
			s.flush();
			s.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	
	public boolean update(Friend friend) {
		try {
			Session s=getSession();
			s.update(friend);
			s.flush();
			s.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	
	public Friend get(String userId, String friendId) {
		String hql = "from Friend where ( userId = '" + friendId + "' and friendId = '" + userId + "'  and status = 'A' ) or " + " ( userId = '" + userId + "' and friendId = '" + friendId + "'  and status = 'A' ) "      ;
		Session s=getSession();
		Query query = s.createQuery(hql);
		List<Friend> list = (List<Friend>) query.list();
		s.close();
		if(list != null && !list.isEmpty()) {
			return list.get(0);
		}
		return null;
	}
	
	
	
	
	public List<Friend> getMyFriends(String userId) {
		String hql = "from Friend where ( userId = '" + userId + "' and status = 'A' ) or ( friendId = '" + userId + "' and status = 'A' )";
		Session s=getSession();
		Query query = s.createQuery(hql);
		List<Friend> list = (List<Friend>) query.list();
		s.close();
		return list;
	}
	
	
			
			
		
	public List<Friend> getNewFriendRequests(String friendId){
			String hql = "from Friend where friendId = '" + friendId + "' and status = 'N'";
			Session s=getSession();
			Query query = s.createQuery(hql);
			List<Friend> list = (List<Friend>) query.list();
			s.close();
			return list;
		}
		
		
		
	public void setOnline(String userId) {
		
		
		String hql = "update Friend set isOnline = 'Y' where userId = '" + userId + "'";
		Session s=getSession();
		Query query = s.createQuery(hql);
		query.executeUpdate();
		s.close();
	}
	
	

       
      public void setOffline(String userId) {
		// TODO Auto-generated method stub
		String hql = "update Friend set isOnline = 'N' where userId = '" + userId + "'";
		Session s=getSession();
		Query query = s.createQuery(hql);
		query.executeUpdate();
		s.close();
	
	}
	public Friend getRequest(String userId, String friendId) {
		// TODO Auto-generated method stub
		String hql = "from Friend where  userId = '" + friendId + "' and friendId = '" + userId + "'  and status = 'N' "      ;
		Session s=getSession();
		Query query = s.createQuery(hql);
		List<Friend> list = (List<Friend>) query.list();
		s.close();
		if(list != null && !list.isEmpty()) {
			return list.get(0);
		}
		return null;
	}
	
	
	public boolean isFriendtrue(String userId, String friendId) {
		
		String hql = "from Friend where ( userId = '" + friendId + "' and friendId = '" + userId + "'  and status = 'A' ) or " + " ( userId = '" + userId + "' and friendId = '" + friendId + "'  and status = 'A' )";
		Session s=getSession();
		Query query = s.createQuery(hql);
		@SuppressWarnings("unchecked")
		List<Friend> list = (List<Friend>) query.list();
		s.close();
		if(list != null && !list.isEmpty()) {
			return true;
		}
		return false;
	}

	public List<Friend> getAllFriends(){
		Session session = getSession();
		Query query=session.createQuery("from Friend");
		List<Friend> friendList=query.list();
		session.close();
		return friendList;
	
	}
	public boolean unFriend(Friend friend)
	{
		try
		{
			Session session = getSession();
			friend.setStatus("Unfriend");
	        session.update(friend);

			session.flush(); 

			session.close();
			
			return true;
		}
		catch(HibernateException e)
		{
			return false;
		}
	}
	
}
	