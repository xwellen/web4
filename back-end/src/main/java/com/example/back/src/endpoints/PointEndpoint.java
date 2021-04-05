package com.example.back.src.endpoints;

import com.example.back.src.database.Repository;
import com.example.back.src.entities.Point;
import com.example.back.src.entities.User;
import com.example.back.src.templates.PointRequest;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import java.util.Base64;
import java.util.List;

@Path("/points")
public class PointEndpoint {

    @EJB
    Repository rep;


    @GET
    @Path("/")
    public Response getAllPoints(@HeaderParam(HttpHeaders.AUTHORIZATION) String header) {
        System.out.println("in get ponts");
        try {
            String creds = header.split(" ")[1];
            String str = new String(Base64.getDecoder().decode(creds));
            String[] arr = str.split(":");

            String login = arr[0];
            String password = arr[1];

            User user = rep.getUserWithLoginPassword(login, password);
            if(user == null) {
                throw new Exception("unauthorized!");
            }

            List<Point> points = rep.getPoints(login);

            StringBuilder builder = new StringBuilder();

            for (Point point : points) {
                builder.append(point.toString());
            }

            return Response.ok(points).build();
        } catch (Exception e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(e.getMessage()).build();
        }
    }


    @POST
    @Path("/")
    public Response addPoint(@HeaderParam(HttpHeaders.AUTHORIZATION) String header, PointRequest pointRequest) {

        try {
            String creds = header.split(" ")[1];
            String str = new String(Base64.getDecoder().decode(creds));
            String[] arr = str.split(":");

            String login = arr[0];
            String password = arr[1];

            User user = rep.getUserWithLoginPassword(login, password);
            if(user == null) {
                throw new Exception("unauthorized!");
            }

            Point point = new Point(pointRequest.getX(), pointRequest.getY(), pointRequest.getR(), login);

            if (point.getR() <= 0) {
                return Response.ok(Response.Status.BAD_REQUEST).entity("R can not be less than zero!").build();
            }

            Point savedPoint = rep.savePoint(point);
            Long pointId = savedPoint.getId();

            return Response.status(Response.Status.CREATED).entity(savedPoint).build();

        } catch (Exception e) {

            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

    }
}
