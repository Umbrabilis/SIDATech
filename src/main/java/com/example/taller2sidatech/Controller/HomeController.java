package com.example.taller2sidatech.Controller;

import com.example.taller2sidatech.Model.Entity.Compra;
import com.example.taller2sidatech.Model.Entity.DetalleCompra;
import com.example.taller2sidatech.Model.Entity.Producto;
import com.example.taller2sidatech.Model.Entity.Usuario;
import com.example.taller2sidatech.Service.ICompraService;
import com.example.taller2sidatech.Service.IDetalleCompraService;
import com.example.taller2sidatech.Service.IUsuarioService;
import com.example.taller2sidatech.Service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/")
public class HomeController {

    @Autowired
    private IProductoService IProductoService;

    @Autowired
    private IUsuarioService usuarioService;

    @Autowired
    private ICompraService compraService;

    @Autowired
    private IDetalleCompraService detalleCompraService;

    List<DetalleCompra> detalles = new ArrayList<DetalleCompra>();
    Compra compra = new Compra();

    @GetMapping("")
    public String home(Model model) {

        model.addAttribute("productos", IProductoService.findAll());
        return "usuario/home";
    }

    @GetMapping("/productohome/{id}")
    public String productoHome(@PathVariable Integer id, Model model){

        Producto producto = new Producto();
        Optional<Producto> productoOptional = IProductoService.get(id);
        producto = productoOptional.get();

        model.addAttribute("producto", producto);
        return "usuario/productohome";
    }

    @PostMapping("/cart")
    public String addCart(@RequestParam Integer id, @RequestParam Integer cantidad, Model model) {
        DetalleCompra detalleCompra = new DetalleCompra();
        Producto producto = new Producto();
        double sumaTotal=0;

        Optional<Producto> optionalProducto = IProductoService.get(id);
        producto = optionalProducto.get();

        detalleCompra.setCantidad(cantidad);
        detalleCompra.setPrecio(producto.getPrecio());
        detalleCompra.setNombre(producto.getNombre());
        detalleCompra.setTotal(producto.getPrecio() * cantidad);
        detalleCompra.setProducto(producto);

        //Verificar si el producto ya existe en el carrito
        Integer idproducto = producto.getId();
        boolean ingresado = detalles.stream().anyMatch(p -> p.getProducto().getId() == idproducto);
        if (!ingresado){
            detalles.add(detalleCompra);
        }


        sumaTotal= detalles.stream().mapToDouble(dt -> dt.getTotal()).sum();
        compra.setTotal(sumaTotal);
        model.addAttribute("cart", detalles);
        model.addAttribute("compra", compra);

        return "usuario/carrito";
    }

    @GetMapping("/delete/cart/{id}")
    public String deleteProductCart(@PathVariable Integer id, Model model) {

        List<DetalleCompra> comprasNueva = new ArrayList<DetalleCompra>();

        for (DetalleCompra detalleCompra : detalles) {
            if (detalleCompra.getProducto().getId() != id) {
                comprasNueva.add(detalleCompra);
            }
        }
        //Nueva lista con productos restantes
        detalles= comprasNueva;

        double sumaTotal=0;
        sumaTotal= detalles.stream().mapToDouble(dt -> dt.getTotal()).sum();
        compra.setTotal(sumaTotal);
        model.addAttribute("cart", detalles);
        model.addAttribute("compra", compra);

        return "usuario/carrito";
    }

    @GetMapping("/getCart")
    public String getCart(Model model) {
        model.addAttribute("cart", detalles);
        model.addAttribute("compra", compra);
        return "usuario/carrito";
    }

    @GetMapping("/order")
    public String order(Model model) {

        Usuario usuario = usuarioService.findById(1).get();

        model.addAttribute("cart", detalles);
        model.addAttribute("compra", compra);
        model.addAttribute("usuario", usuario);
        return "usuario/resumencompra";
    }

    @GetMapping("/saveOrder")
    public String saveOrder() {
        Date fechaCreacion = new Date();
        compra.setFechaCreacion(fechaCreacion);
        compra.setNumero(compraService.generarNumeroOrden());

        Usuario usuario = usuarioService.findById(1).get();
        compra.setUsuario(usuario);
        compraService.save(compra);

        //guardar detalles
        for (DetalleCompra dt : detalles) {
            dt.setCompra(compra);
            detalleCompraService.save(dt);
        }

        //limpiar lista y orden
        compra = new Compra();
        detalles.clear();

        return "redirect:/";
    }

    @PostMapping("/search")
    public String searchProduct(@RequestParam String nombre, Model model) {
        List<Producto> productos = IProductoService.findAll().stream().filter(p -> p.getNombre().contains(nombre)).collect(Collectors.toList());
        model.addAttribute("productos", productos);

        return "usuario/home";
    }
}
