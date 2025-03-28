package com.example.taller2sidatech.Controller;

import com.example.taller2sidatech.Model.Entity.Compra;
import com.example.taller2sidatech.Model.Entity.DetalleCompra;
import com.example.taller2sidatech.Model.Entity.Producto;
import com.example.taller2sidatech.Service.ProductoService;
import jdk.jfr.Registered;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/")
public class HomeController {

    @Autowired
    private ProductoService productoService;

    List<DetalleCompra> detalles = new ArrayList<>();
    Compra compra = new Compra();

    @GetMapping("")
    public String home(Model model) {

        model.addAttribute("productos", productoService.findAll());
        return "usuario/home";
    }

    @GetMapping("/productohome/{id}")
    public String productoHome(@PathVariable Integer id, Model model){

        Producto producto = new Producto();
        Optional<Producto> productoOptional = productoService.get(id);
        producto = productoOptional.get();

        model.addAttribute("producto", producto);
        return "usuario/productohome";
    }

    @PostMapping("/cart")
    public String addCart(@RequestParam Integer id, @RequestParam Integer cantidad, Model model) {
        DetalleCompra detalleCompra = new DetalleCompra();
        Producto producto = new Producto();
        double sumaTotal=0;

        Optional<Producto> optionalProducto = productoService.get(id);
        producto = optionalProducto.get();

        detalleCompra.setCantidad(cantidad);
        detalleCompra.setPrecio(producto.getPrecio());
        detalleCompra.setNombre(producto.getNombre());
        detalleCompra.setTotal(producto.getPrecio() * cantidad);
        detalleCompra.setProducto(producto);

        detalles.add(detalleCompra);
        sumaTotal= detalles.stream().mapToDouble(dt -> dt.getTotal()).sum();
        compra.setTotal(sumaTotal);
        model.addAttribute("cart", detalles);
        model.addAttribute("compra", compra);

        return "usuario/carrito";
    }
}
