import {useAuth} from '../../googleAuth/AuthContext'
import {useHistory} from 'react-router-dom'
import google from '../../img/google.svg'
import calendar from '../../img/calendar.svg'

const Login = () => {
    const {handleAuth} = useAuth()

    const history = useHistory()

    return (
        <div className='login'>
            <div className='column'>
                <h1>My Calendar Events</h1>

                <img className='calendarImage' src={calendar} alt='calendar' />

                <button className='button buttonPrimary' onClick={() => handleAuth().then(() => history.push('/calendar'))}>
                    <img src={google} alt='google' />
                    <span className='buttonSpan'>Sign in with Google</span>
                </button>

            </div>
        </div>
    )
}

export default Login
