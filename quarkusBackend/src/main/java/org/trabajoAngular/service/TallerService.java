package org.trabajoAngular.service;

import java.util.List;
import java.util.Optional;

import org.trabajoAngular.entities.Taller;
import org.trabajoAngular.repository.TallerRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class TallerService {

    @Inject
    TallerRepository tallerRepository;

    public List<Taller> obtenerTodos() {
        return tallerRepository.listAll();
    }

    public Taller obtenerPorId(Long id) {
        return tallerRepository.findById(id);
    }

    public Optional<Taller> obtenerPorNombre(String nombre) {
        return tallerRepository.findByNombre(nombre);
    }

    @Transactional
    public void crearTaller(Taller taller) {
        tallerRepository.persist(taller);
    }

    @Transactional
    public boolean actualizarTaller(Long id, Taller taller) {
        Taller tallerExistente = tallerRepository.findById(id);
        if (tallerExistente != null) {
            tallerExistente.setNombre(taller.getNombre());
            tallerExistente.setDireccion(taller.getDireccion());
            tallerExistente.setTelefono(taller.getTelefono());
            tallerExistente.setCapacidad(taller.getCapacidad());
            tallerExistente.setHorario(taller.getHorario());
            return true;
        }
        return false;
    }

    @Transactional
    public boolean eliminarTaller(Long id) {
        return tallerRepository.deleteById(id);
    }
}
