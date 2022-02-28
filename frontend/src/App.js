import { CookiesProvider } from 'react-cookie';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from './hocs/Layout';
import Home from './components/Home'
import MyAccount from './components/MyAccount';
import Signup from './components/Signup';
import SignupAdmin from './components/SignupAdmin';
import Activate from './components/Activate';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import ResetPassword from './components/ResetPassword';
import ResetPasswordConfirm from './components/ResetPasswordConfirm';
import List from './components/List';
function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <Router>
          <Layout>
            <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route 
                exact 
                path='/list' 
                element={
                  <PrivateRoute>
                    <List />
                  </PrivateRoute>
                }
              />              
              <Route 
                exact 
                path='/myaccount' 
                element={
                  <PrivateRoute>
                    <MyAccount />
                  </PrivateRoute>
                }
              />              
              <Route exact path='/signup-employee' element={<Signup/>}/>
              <Route exact path='/signup-admin' element={<SignupAdmin/>}/>
              <Route exact path='/activate/:uid/:token' element={<Activate/>}/>
              <Route exact path='/login' element={<Login/>}/>
              <Route exact path='/password-reset' element={<ResetPassword/>} />
              <Route exact path='/password-reset-confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
            </Routes>
          </Layout>
        </Router>
      </CookiesProvider>
      
    </div>
  );
}

export default App;
