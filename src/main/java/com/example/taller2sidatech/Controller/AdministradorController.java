package com.example.taller2sidatech.Controller;

import com.example.taller2sidatech.Model.Entity.Compra;
import com.example.taller2sidatech.Model.Entity.Producto;
import com.example.taller2sidatech.Service.ICompraService;
import com.example.taller2sidatech.Service.IProductoService;
import com.example.taller2sidatech.Service.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

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
    public String home(Model model ){

        List<Producto> productos = IProductoService.findAll();
        model.addAttribute("productos", productos);

        return "administrador/home";
    }

    @GetMapping("/usuarios")
    public String usuarios(Model model ){
        model.addAttribute("usuarios", usuarioService.findAll());
        return "administrador/usuarios";
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
