import React from 'react';
import './App.css';
import Display from './components/Display';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import CreatePet from './components/CreatePet';
import OnePet from './components/OnePet';
import EditPet from './components/EditPet';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Display/>} />
          <Route path='/createPet/form' element={<CreatePet/> } />
          <Route path='/onePet/:id' element={<OnePet/>} />
          <Route path='/editPet/:id' element={<EditPet />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
