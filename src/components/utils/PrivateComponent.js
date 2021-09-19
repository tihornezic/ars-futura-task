import {Route, Redirect} from 'react-router-dom'
import {useStateValue} from '../../context/StateProvider'

const PrivateComponent = ({component: Component, forbidRoute, ...rest}) => {
    const [{user}] = useStateValue()

    return (

        <>
            {
                // prevent the '/calendar' route if there is no user logged in
                forbidRoute === 'calendar' ?
                    <Route
                        {...rest}
                        render={props => {
                            // check if there is a user, in that case, render the Calendar component; else redirect to '/' route
                            return Object.keys(user).length ? <Component {...props} /> : <Redirect to='/' />
                        }}
                    >

                    </Route>

                    // prevent the '/' route if there is user logged in
                    : forbidRoute === '/' ?
                        <Route
                            {...rest}
                            render={props => {
                                // check if user object is not empty, in that case, redirect to '/calendar' route; else render the Login component
                                return Object.keys(user).length ? <Redirect to='/calendar' /> : <Component {...props} />

                            }}
                        >
                        </Route>
                        :
                        null
            }
        </>

    )
}

export default PrivateComponent
