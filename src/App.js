
import './App.css';
import Card from './Components/WerehouseList';
import werehouseData from "./Components/werehouseJSONData"
import WerehouseDetailsPage from "./Components/WerehouseDetailsPage"
import { useDispatch } from 'react-redux';
import { ADD } from './Redux/Action';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';

function App() {

  const dispatch = useDispatch()
  if (!localStorage.getItem("WAREHOUSE")) {
    dispatch(ADD(werehouseData))
  }

  return (
    <>
    
      <BrowserRouter>  
      < Navbar />    
        <Routes>
          <Route>
            <Route index path='/' element={<Card />} />
            <Route path='/werehouseDetails/:id' element={<WerehouseDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
