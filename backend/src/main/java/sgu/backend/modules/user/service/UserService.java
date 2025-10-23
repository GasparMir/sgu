package sgu.backend.modules.user.service;

import sgu.backend.modules.user.model.User;
import sgu.backend.modules.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<User> getAll() { return repo.findAll(); }
    public Optional<User> getById(Long id) { return repo.findById(id); }
    public User save(User user) { return repo.save(user); }
    public void delete(Long id) { repo.deleteById(id); }
    public List<User> search(String term) {
        return repo.findByNombreCompletoContainingIgnoreCase(term);
    }
}
