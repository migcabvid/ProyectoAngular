package org.trabajoAngular.repository;

import java.util.Optional;

import org.trabajoAngular.entities.Taller;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class TallerRepository implements PanacheRepository<Taller> {

    // Buscar taller por nombre
    public Optional<Taller> findByNombre(String nombre) {
        return find("nombre", nombre).firstResultOptional();
    }

    // Eliminar taller por nombre
    public boolean deleteByNombre(String nombre) {
        return delete("nombre", nombre) > 0;
    }
}
