

import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/login'
import SignUp from './components/sign-up'
import Home from './components/home'
import Error from './components/404'
import { Footer } from './components/footer'
import { Header } from './components/header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './private-routes/privateRoute';
function App() {
  return (
    <AuthProvider>
      <div className="App">     
        <Router>
         <Header />
          <Routes>
            <Route path='/' element={  <Login />} />     
            <Route path='/sign-up' element={  <SignUp />} />   
            <Route path='/user-home' element={<PrivateRoute>
                <Home/>
            </PrivateRoute>} />
            <Route path='*' element={<Error/>} />  
          </Routes>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
