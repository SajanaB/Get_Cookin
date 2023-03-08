import React, { useState, useEffect } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import './SearchBar.css';
import Ingredient from '../Ingredient/Ingredient';
import PredictiveIngredient from '../PredictiveIngredient/PredictiveIngredient';
import axios from 'axios';
import autoComplete from "@tarekraafat/autocomplete.js";



const SearchBar = ({ingredients, setIngredients}) => {

    const [searchValue, setSearchValue] = useState('');
    const [autocomplete, setAutocomplete] = useState([]);
    const [autoData, setAutoData] = useState([]);
    const [timer, setTimer] = useState(null);
    const [autocompleteSource, setAutocompleteSource] = useState(null);



    const addIngredient = (e) => {
      e.preventDefault();
      setIngredients([...ingredients, e.target[0].value]);
      setSearchValue('');
    }

    const removeIngredient = (e) => {
        setIngredients(ingredients.filter(ingredient => {
            return ingredient !== e.target.textContent;
        }));
    }

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    }

    const predictiveClick = (e) => {
      setIngredients([...ingredients, e.target.textContent])
      setSearchValue('');
      setAutocomplete([]);
    }

    const getWords = async () => {

    }
    useEffect(() => {
      clearTimeout(timer);
      setTimer(setTimeout(() => {
        setAutocompleteSource(async () => {
          try {
            const source = await axios.get(`http://localhost:3000/ingredientdata`, {
              params: {
                search: searchValue
              }
            });
            const data = source.data;
            return data;
          } catch (error) {
            return error;
          }
        })
      }, 1000))

    }, [searchValue])

    useEffect(() => {
      let autoCompleteJS = new autoComplete({
        placeHolder: "Search for an ingredient . . .",
        data: {
            src: []
        },
        wrapper: false,
        resultsList: false,
        resultItem: {
          highlight: true,
        },
        submit: true,
        // debounce: 1000,
        threshold: 1,
      })
      setAutocompleteSource(autoCompleteJS.data.src);

      document.querySelector("#autoComplete").addEventListener("results", function (event) {
        // "event.detail" carries the matching results values
        setAutocomplete(event.detail.results);
    });
    }, [])



    return (
    <>
        <h1>Searching for Recipes!</h1>
        <div className="search-bar-container">
            <div className="search-bar">
                <HiOutlineSearch />
                {ingredients.map((ingredient, index) => (
                    <Ingredient key={index}
                                ingredient={ingredient}
                                removeIngredient={removeIngredient}/>
                ))}
                <form onSubmit={addIngredient}>
                    <input id="autoComplete"
                           value={searchValue}
                           onChange={handleSearch}
                           autoFocus="autofocus"
                           autoComplete="off"></input>
                </form>
            </div>
            <div className="predictive-text">
                {autocomplete.map((item, index) => (
                  <PredictiveIngredient ingredient={item.value}
                                        handleClick={predictiveClick}
                                        key={index}/>
                ))}
            </div>
        </div>
    </>

    )
}

export default SearchBar;