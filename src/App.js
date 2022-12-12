import './App.css';
import {Routes , Route } from 'react-router-dom';
import Home from './components/Home';
import Result from './components/Result';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home/>} ></Route>
      <Route exact path='/result' element={<Result/>} ></Route>
    </Routes>
  )
}

export default App;
