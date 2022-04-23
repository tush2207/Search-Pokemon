import React, { useEffect, useState } from 'react'
import Map from './Components/Main/Map'
import './App.css'
import Main from './Components/Main/Main'
const App = () => {

   const[Maps, setMaps] = useState([])
   const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=45')

  const getMaps = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)

    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()
        setMaps( currentList => [...currentList, data])
        await Maps.sort((a, b) => a.id - b.id)
      })
    }
    createPokemonObject(data.results)
  }

 useEffect(() => {
  getMaps()
 }, [])

  return (
    <div className="app-contaner">
      <h1>Pokemon Evolution</h1>
      <Main/>
      
      <div className="pokemon-container">
        <div className="all-container">
          {Maps.map( (pokemonStats, index) => 
            <Map
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />)}
          
        </div>
          <button className="load-more" onClick={() => getMaps()}>Load more</button>
      </div>
    </div>
  );
}

export default App;