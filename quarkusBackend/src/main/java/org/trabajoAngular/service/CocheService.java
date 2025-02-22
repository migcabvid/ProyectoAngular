package org.trabajoAngular.service;

import java.util.List;

import org.trabajoAngular.entities.Coche;
import org.trabajoAngular.repository.CocheRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class CocheService {

    @Inject
    CocheRepository cocheRepository;

    public List<Coche> obtenerTodos() {
        return cocheRepository.listAll();
    }

    public Coche obtenerPorId(Long id) {
        return cocheRepository.findById(id);
    }

    @Transactional
    public void crearCoche(Coche coche) {
        cocheRepository.persist(coche);
    }

    @Transactional
    public void actualizarCoche(Long id, Coche coche) {
        Coche cocheExistente = cocheRepository.findById(id);
        if (cocheExistente != null) {
            cocheExistente.setMarca(coche.getMarca());
            cocheExistente.setModelo(coche.getModelo());
            cocheExistente.setMatricula(coche.getMatricula());
            cocheExistente.setColor(coche.getColor());
            cocheExistente.setPrecio(coche.getPrecio());
        }
    }

    @Transactional
    public boolean eliminarCoche(Long id) {
        return cocheRepository.deleteById(id);
    }
}
