package com.example.taller2sidatech.Service;

import com.example.taller2sidatech.Model.DAO.ICompraDao;
import com.example.taller2sidatech.Model.DAO.IDetalleCompraDao;
import com.example.taller2sidatech.Model.Entity.Compra;
import com.example.taller2sidatech.Model.Entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CompraServiceImp implements ICompraService {

    @Autowired
    private ICompraDao compraDao;

    @Override
    public Compra save(Compra compra) {
        return compraDao.save(compra);
    }

    @Override
    public List<Compra> findAll() {
        return compraDao.findAll();
    }

    public String generarNumeroOrden(){
        int numero=0;
        String numeroConcatenado="";

        List<Compra> compras = findAll();
        List<Integer> numeros = new ArrayList<Integer>();
        compras.stream().forEach(o -> numeros.add(Integer.parseInt(o.getNumero())));

        if (compras.isEmpty()) {
            numero=1;
        } else {
            numero=numeros.stream().max(Integer::compare).get();
            numero++;
        }

        if (numero <10){
            numeroConcatenado = "000000000" + String.valueOf(numero);
        }else if (numero <100){
            numeroConcatenado = "00000000" + String.valueOf(numero);
        }else if (numero < 1000){
            numeroConcatenado = "0000000" + String.valueOf(numero);
        }else if (numero < 10000){
            numeroConcatenado = "000000" + String.valueOf(numero);
        }

        return numeroConcatenado;

    }

    @Override
    public List<Compra> findByUsuario(Usuario usuario) {
        return compraDao.findByUsuario(usuario);
    }

    @Override
    public Optional<Compra> findById(Integer id) {
        return compraDao.findById(id);
    }
}
