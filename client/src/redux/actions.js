import axios from 'axios';
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_DETAIL_ID = "GET_DETAIL_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const FILTER = "FILTER";
export const FILTER_POKEMON_TYPE = "FILTER_POKEMON_TYPE";
export const FILTER_POKEMON_ORIGIN = "FILTER_POKEMON_ORIGIN";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const PAGINATED = "PAGINATED";
export const ORDER_BY_AZ = "ORDER_BY_AZ";

export const getAllPokemons = () => {
  return async function (dispatch) {
    const response = (await axios.get("http://localhost:3001/pokemons")).data;
    return dispatch({
      type: GET_ALL_POKEMONS,
      payload: response
    });
  }
};

export const getDetailId = (id) => {
  return async function (dispatch) {
    const response = (await axios.get(`http://localhost:3001/pokemons/${id}`)).data;
    //console.log(response)
    return dispatch({
      type: GET_DETAIL_ID,
      payload: response,
    });
  }
};
export const getPokeByName = (name) => {
  return async function (dispatch) {
    try {
      const response = (await axios.get(`http://localhost:3001/pokemons/?name=${name}`)).data;
      // console.log(response)
      return dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: response,
      });



    } catch (error) {
      console.log(error.message);
    };
  }
};
export const getAllTypes = () => {
  return async function (dispatch) {
    const response = (await axios.get(`http://localhost:3001/type`)).data;
    return dispatch({
      type: GET_ALL_TYPES,
      payload: response
    });
  }
};
export const filterPokeByType = (payload) => {
  return {
    type: FILTER_POKEMON_TYPE,
    payload,
  }
};
export const createPokemon = (input) => {
  console.log("/////soy el input del action", input);
  return async (dispatch) =>{
      try {
         dispatch({type: CREATE_POKEMON, payload: true })
         await axios.post("http://localhost:3001/pokemons", input) 

      } catch (error) {
          console.log(error);
          dispatch({type: CREATE_POKEMON, payload: false })
      }
  };
}


export const filterPokeOrigin = (origin) => {
  return {
    type: FILTER_POKEMON_ORIGIN,
    origin,
  }
};
export const filter = (pokemons) => {
  return {
    type: FILTER,
    payload: pokemons
  }
}

export const orderByName = (sort, pokemons) => {
  return function (dispatch) {
    let pokemonsSort = [...pokemons];
    const pokemonsSorted = pokemonsSort.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase())
        return sort === 'AZ' ? -1 : 1
      if (a.name.toLowerCase() < b.name.toLowerCase())
        return sort === 'AZ' ? 1 : -1
      return 0;
    });
    return dispatch({
      type: ORDER_BY_AZ,
      payload: pokemonsSorted,
    });
  }
};
//export const orderByAttack = (sort, pokemons) =>{
//return function (dispatch)
//{
//let pokemonAttackSorted = [...pokemons];
//if(sort === "+"){
//pokemonAttackSorted = pokemonAttackSorted.sort((a,b)=> a-b)
//}else {
//pokemonAttackSorted = pokemonAttackSorted.sort((a,b)=> b-a)
//}
//}
//};
export const clearFilters = pokemons => {
  return {
    type: CLEAR_FILTERS,
    payload: pokemons,
  }
};
export const getPages = (payload) => {
  return {
    type: PAGINATED,
    payload
  }
};
