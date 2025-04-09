package com.example.taller2sidatech.Controller;

import com.example.taller2sidatech.Model.Entity.Compra;
import com.example.taller2sidatech.Model.Entity.Producto;
import com.example.taller2sidatech.Model.Entity.Usuario;
import com.example.taller2sidatech.Service.ICompraService;
import com.example.taller2sidatech.Service.IProductoService;
import com.example.taller2sidatech.Service.IUsuarioService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/administrador")
public class AdministradorController {

    @Autowired
    private IProductoService IProductoService;

    @Autowired
    private IUsuarioService usuarioService;

    @Autowired
    private ICompraService compraService;

    @GetMapping("")
    public String home(Model model, HttpSession session) {
        // Verificar si el usuario es un administrador
        Usuario usuario = usuarioService.findById(Integer.parseInt(session.getAttribute("idusuario").toString())).orElse(null);
        if (usuario == null || !usuario.getTipo().equals("ADMIN")) {
            return "redirect:/";  // Redirigir al inicio si no es administrador
        }

        List<Producto> productos = IProductoService.findAll();
        model.addAttribute("productos", productos);
        return "administrador/home";
    }

    @GetMapping("/usuarios")
    public String usuarios(Model model ){
        model.addAttribute("usuarios", usuarioService.findAll());
        return "administrador/usuarios";
    }

    @GetMapping("/usuarios/editar/{id}")
    public String editarUsuario(@PathVariable Integer id, Model model) {
        Optional<Usuario> usuario = usuarioService.findById(id);
        model.addAttribute("usuario", usuario.get());
        return "administrador/editarUsuario";
    }

    @PostMapping("/usuarios/actualizar")
    public String actualizarUsuario(Usuario usuario) {
        // Obtener el usuario actual para mantener la contraseña y tipo si no se cambian
        Optional<Usuario> usuarioActual = usuarioService.findById(usuario.getId());
        if (usuarioActual.isPresent()) {
            // Mantener la contraseña actual y el tipo de usuario
            usuario.setPassword(usuarioActual.get().getPassword());
            usuario.setTipo(usuarioActual.get().getTipo());
            usuarioService.update(usuario);
        }
        return "redirect:/administrador/usuarios";
    }

    @GetMapping("/usuarios/eliminar/{id}")
    public String eliminarUsuario(@PathVariable Integer id) {
        usuarioService.delete(id);
        return "redirect:/administrador/usuarios";
    }

    @GetMapping("/compras")
    public String compras(Model model ){
        model.addAttribute("compras", compraService.findAll());
        return "administrador/compras";
    }

    @GetMapping("/detalle/{id}")
    public String detalle(Model model, @PathVariable Integer id){
        Compra compra = compraService.findById(id).get();
        model.addAttribute("detalles", compra.getDetalleCompras());
        return "administrador/detallecompra";
    }
}