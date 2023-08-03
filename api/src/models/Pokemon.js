const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
         type: DataTypes.UUID,
         primaryKey: true,
         /* autoIncrement:true, */
         defaultValue: DataTypes.UUIDV4,
         allowNull: false,
    },
    image: {
       type: DataTypes.STRING,
       allowNull:false,
    },
    life:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    attack:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    defense:{
      type: DataTypes.STRING,
      allowNull:false,
    },

  });
};
//ID. *
//Nombre. *
//Imagen. *
//Vida. *
//Ataque. *
//Defensa. *