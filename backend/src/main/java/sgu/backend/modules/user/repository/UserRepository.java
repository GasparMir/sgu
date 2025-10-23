package sgu.backend.modules.user.repository;

import sgu.backend.modules.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByNombreCompletoContainingIgnoreCase(String nombreCompleto);
}
