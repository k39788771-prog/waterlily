import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';;
import Survey from './components/Survey';

import './App.css'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to="/signup" replace/>} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/survey' element={<Survey />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
