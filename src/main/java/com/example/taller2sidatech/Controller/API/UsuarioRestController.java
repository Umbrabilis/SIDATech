package com.example.taller2sidatech.Controller.API;

import com.example.taller2sidatech.Model.Entity.Usuario;
import com.example.taller2sidatech.Service.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioRestController {

    @Autowired
    private IUsuarioService usuarioService;

    private BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();

    // GET /api/usuarios - Listar todos los usuarios
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioService.findAll();
    }

    // GET /api/usuarios/1 - Obtener un usuario específico
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuario(@PathVariable Integer id) {
        Optional<Usuario> usuario = usuarioService.findById(id);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        }
        return ResponseEntity.notFound().build();
    }

    // POST /api/usuarios/registro - Registrar nuevo usuario
    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        // Validar formato de contraseña
        if (!usuario.getPassword().matches("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")) {
            return ResponseEntity.badRequest()
                    .body("La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra y un número.");
        }

        // Verificar si el correo ya existe
        Optional<Usuario> usuarioExistente = usuarioService.findByEmail(usuario.getEmail());
        if (usuarioExistente.isPresent()) {
            return ResponseEntity.badRequest()
                    .body("Ya existe un usuario con este correo electrónico.");
        }

        // Encriptar contraseña
        usuario.setPassword(passEncoder.encode(usuario.getPassword()));
        usuario.setTipo("USER");

        Usuario usuarioGuardado = usuarioService.save(usuario);
        return ResponseEntity.ok(usuarioGuardado);
    }

    // POST /api/usuarios/login - Login de usuario
    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody LoginRequest loginRequest) {
        Optional<Usuario> usuario = usuarioService.findByEmail(loginRequest.getEmail());

        if (usuario.isPresent() && passEncoder.matches(loginRequest.getPassword(), usuario.get().getPassword())) {
            // Crear respuesta sin la contraseña
            Usuario usuarioResponse = usuario.get();
            usuarioResponse.setPassword(null);
            return ResponseEntity.ok(usuarioResponse);
        }

        return ResponseEntity.badRequest().body("Credenciales incorrectas");
    }

    // Clase interna para el request de login
    public static class LoginRequest {
        private String email;
        private String password;

        // Getters y setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}