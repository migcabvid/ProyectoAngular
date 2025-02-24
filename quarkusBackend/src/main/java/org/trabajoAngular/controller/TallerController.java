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

// Define la ruta base "/tallers" para acceder a los recursos de Taller y se indica que se utiliza JSON.
@Path("/tallers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TallerController {

    // Inyección del servicio que gestiona la lógica de negocio para los talleres.
    @Inject
    TallerService tallerService;

    // Método GET para listar todos los talleres.
    @GET
    public List<Taller> listarTalleres() {
        return tallerService.obtenerTodos();
    }

    // Método GET para obtener un taller específico mediante su ID.
    @GET
    @Path("/{id}")
    public Response obtenerTaller(@PathParam("id") Long id) {
        Taller taller = tallerService.obtenerPorId(id);
        if (taller == null) {
            // Si no se encuentra el taller, devuelve un estado 404 (Not Found).
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        // Devuelve el taller encontrado con estado 200 (OK).
        return Response.ok(taller).build();
    }

    // Método POST para crear un nuevo taller.
    @POST
    public Response crearTaller(Taller taller) {
        tallerService.crearTaller(taller);
        // Devuelve un estado 201 (Created) junto con el objeto creado.
        return Response.status(Response.Status.CREATED).entity(taller).build();
    }

    // Método PUT para actualizar un taller existente.
    @PUT
    @Path("/{id}")
    public Response actualizarTaller(@PathParam("id") Long id, Taller taller) {
        // Si la actualización falla (por ejemplo, el taller no existe), devuelve 404.
        if (!tallerService.actualizarTaller(id, taller)) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        // Devuelve el taller actualizado con estado 200 (OK).
        return Response.ok().entity(taller).build();
    }

    // Método DELETE para eliminar un taller por su ID.
    @DELETE
    @Path("/{id}")
    public Response eliminarTaller(@PathParam("id") Long id) {
        if (!tallerService.eliminarTaller(id)) {
            // Si no se encuentra el taller, devuelve un estado 404 con un mensaje de error.
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("No se encontró el taller con el id " + id)
                    .build();
        }
        // Si se elimina correctamente, devuelve un mensaje de confirmación.
        String mensaje = "El taller ha sido eliminado con el id " + id;
        return Response.ok(mensaje).build();
    }
}
