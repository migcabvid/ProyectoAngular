package org.trabajoAngular.controller;

import java.util.List;

import org.jboss.resteasy.annotations.jaxrs.PathParam;
import org.trabajoAngular.entities.Usuario;
import org.trabajoAngular.service.UsuarioService;

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

// Se define la ruta base "/usuarios" y se especifica que se va a trabajar con JSON.
@Path("/usuarios")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UsuarioController {

    // Se inyecta el servicio que contiene la lógica de negocio para los usuarios.
    @Inject
    UsuarioService usuarioService;

    // Método GET para obtener la lista de todos los usuarios.
    @GET
    public List<Usuario> listarUsuarios() {
        return usuarioService.obtenerTodos();
    }

    // Método GET para obtener un usuario concreto mediante su ID.
    @GET
    @Path("/{id}")
    public Response obtenerUsuario(@PathParam("id") Long id) {
        Usuario usuario = usuarioService.obtenerPorId(id);
        if (usuario == null) {
            // Si no se encuentra el usuario, se devuelve un 404 (No encontrado).
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        // Se devuelve el usuario encontrado con un estado 200 (OK).
        return Response.ok(usuario).build();
    }

    // Método POST para crear un nuevo usuario.
    @POST
    public Response crearUsuario(Usuario usuario) {
        usuarioService.crearUsuario(usuario);
        // Se devuelve un estado 201 (Creado) junto con el usuario creado.
        return Response.status(Response.Status.CREATED).entity(usuario).build();
    }

    // Método PUT para actualizar los datos de un usuario existente.
    @PUT
    @Path("/{id}")
    public Response actualizarUsuario(@PathParam("id") Long id, Usuario usuario) {
        Usuario usuarioExistente = usuarioService.obtenerPorId(id);
        if (usuarioExistente == null) {
            // Si no se encuentra el usuario, se devuelve un 404 (No encontrado).
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        // Se actualiza el usuario y se devuelve el usuario actualizado con un estado 200 (OK).
        usuarioService.actualizarUsuario(id, usuario);
        return Response.ok().entity(usuarioExistente).build();
    }

    // Método DELETE para eliminar un usuario según su ID.
    @DELETE
    @Path("/{id}")
    public Response eliminarUsuario(@PathParam("id") Long id) {
        if (!usuarioService.eliminarUsuario(id)) {
            // Si el usuario no se encuentra, se devuelve un 404 junto con un mensaje de error.
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("No se encontró el usuario con el id " + id)
                    .build();
        }
        // Si se elimina correctamente, se devuelve un mensaje de confirmación.
        String mensaje = "El usuario ha sido eliminado con el id " + id;
        return Response.ok(mensaje).build();
    }
}
