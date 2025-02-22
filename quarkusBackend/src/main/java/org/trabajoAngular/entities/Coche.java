package org.trabajoAngular.entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "coche")
public class Coche {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "marca", nullable = false)
    @NotNull(message = "La marca no puede ser nula")
    @Size(max = 50, message = "La marca no puede tener más de 50 caracteres")
    private String marca;

    @Column(name = "modelo", nullable = false)
    @NotNull(message = "El modelo no puede ser nulo")
    @Size(max = 50, message = "El modelo no puede tener más de 50 caracteres")
    private String modelo;

    @Column(name = "matricula", nullable = false, unique = true)
    @NotNull(message = "La matrícula no puede ser nula")
    @Size(max = 10, message = "La matrícula no puede tener más de 10 caracteres")
    private String matricula;

    @Column(name = "color", nullable = false)
    @NotNull(message = "El color no puede ser nulo")
    @Size(max = 20, message = "El color no puede tener más de 20 caracteres")
    private String color;

    @Column(name = "precio", nullable = false)
    @NotNull(message = "El precio no puede ser nulo")
    private Double precio;

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }
}
