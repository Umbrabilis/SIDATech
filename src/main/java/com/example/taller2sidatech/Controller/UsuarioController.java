package com.example.taller2sidatech.Controller;

import com.example.taller2sidatech.Model.Entity.Compra;
import com.example.taller2sidatech.Model.Entity.Usuario;
import com.example.taller2sidatech.Service.ICompraService;
import com.example.taller2sidatech.Service.IUsuarioService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private IUsuarioService usuarioService;

    @Autowired
    private ICompraService compraService;

    BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();

    @GetMapping("/registro")
    public String create(){
        return "usuario/registro";
    }

    @GetMapping("/login")
    public String login() {
        return "usuario/login";
    }

    @GetMapping("/acceder")
    public String acceder(Usuario usuario, HttpSession session){

        Optional<Usuario> user = usuarioService.findById(Integer.parseInt(session.getAttribute("idusuario").toString()));

        if (user.isPresent()) {
            session.setAttribute("idusuario", user.get().getId());
            if (user.get().getTipo().equals("ADMIN")) {
                return "redirect:/administrador";
            } else {
                return "redirect:/";
            }
        }

        return "redirect:/";
    }

    @GetMapping("/compras")
    public String getCompras(HttpSession session, Model model) {
        model.addAttribute("sesion", session.getAttribute("idusuario"));

        Usuario usuario = usuarioService.findById(Integer.parseInt(session.getAttribute("idusuario").toString())).get();
        List<Compra> compras = compraService.findByUsuario(usuario);
        model.addAttribute("compras", compras);

        return "usuario/compras";
    }

    @GetMapping("detalle/{id}")
    public String detalleCompra(@PathVariable("id") Integer id, Model model, HttpSession session) {
        Optional<Compra> compra = compraService.findById(id);

        model.addAttribute("detalles", compra.get().getDetalleCompras());
        model.addAttribute("sesion", session.getAttribute("idusuario"));
        return "usuario/detallecompra";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.removeAttribute("idusuario");
        return "redirect:/";
    }

    @PostMapping("/save")
    public String save(Usuario usuario, Model model, RedirectAttributes redirectAttributes) {
        // Validar formato de contraseña
        if (!usuario.getPassword().matches("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")) {
            // Usar redirectAttributes para mensajes flash que sobreviven redirecciones
            redirectAttributes.addFlashAttribute("error", "La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra y un número.");
            return "redirect:/usuario/registro";
        }

        // Verificar si el correo ya existe
        Optional<Usuario> usuarioExistente = usuarioService.findByEmail(usuario.getEmail());
        if (usuarioExistente.isPresent()) {
            redirectAttributes.addFlashAttribute("error", "Este correo electrónico ya está registrado.");
            return "redirect:/usuario/registro";
        }

        usuario.setTipo("USER");
        usuario.setPassword(passEncoder.encode(usuario.getPassword()));
        usuarioService.save(usuario);
        redirectAttributes.addFlashAttribute("success", "Usuario registrado correctamente");
        return "redirect:/usuario/login";
    }


}
