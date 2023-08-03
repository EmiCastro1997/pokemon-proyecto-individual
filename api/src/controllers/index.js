const axios = require("axios");
const { Types, Pokemon } = require("../db")
const { Op, Sequelize } = require('sequelize')
const URL_API = "https://pokeapi.co/api/v2/pokemon";//?limit= y el valor con el que quieras limitar la pag

const getApiPokemons = async function () {
  try {
    let apiReq = (await axios.get(`https://pokeapi.co/api/v2/pokemon`)).data;
    const apiPokes = []
    apiReq.results.map(async (pokemon) => {
      let { data } = await axios.get(pokemon.url);
      apiPokes.push({
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        life: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weigth: data.weight,
        types: data.types.map((type) => {
          return { name: type.type.name };
        }),
        created: false,

      });

    })

    console.log(apiPokes)
    const DbPokemons = await Pokemon.findAll({ include: [{ model: Types, throught: { attributes: [] } }] })

    let AllDbPoke = []
    if (DbPokemons.length) {
      DbPokemons.map(poke => {
        AllDbPoke.push({ id: poke.dataValues.id, name: poke.dataValues.name, image: poke.dataValues.image, types: poke.dataValues.Types })
      })
    }
    return apiPokes.concat(AllDbPoke)

  } catch (error) {
    console.log("fallo getAllPoke", error);
  }
};

// const getPokeDb = async function (){
//  try {
//    const getDb = await Pokemon.findAll({include:{model:Types,attributes:["name"]}});
//    console.log(getDb)
//    const formatedPoke=getDb.map(p=>{return{
//      name:p.name,
//      url:p.image
//    }
//    })
//    return formatedPoke
//    
//  } catch (error) {
//    console.log(error)
//  }
// }

const getPokeId = async function (id) {
  if (id === undefined || id === null) { console.log("no existe el id"); }
  else {
    try {
      if (id.includes('-')) {
        let pokeIdDb = await Pokemon.findByPk(id, { include: [{ model: Types, throught: { attributes: [] } }] })
        console.log(pokeIdDb.dataValues)

        return pokeIdDb
      } else {

        const { data } = await axios.get(`${URL_API}/${id}`);
        //console.log(Object.keys(data))
        const getId = {
          id: data.id,
          name: data.name,
          image: data.sprites.front_default,
          life: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          speed: data.stats[5].base_stat,
          height: data.height,
          weigth: data.weight,
          types: data.types.map((type) => {
            return { name: type.type.name };
          }),
          created: false,


        }
        return getId
      }
    } catch (error) {
      console.log("fallo getId" + error)
    }
  }
};
//?name=......
const getPokeQuery = async function (name) {
  try {
    let siPoke = await Pokemon.findAll({ where: { name: { [Op.iLike]: `%${name}%` } }, attributes: ['id', 'name', 'image'], include: [{ model: Types, attributes: ['name'], throught: { attributes: [] } }] });
    console.log(siPoke)
    if(siPoke.length) return siPoke
    const { data } = await axios.get(`${URL_API}/${name}`);
    // console.log(Object.keys(data))
    const getName = {
      name: data.name,
      id: data.id,
      types: data.types,
      image: data.sprites.other.dream_world.front_default,
    }
    return [getName]

  } catch (error) {
    console.log("Fallo get pokeQuery " + error)
  }
}

const getTypePoke = async function (res) {
  try {
    let type = await Types.findAll({attributes:["name","id"]});
    // Si la base de datos está vacía, obtén los tipos desde la API y guárdalos en la base de datos
   return type
  } catch (error) {
    console.error('Error al obtener los tipos de Pokémon:', error);
  }
}

module.exports = {
  getApiPokemons,
  getPokeQuery,
  getTypePoke,
  getPokeId
}