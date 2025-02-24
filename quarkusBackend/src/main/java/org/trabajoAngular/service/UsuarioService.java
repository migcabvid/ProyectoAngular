package org.trabajoAngular.service;

import java.util.List;

import org.trabajoAngular.entities.Usuario;
import org.trabajoAngular.repository.UsuarioRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped // La clase se crea una única vez para toda la aplicación.
public class UsuarioService {

    // Inyección del repositorio que se encarga de las operaciones en la base de datos para Usuario.
    @Inject
    UsuarioRepository usuarioRepository;

    // Devuelve una lista con todos los usuarios.
    public List<Usuario> obtenerTodos() {
        return usuarioRepository.listAll();
    }

    // Busca y devuelve un usuario según su ID.
    public Usuario obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    // Método transaccional para crear un nuevo usuario en la base de datos.
    @Transactional
    public void crearUsuario(Usuario usuario) {
        usuarioRepository.persist(usuario);
    }

    // Método transaccional para actualizar un usuario existente.
    @Transactional
    public void actualizarUsuario(Long id, Usuario usuario) {
        // Se busca el usuario existente mediante su ID.
        Usuario usuarioExistente = usuarioRepository.findById(id);
        if (usuarioExistente != null) {
            // Se actualizan los atributos del usuario.
            usuarioExistente.setNombre(usuario.getNombre());
            usuarioExistente.setApellidos(usuario.getApellidos());
            usuarioExistente.setCorreo(usuario.getCorreo());
            usuarioExistente.setContrasena(usuario.getContrasena());
        }
    }

    // Método transaccional para eliminar un usuario por su ID.
    @Transactional
    public boolean eliminarUsuario(Long id) {
        return usuarioRepository.deleteById(id);
    }
}
