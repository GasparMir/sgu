package sgu.backend.modules.user.controller;

import sgu.backend.modules.user.model.User;
import sgu.backend.modules.user.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService service;

    public UserController(UserService service) { this.service = service; }

    @GetMapping
    public List<User> getAll() {
        return service.getAll();
    }

    @GetMapping("/search")
    public List<User> search(@RequestParam String q) {
        return service.search(q);
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return service.save(user);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        return service.save(user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
