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

// Define la ruta base para los coches y especifica que se trabajará con JSON.
@Path("/coches")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CocheController {

    // Inyección del servicio que contiene la lógica de negocio para los coches.
    @Inject
    CocheService cocheService;

    // Método GET para listar todos los coches.
    @GET
    public List<Coche> listarCoches() {
        return cocheService.obtenerTodos();
    }

    // Método GET para obtener un coche en concreto según su ID.
    @GET
    @Path("/{id}")
    public Response obtenerCoche(@PathParam("id") Long id) {
        Coche coche = cocheService.obtenerPorId(id);
        if (coche == null) {
            // Si no se encuentra el coche, devuelve un estado 404.
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        // Si se encuentra, devuelve el coche con estado 200.
        return Response.ok(coche).build();
    }

    // Método POST para crear un nuevo coche.
    @POST
    public Response crearCoche(Coche coche) {
        cocheService.crearCoche(coche);
        // Devuelve un estado 201 (creado) junto con el objeto creado.
        return Response.status(Response.Status.CREATED).entity(coche).build();
    }

    // Método PUT para actualizar un coche existente según su ID.
    @PUT
    @Path("/{id}")
    public Response actualizarCoche(@PathParam("id") Long id, Coche coche) {
        Coche cocheExistente = cocheService.obtenerPorId(id);
        if (cocheExistente == null) {
            // Si el coche no existe, devuelve un 404.
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        // Actualiza el coche y devuelve el coche actualizado con estado 200.
        cocheService.actualizarCoche(id, coche);
        return Response.ok().entity(cocheExistente).build();
    }

    // Método DELETE para eliminar un coche según su ID.
    @DELETE
    @Path("/{id}")
    public Response eliminarCoche(@PathParam("id") Long id) {
        if (!cocheService.eliminarCoche(id)) {
            // Si no se encuentra el coche, devuelve 404 con mensaje de error.
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("No se encontró el coche con el id " + id)
                    .build();
        }
        // Si se elimina correctamente, devuelve un mensaje confirmando la eliminación.
        String mensaje = "El coche ha sido eliminado con el id " + id;
        return Response.ok(mensaje).build();
    }
}
