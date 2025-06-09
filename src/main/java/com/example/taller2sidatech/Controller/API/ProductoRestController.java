package com.example.taller2sidatech.Controller.API;

import com.example.taller2sidatech.Model.Entity.Producto;
import com.example.taller2sidatech.Service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductoRestController {

    @Autowired
    private IProductoService productoService;

    // GET /api/productos - Listar todos los productos
    @GetMapping
    public List<Producto> listarProductos() {
        return productoService.findAll();
    }

    // GET /api/productos/1 - Obtener un producto específico
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProducto(@PathVariable Integer id) {
        Optional<Producto> producto = productoService.get(id);
        if (producto.isPresent()) {
            return ResponseEntity.ok(producto.get());
        }
        return ResponseEntity.notFound().build();
    }

    // POST /api/productos - Crear nuevo producto
    @PostMapping
    public Producto crearProducto(@RequestBody Producto producto) {
        // Validación básica de stock
        if (producto.getStock() < 0) {
            producto.setStock(0);
        }
        return productoService.save(producto);
    }

    // PUT /api/productos/1 - Actualizar producto
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Integer id, @RequestBody Producto producto) {
        Optional<Producto> productoExistente = productoService.get(id);
        if (productoExistente.isPresent()) {
            producto.setId(id);
            // Validación de stock
            if (producto.getStock() < 0) {
                producto.setStock(0);
            }
            // Mantener usuario existente si no se envía
            if (producto.getUsuario() == null) {
                producto.setUsuario(productoExistente.get().getUsuario());
            }
            // Mantener imagen existente si no se envía
            if (producto.getImagen() == null || producto.getImagen().isEmpty()) {
                producto.setImagen(productoExistente.get().getImagen());
            }

            // Actualizar el producto
            productoService.update(producto);

            // Obtener el producto actualizado y devolverlo
            return ResponseEntity.ok(productoService.get(id).get());
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE /api/productos/1 - Eliminar producto (CORREGIDO)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Integer id) {
        Optional<Producto> producto = productoService.get(id);
        if (producto.isPresent()) {
            productoService.delete(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}