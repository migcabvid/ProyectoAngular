package org.trabajoAngular.repository;

import java.util.Optional;

import org.trabajoAngular.entities.Usuario;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UsuarioRepository implements PanacheRepository<Usuario> {

    // Buscar usuario por correo electrónico
    public Optional<Usuario> findByCorreo(String correo) {
        return find("correo", correo).firstResultOptional();
    }

    // Eliminar usuario por correo
    public boolean deleteByCorreo(String correo) {
        return delete("correo", correo) > 0;
    }
}
