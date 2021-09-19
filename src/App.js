import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {AuthProvider} from './googleAuth/AuthContext'
import Navbar from './components/layout/Navbar'
import Login from './components/pages/Login'
import Calendar from './components/pages/Calendar'
import PrivateComponent from './components/utils/PrivateComponent'
import HamburgerMenu from './components/layout/HamburgerMenu'

function App() {
  return (
    <AuthProvider>
      <Router>
        
        <Switch>
          <Route exact path='/'>
            <PrivateComponent component={Login} forbidRoute='/' />
          </Route>

          <Route path='/calendar'>
            <Navbar />
            <HamburgerMenu />
            <PrivateComponent component={Calendar} forbidRoute='calendar' />
          </Route>
        </Switch>

      </Router>
    </AuthProvider>
  )
}

export default App;
