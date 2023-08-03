import React,{useEffect,useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {createPokemon, getAllTypes } from "../../redux/actions";
import validateForm from "./validateForm";

import formImage from "../../assets/OIP.jpg";
import { Link } from "react-router-dom";

const Create =()=>{
    
        const allTypes = useSelector((state) => state.types)
        const dispatch = useDispatch();
        const [input, setInput] = useState({
            name: '',
            image: '',
            life: 0,
            attack: 0,
            defense: 0,
            type1: '',
            type2: ''
    
        });
        const [errors, setErrors] = useState({ name: '' })
    
        useEffect(() => {
            dispatch(getAllTypes())
        }, [dispatch]);
    
    
        const handleInputChange = (event) => {
            setInput({
                ...input,
                [event.target.name]: event.target.value
            });
            setErrors(
                validateForm({
                    ...input,
                    [event.target.name]: event.target.value
                })
            )
        }
    
        const pokeCreated = (event) => {
    
            event.preventDefault()
            if (!input.name) {
                alert("error")
            } else {
                dispatch(createPokemon(input));
                setInput({
                    name: '',
                    image: '',
                    life: 0,
                    attack: 0,
                    defense: 0,
                    type1: '',
                    type2: ''
                });
                alert("Pokemon Created")
            }
        }
    
        return (
            <div >
                <Link to="/home">
                <button type="button"  >back to home</button>
                </Link>
                <form onSubmit={pokeCreated}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="text" name='name' value={input.name} onChange={handleInputChange} placeholder="Enter name" />
                        {errors.name && <p>{errors.name}</p>}
                    </div>
    
                    <div>
                        <label htmlFor="image">Image: </label>
                        <input name="image" type="text" value={input.image} onChange={handleInputChange} placeholder="Enter Url" />
                        {errors.image && <p>{errors.image}</p>}
                    </div>
    
                    <div>
                        <label htmlFor="life">life: </label>
                        <input name="life" type="number" value={input.life} onChange={handleInputChange} placeholder="Enter value" />
                        {errors.life && <p>{errors.life}</p>}
                    </div>
    
                    <div>
                        <label htmlFor="attack">Attack: </label>
                        <input name="attack" type="number" value={input.attack} onChange={handleInputChange} placeholder="Enter value" />
                        {errors.attack && <p>{errors.attack}</p>}
                    </div>
    
                    <div>
                        <label htmlFor="defense">Defense: </label>
                        <input name="defense" type="number" value={input.defense} onChange={handleInputChange} placeholder="Enter value" />
                        {errors.defense && <p>{errors.defense}</p>}
                    </div>    
                    <div >
                        <div>
                            <label>Type: </label>
                            <select name="type1"
                                onChange={handleInputChange}
                                value={input.type1}>
                                {allTypes?.map((type) => {
                                    return (
                                        <option value={type.name} key={type.id}>{type.name}</option>
                                    )
                                })}
                            </select>
                            {errors.type1 && <p>{errors.type1}</p>}
                        </div>
    
                        <div>
                            <select name="type2"
                                onChange={handleInputChange}
                                value={input.type2}>
                                {allTypes?.map((type) => {
                                    return (
                                        <option value={type.name} key={type.id}>{type.name}</option>
                                    )
                                })}
                            </select>
                            {errors.type2 && <p>{errors.type2}</p>}
                        </div>
                    </div>
    
                    <button type='submit'>Create!</button>
    
                </form>
            </div>
        )
    
    }
    
    export default Create;