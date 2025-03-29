package com.example.taller2sidatech.Service;

import com.example.taller2sidatech.Model.DAO.UsuarioDao;
import com.example.taller2sidatech.Model.Entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioServiceImp implements IUsuarioService {

    @Autowired
    private UsuarioDao usuarioDao;

    @Override
    public Optional<Usuario> findById(Integer id) {
        return usuarioDao.findById(id);
    }

}
