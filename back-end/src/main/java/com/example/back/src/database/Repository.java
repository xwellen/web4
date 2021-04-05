package com.example.back.src.database;

import com.example.back.src.entities.Point;
import com.example.back.src.entities.User;
import com.example.back.src.util.PasswordCoder;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.util.List;

@Singleton
public class Repository {

    @PersistenceContext(unitName = "eclipseUnit")
    private EntityManager em;

    public List<User> getUsers() {
        try {
            List<User> users = em.createQuery("SELECT u from User u").getResultList();
            return users;
        } catch (NoResultException e) {
            System.out.println("No users");
        }
        return null;
    }

    public User saveUser(User user) {
//        em.getTransaction().begin();
        em.persist(user);
//        em.getTransaction().commit();

        return user;
    }

    public boolean didUserRegistered(String login) throws NoResultException {
        try {
            User user = (User) em.createQuery("SELECT c FROM User c WHERE c.login LIKE :castLogin")
                    .setParameter("castLogin", login)
                    .getSingleResult();
            return user != null;
        } catch (NoResultException e) {
            return false;
        }
    }

    public User getUserWithLoginPassword(String login, String password) {
        User user = null;
        System.out.println(em.getMetamodel().entity(User.class).getName());
        try {
            user = (User) em.createQuery("SELECT c FROM User c WHERE c.login LIKE :castLogin")
                    .setParameter("castLogin", login)
                    .getSingleResult();
            if (!(user == null)) {
                if (PasswordCoder.getHashedPassword(password).equals(user.getPassword())) {
                    return user;
                }
            }
            return null;
            //throw new SecurityException("Invalid User/Password/You");
        } catch (Exception e) {
            return null;
        }
    }

    public List<Point> getPoints(String login) {
        List<Point> points = em.createQuery("SELECT p FROM Point p WHERE p.owner LIKE :castLogin", Point.class)
                .setParameter("castLogin", login).getResultList();
        return points;
    }

    public Point savePoint(Point point) {
//        em.getTransaction().begin();
        em.persist(point);
//        em.getTransaction().commit();

        return point;

    }
}
