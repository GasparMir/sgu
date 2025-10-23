package sgu.backend.modules.user.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "nombre_completo")
    private String nombreCompleto;

    @Column(nullable = false, name = "correo_electronico")
    private String correoElectronico;

    @Column(nullable = false)
    private String telefono;
}