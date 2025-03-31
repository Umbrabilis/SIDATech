package com.example.taller2sidatech.Service;

import com.example.taller2sidatech.Model.Entity.Compra;
import com.example.taller2sidatech.Model.Entity.Usuario;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface ICompraService {
    List<Compra> findAll();
    Compra save(Compra compra);
    String generarNumeroOrden();
    List<Compra> findByUsuario(Usuario usuario);
    Optional<Compra> findById(Integer id);
}
