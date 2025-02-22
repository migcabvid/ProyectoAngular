package org.trabajoAngular.repository;

import java.util.Optional;

import org.trabajoAngular.entities.Coche;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CocheRepository implements PanacheRepository<Coche> {

    // Buscar coche por matrícula
    public Optional<Coche> findByMatricula(String matricula) {
        return find("matricula", matricula).firstResultOptional();
    }

    // Eliminar coche por matrícula
    public boolean deleteByMatricula(String matricula) {
        return delete("matricula", matricula) > 0;
    }
}
