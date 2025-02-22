package org.trabajoAngular.service;

import java.util.List;

import org.trabajoAngular.entities.Usuario;
import org.trabajoAngular.repository.UsuarioRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class UsuarioService {

    @Inject
    UsuarioRepository usuarioRepository;

    public List<Usuario> obtenerTodos() {
        return usuarioRepository.listAll();
    }

    public Usuario obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    @Transactional
    public void crearUsuario(Usuario usuario) {
        usuarioRepository.persist(usuario);
    }

    @Transactional
    public void actualizarUsuario(Long id, Usuario usuario) {
        Usuario usuarioExistente = usuarioRepository.findById(id);
        if (usuarioExistente != null) {
            usuarioExistente.setNombre(usuario.getNombre());
            usuarioExistente.setApellidos(usuario.getApellidos());
            usuarioExistente.setCorreo(usuario.getCorreo());
            usuarioExistente.setContrasena(usuario.getContrasena());
        }
    }

    @Transactional
    public boolean eliminarUsuario(Long id) {
        return usuarioRepository.deleteById(id);
    }
}