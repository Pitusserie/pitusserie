const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const db = require('../database/models/index.js');

module.exports = {
    products: function (req, res) {
        db.Producto.findAll()
        .then(function (productos) {
            res.render('products', {
                productos: productos,
                id: req.params.id,
                session: req.session.usuario
            });
        })
    },
    detail: function(req, res) {
        db.Producto.findByPk(req.params.id)
        .then(function(productos) {
            res.render('detailProducts',{
                producto: productos,
                id:req.params.id,
                session: req.session.usuario
            });
        })
    },
    carga: function(req, res) {
        res.render('cargaProducts', {
            session: req.session.usuario
        });
    },
    store: function(req, res) {
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            db.Producto.create({
                categorias: req.body.categorias,
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                img: req.files[0].filename,
                porciones: req.body.porciones
            })
            res.redirect('/products');
        } else {
            res.render('cargaProducts', {
                errors: errors.mapped(),
                old: req.body,
                session: req.session.usuario
            })
        }
    },
    edit: (req, res) => {
        db.Producto.findByPk(req.params.id)
        .then(function(producto) {
            res.render('editProducts', {
                producto: producto,
                session: req.session.usuario
            })
        })
    },
    update: function(req, res) {
		db.Producto.update({
			categorias: req.body.categorias,
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            porciones: req.body.porciones
        },
        {
            where: {
                id: req.params.id
            }
        }) 
        .then(function(resultado) {
            res.redirect('/products');
        })
    },
    destroy: function(req, res) {
		db.Producto.destroy({
              where: {
                id: req.params.id
              }
            })
            .then(function(resultado) {
              res.redirect('/products')
            })
    }
}