package org.trabajoAngular.service;

import java.util.List;

import org.trabajoAngular.entities.Coche;
import org.trabajoAngular.repository.CocheRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped // Indica que esta clase tiene un ámbito de aplicación, es decir, se crea una sola instancia para toda la aplicación.
public class CocheService {

    // Inyección del repositorio que se encarga de las operaciones con la base de datos para la entidad Coche.
    @Inject
    CocheRepository cocheRepository;

    // Método para obtener una lista de todos los coches.
    public List<Coche> obtenerTodos() {
        return cocheRepository.listAll();
    }

    // Método para obtener un coche específico a través de su ID.
    public Coche obtenerPorId(Long id) {
        return cocheRepository.findById(id);
    }

    // Método transaccional para crear un nuevo coche en la base de datos.
    @Transactional
    public void crearCoche(Coche coche) {
        cocheRepository.persist(coche);
    }

    // Método transaccional para actualizar un coche existente.
    @Transactional
    public void actualizarCoche(Long id, Coche coche) {
        // Se busca el coche existente mediante su ID.
        Coche cocheExistente = cocheRepository.findById(id);
        if (cocheExistente != null) {
            // Se actualizan los atributos del coche existente con los nuevos valores.
            cocheExistente.setMarca(coche.getMarca());
            cocheExistente.setModelo(coche.getModelo());
            cocheExistente.setMatricula(coche.getMatricula());
            cocheExistente.setColor(coche.getColor());
            cocheExistente.setPrecio(coche.getPrecio());
        }
    }

    // Método transaccional para eliminar un coche a partir de su ID.
    @Transactional
    public boolean eliminarCoche(Long id) {
        return cocheRepository.deleteById(id);
    }
}
