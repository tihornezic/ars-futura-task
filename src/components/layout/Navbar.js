import {useStateValue} from '../../context/StateProvider'
import {useAuth} from '../../googleAuth/AuthContext'
import {Link} from 'react-router-dom'

const Navbar = () => {
    const [{user}] = useStateValue()
    const {handleLogout} = useAuth()

    return (
        <nav>
            <ul>
                <div>
                    <li>
                        <Link to='/' className='heading'>
                            My Calendar Events
                        </Link>
                    </li>

                    <li className='helloUser'>
                        Hello, {user.name}
                    </li>
                </div>

                <div className='navbarRow'>
                    <li className='fakeLink' onClick={handleLogout}>
                        Logout
                    </li>
                </div>
            </ul>
        </nav>
    )
}

export default Navbar
