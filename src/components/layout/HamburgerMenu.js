import {useStateValue} from '../../context/StateProvider'
import {useAuth} from '../../googleAuth/AuthContext'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'


const HamburgerMenu = () => {
    const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false)
    
    const [{user}] = useStateValue()
    const {handleLogout} = useAuth()

    return (
        <div className='hamburgerMenu'>
            <div className='container'>
                <div className='hamburger'>
                    {hamburgerIsOpen ?
                        <CloseIcon className='closeIcon' onClick={() => setHamburgerIsOpen(prev => !prev)} />
                        :
                        <MenuIcon className='menuIcon' onClick={() => setHamburgerIsOpen(prev => !prev)} />
                    }
                </div>
            </div>

            <div className={hamburgerIsOpen ? 'sliderMenu open' : 'sliderMenu close'}>
                <div className='menu'>
                    <ul>
                        <div className='heading'>
                            <li>
                                <Link to='/'>
                                    My Calendar Events
                                </Link>
                            </li>
                        </div>

                        <div>
                            <li>
                                Hello, {user.name}
                            </li>

                            <li onClick={handleLogout}>
                                Logout
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HamburgerMenu
