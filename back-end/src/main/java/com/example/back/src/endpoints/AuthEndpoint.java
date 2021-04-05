package com.example.back.src.endpoints;

import com.example.back.src.database.Repository;
import com.example.back.src.entities.User;
import com.example.back.src.templates.AuthRequest;
import com.example.back.src.util.PasswordCoder;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Path("/auth")
public class AuthEndpoint {

    @EJB
    Repository rep;

    @POST
    @Path("/login")
    public Response login(AuthRequest authRequest) {
        try {
            String login = authRequest.getLogin();
            String password = authRequest.getPassword();
            User user = rep.getUserWithLoginPassword(login, password);
            System.out.println(rep.toString());
            if(user == null) {
                throw new SecurityException("Invalid User/Password");
            }
            return Response.ok(login + " successfully logged!").build();
        } catch (Exception e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(e.getMessage()).build();
        }
    }

    @POST
    @Path("/register")
    public Response addUser(AuthRequest authRequest) throws NoSuchAlgorithmException {
        if (!rep.didUserRegistered(authRequest.getLogin())) {
            User user = new User(authRequest.getLogin(), PasswordCoder.getHashedPassword(authRequest.getPassword()));
            rep.saveUser(user);
            return Response.status(Response.Status.OK).entity("You've successfully registered in!").build();

        } else {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Username is already taken!").build();
        }

    }


    @GET
    public Response getUsers() {
        List<User> users = rep.getUsers();

        StringBuilder builder = new StringBuilder();
        for (User user : users) {
            builder.append(user);
        }
        return Response.ok(users).build();

    }
}
