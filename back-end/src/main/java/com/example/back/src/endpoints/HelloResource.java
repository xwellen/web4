package com.example.back.src.endpoints;

import com.example.back.src.database.Repository;
import com.example.back.src.entities.User;

import javax.ejb.EJB;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import java.util.List;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;



@Path("/hello-world")
public class HelloResource {

    @EJB
    private Repository rep;

    @GET
    @Produces(APPLICATION_JSON)
    public Response hello() {

        List<User> users = rep.getUsers();
        if(users != null) {
            return Response.status(200)
                    .entity(users)
                    .build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }
}