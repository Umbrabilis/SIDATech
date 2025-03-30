package com.example.taller2sidatech.Service;

import com.example.taller2sidatech.Model.Entity.Compra;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ICompraService {
    List<Compra> findAll();
    Compra save(Compra compra);
    String generarNumeroOrden();
}
