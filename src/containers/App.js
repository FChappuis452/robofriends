import React, { useState, useEffect} from 'react';

import './App.css'


import CardList from '../components/CardList';
import ErrorBoundry from '../components/ErrorBoundry';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';


function App () {

  // Hooks
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');
  const [count, setCount] = useState(0);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value)
  }

  useEffect(() =>{
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {setRobots(users)});
      console.log(count)
  },[count])
  
  const filteredRobots = robots.filter(robot =>{
    return robot.name.toLowerCase().includes(searchfield.toLowerCase()); 
  })
  return !robots.length ?
    <h1 className='tc'>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <button onClick={() => setCount(count+1)}>Click me</button>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>    
        </Scroll>
      </div> 
    );  
} 


export default App;