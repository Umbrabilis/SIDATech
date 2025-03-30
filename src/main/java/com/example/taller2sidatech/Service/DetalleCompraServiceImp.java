package com.example.taller2sidatech.Service;

import com.example.taller2sidatech.Model.DAO.IDetalleCompraDao;
import com.example.taller2sidatech.Model.Entity.DetalleCompra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DetalleCompraServiceImp implements IDetalleCompraService {

    @Autowired
    private IDetalleCompraDao detalleCompraDao;

    @Override
    public DetalleCompra save(DetalleCompra detalleCompra) {
        return detalleCompraDao.save(detalleCompra);
    }


}
