package org.trabajoAngular.service;

import java.util.List;
import java.util.Optional;

import org.trabajoAngular.entities.Taller;
import org.trabajoAngular.repository.TallerRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped // Indica que esta clase se instancia una sola vez en toda la aplicación.
public class TallerService {

    // Inyección del repositorio para acceder a la base de datos de Taller.
    @Inject
    TallerRepository tallerRepository;

    // Devuelve una lista con todos los talleres.
    public List<Taller> obtenerTodos() {
        return tallerRepository.listAll();
    }

    // Busca y devuelve un taller según su ID.
    public Taller obtenerPorId(Long id) {
        return tallerRepository.findById(id);
    }

    // Busca un taller por su nombre y lo devuelve envuelto en un Optional.
    public Optional<Taller> obtenerPorNombre(String nombre) {
        return tallerRepository.findByNombre(nombre);
    }

    // Método transaccional para crear un nuevo taller en la base de datos.
    @Transactional
    public void crearTaller(Taller taller) {
        tallerRepository.persist(taller);
    }

    // Método transaccional para actualizar un taller existente.
    // Retorna true si la actualización se realizó correctamente, o false si no se encontró el taller.
    @Transactional
    public boolean actualizarTaller(Long id, Taller taller) {
        Taller tallerExistente = tallerRepository.findById(id);
        if (tallerExistente != null) {
            // Actualiza los atributos del taller con los nuevos valores.
            tallerExistente.setNombre(taller.getNombre());
            tallerExistente.setDireccion(taller.getDireccion());
            tallerExistente.setTelefono(taller.getTelefono());
            tallerExistente.setCapacidad(taller.getCapacidad());
            tallerExistente.setHorario(taller.getHorario());
            return true;
        }
        return false;
    }

    // Método transaccional para eliminar un taller por su ID.
    @Transactional
    public boolean eliminarTaller(Long id) {
        return tallerRepository.deleteById(id);
    }
}
