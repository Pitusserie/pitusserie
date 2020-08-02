module.exports = function(sequelize, dataTypes) {
    let alias = "Producto";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        titulo: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        categorias: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        precio: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        img: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        porciones: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        }
    }

    let config = {
        tableName: "productos",
        timestamps: false
    }

    let Producto = sequelize.define(alias, cols, config);

    return Producto;
}