const { Router } = require("express")
const axios = require("axios")
const { getApiPokemons, getPokeId, getPokeQuery, getPokeDb } = require("../controllers")
const router = Router()
const { Pokemon, Types } = require("../db")

router.get("/", async (req, res) => {
    const { name } = req.query;
    if (name) {
        //console.log(name)
        const pokeQuery = await getPokeQuery(name)
        res.status(200).json(pokeQuery)
    } else {
        const allApiPoke = await getApiPokemons()
        // const allDbPoke = await getPokeDb()
        res.status(200).json(allApiPoke)
    }
});

router.get("/:idPokemon", async (req, res) => {
    const { idPokemon } = req.params;
    const pokeId = await getPokeId(idPokemon)
    res.status(200).json(pokeId)
});


//////////////////////////////////////////////

router.post("/", async (req, res) => {
    const { name, life, attack, defense, type1, type2, image } = req.body;
    const newPoke = await Pokemon.create({ name, life, attack, defense, image })



    let typeDb1 = await Types.findOne({ where: { name: type1 } })

    await newPoke.addTypes(typeDb1)


    let typeDb2 = await Types.findOne({ where: { name: type2 } })

    await newPoke.addTypes(typeDb2)



    /* for (let i = 0; i < type.length; i++) {
    } */
    res.status(200).json({ message: "Pokemon creado con exito" })

})

module.exports = router