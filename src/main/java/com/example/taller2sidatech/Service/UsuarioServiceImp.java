package com.example.taller2sidatech.Service;

import com.example.taller2sidatech.Model.DAO.IUsuarioDao;
import com.example.taller2sidatech.Model.Entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioServiceImp implements IUsuarioService {

    @Autowired
    private IUsuarioDao IUsuarioDao;

    @Override
    public Optional<Usuario> findById(Integer id) {
        return IUsuarioDao.findById(id);
    }

}
