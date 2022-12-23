

import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '../contexts/AuthContext';
import Login from '../components/login'
import SignUp from '../components/sign-up'
import { Footer } from '../components/footer'
import { Header } from '../components/header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <AuthProvider>
      <div className="App">     
        <Router>
         <Header />
          <Routes>
            <Route path='/' element={  <Login />} />     
            <Route path='/sign-up' element={  <SignUp />} />     
          </Routes>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
