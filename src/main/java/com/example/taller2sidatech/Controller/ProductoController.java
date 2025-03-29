package com.example.taller2sidatech.Controller;

import com.example.taller2sidatech.Model.Entity.Producto;
import com.example.taller2sidatech.Model.Entity.Usuario;
import com.example.taller2sidatech.Service.IProductoService;
import com.example.taller2sidatech.Service.UploadFileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Controller
@RequestMapping("/productos")
public class ProductoController {

    private final Logger LOGGER = LoggerFactory.getLogger(ProductoController.class);

    @Autowired
    private IProductoService IProductoService;

    @Autowired
    private UploadFileService upload;

    @GetMapping("")
    public String show(Model model ){
        model.addAttribute("productos", IProductoService.findAll());
        return "productos/show";
    }

    @GetMapping("/create")
    public String create(){
        return "productos/create";
    }

    @PostMapping("/save")
    public String save(Producto producto, @RequestParam("img") MultipartFile file) throws IOException {
        LOGGER.info("Este es el objeto producto: " + producto);
        Usuario usuario = new Usuario(1, "", "", "", "", "", "", "");
        producto.setUsuario(usuario);

        //imagen
        if (producto.getId()==null){
            String nombreImagen = upload.saveImage(file);
            producto.setImagen(nombreImagen);
        }

        IProductoService.save(producto);
        return "redirect:/productos";
    }

    @GetMapping("/edit/{id}")
    public String edit(@PathVariable Integer id, Model model){
        Producto producto = new Producto();
        Optional<Producto> optionalProducto = IProductoService.get(id);
        producto= optionalProducto.get();

        model.addAttribute("producto", producto);
        return "productos/edit";
    }

    @PostMapping("/update")
    public String update(Producto producto,  @RequestParam("img") MultipartFile file) throws IOException {
        Producto p = new Producto();
        p = IProductoService.get(producto.getId()).get();

        if (file.isEmpty()){ //editamos producto sin cambiar imagen

            producto.setImagen(p.getImagen());
        }
        else { //editamos producto cambiando imagen

            if (!p.getImagen().equals("default.jpg")){
                upload.deleteImage(p.getImagen());
            }

            String nombreImagen = upload.saveImage(file);
            producto.setImagen(nombreImagen);
        }

        producto.setUsuario(p.getUsuario());
        IProductoService.update(producto);

        return "redirect:/productos";
    }

    @GetMapping("/delete/{id}")
    public String delete(@PathVariable Integer id) throws IOException {

        Producto p = new Producto();
        p = IProductoService.get(id).get();

        if (!p.getImagen().equals("default.jpg")){
            upload.deleteImage(p.getImagen());
        }

        IProductoService.delete(id);
        return "redirect:/productos";
    }
}
