package com.example.taller2sidatech.Service;

import com.example.taller2sidatech.Model.DAO.IUsuarioDao;
import com.example.taller2sidatech.Model.Entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImp implements IUsuarioService {

    @Autowired
    private IUsuarioDao IUsuarioDao;

    @Override
    public List<Usuario> findAll() {
        return IUsuarioDao.findAll();
    }

    @Override
    public Optional<Usuario> findById(Integer id) {
        return IUsuarioDao.findById(id);
    }

    @Override
    public Usuario save(Usuario usuario) {
        return IUsuarioDao.save(usuario);
    }

    @Override
    public Optional<Usuario> findByEmail(String email) {
        return IUsuarioDao.findByEmail(email);
    }

    @Override
    public void update(Usuario usuario) {IUsuarioDao.save(usuario);}

    @Override
    public void delete(Integer id) { IUsuarioDao.deleteById(id);}

}
