package org.trabajoAngular.controller;

import java.util.List;

import org.jboss.resteasy.annotations.jaxrs.PathParam;
import org.trabajoAngular.entities.Coche;
import org.trabajoAngular.service.CocheService;

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

@Path("/coches")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CocheController {

    @Inject
    CocheService cocheService;

    @GET
    public List<Coche> listarCoches() {
        return cocheService.obtenerTodos();
    }

    @GET
    @Path("/{id}")
    public Response obtenerCoche(@PathParam("id") Long id) {
        Coche coche = cocheService.obtenerPorId(id);
        if (coche == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(coche).build();
    }

    @POST
    public Response crearCoche(Coche coche) {
        cocheService.crearCoche(coche);
        return Response.status(Response.Status.CREATED).entity(coche).build();
    }

    @PUT
    @Path("/{id}")
    public Response actualizarCoche(@PathParam("id") Long id, Coche coche) {
        Coche cocheExistente = cocheService.obtenerPorId(id);
        if (cocheExistente == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        cocheService.actualizarCoche(id, coche);
        return Response.ok().entity(cocheExistente).build();
    }

    @DELETE
    @Path("/{id}")
    public Response eliminarCoche(@PathParam("id") Long id) {
        if (!cocheService.eliminarCoche(id)) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("No se encontró el coche con el id " + id)
                    .build();
        }
        String mensaje = "El coche ha sido eliminado con el id " + id;
        return Response.ok(mensaje).build();
    }
}
