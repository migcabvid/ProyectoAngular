package org.trabajoAngular.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "taller")
public class Taller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false, length = 50)
    @NotNull(message = "El nombre no puede ser nulo")
    @Size(max = 50, message = "El nombre no puede tener más de 50 caracteres")
    private String nombre;

    @Column(name = "direccion", nullable = false, length = 100)
    @NotNull(message = "La dirección no puede ser nula")
    @Size(max = 100, message = "La dirección no puede tener más de 100 caracteres")
    private String direccion;

    @Column(name = "telefono", nullable = false, unique = true, length = 15)
    @NotNull(message = "El teléfono no puede ser nulo")
    @Size(max = 15, message = "El teléfono no puede tener más de 15 caracteres")
    private String telefono;

    @Column(name = "capacidad", nullable = false)
    @NotNull(message = "La capacidad no puede ser nula")
    @Min(value = 1, message = "La capacidad debe ser al menos 1")
    private Integer capacidad;

    @Column(name = "horario", nullable = false, length = 100)
    @NotNull(message = "El horario no puede ser nulo")
    @Size(max = 100, message = "El horario no puede tener más de 100 caracteres")
    private String horario;

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Integer getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }
}
