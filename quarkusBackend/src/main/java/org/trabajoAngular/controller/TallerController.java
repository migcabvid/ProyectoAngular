package org.trabajoAngular.controller;

import java.util.List;

import org.jboss.resteasy.annotations.jaxrs.PathParam;
import org.trabajoAngular.entities.Taller;
import org.trabajoAngular.service.TallerService;

import jakarta.ws.rs.Produces;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/tallers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TallerController {

    @Inject
    TallerService tallerService;

    @GET
    public List<Taller> listarTalleres() {
        return tallerService.obtenerTodos();
    }

    @GET
    @Path("/{id}")
    public Response obtenerTaller(@PathParam("id") Long id) {
        Taller taller = tallerService.obtenerPorId(id);
        if (taller == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(taller).build();
    }

    @POST
    public Response crearTaller(Taller taller) {
        tallerService.crearTaller(taller);
        return Response.status(Response.Status.CREATED).entity(taller).build();
    }

    @PUT
    @Path("/{id}")
    public Response actualizarTaller(@PathParam("id") Long id, Taller taller) {
        if (!tallerService.actualizarTaller(id, taller)) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok().entity(taller).build();
    }

    @DELETE
    @Path("/{id}")
    public Response eliminarTaller(@PathParam("id") Long id) {
        if (!tallerService.eliminarTaller(id)) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("No se encontró el taller con el id " + id)
                    .build();
        }
        String mensaje = "El taller ha sido eliminado con el id " + id;
        return Response.ok(mensaje).build();
    }
}
