import {createContext, useContext, useState, useEffect} from 'react'
import {useStateValue} from '../context/StateProvider'

export const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    let gapi = window.gapi
    let CLIENT_ID = process.env.REACT_APP_CLIENT_ID
    let API_KEY = process.env.REACT_APP_API_KEY
    let DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
    let SCOPES = 'https://www.googleapis.com/auth/calendar'

    const [upcomingEvents, setUpcomingEvents] = useState([])
    const [isUpcomingEventsLoading, setIsUpcomingEventsLoading] = useState(true)

    const [{user}, dispatch] = useStateValue()


    // saving global state user object to local storage
    useEffect(() => {
        localStorage.setItem('User', JSON.stringify(user))
    }) 

    // client initialization
    useEffect(() => {
        gapi.load('client:auth2', initClient)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const initClient = () => {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(() => {
            gapi.client.load('calendar', 'v3')
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
        }).catch(error => {
            console.log(error)
        })
    }

    const updateSigninStatus = isSignedIn => {
        if (isSignedIn) {
            // setIsSignedIn(true)
            listUpcomingEvents()
        } else {
            return null
        }
    }


    const handleAuth = () => {
        // creating a promise within a promise callback
        return new Promise((resolve, reject) => {
            gapi.auth2.getAuthInstance().signIn()
                .then((res) => {
                    // console.log(res)
                    resolve(
                        dispatch({
                            type: 'SUBSCRIBE_USER',
                            payload: {
                                fullName: res.Vs.Pe,
                                name: res.Vs.zU,
                                lastName: res.Vs.zS,
                                email: res.Vs.Gt,
                            }
                        })
                    )
                })
                .catch(() => {
                    reject('Error while signing in.')
                })
        })
    }


    const handleLogout = () => {
        // creating a promise within a promise callback
        return new Promise((resolve, reject) => {
            gapi.auth2.getAuthInstance().signOut()
                .then(() => {
                    // console.log('logged out')
                    resolve(
                        dispatch({
                            type: 'UNSUBSCRIBE_USER',
                        })
                    )
                })
                .catch(() => {
                    reject('Error while signing out.')
                })
        })
    }

    const listUpcomingEvents = () => {
        gapi?.client?.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(response => {
            const events = response.result.items
            // console.log('EVENTS: ', events)
            setIsUpcomingEventsLoading(false)
            setUpcomingEvents(events)
        })
    }


    const createAnEvent = (summary, start, end) => {
        var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': {
                'summary': summary,
                'start': {
                    'dateTime': start,
                },
                'end': {
                    'dateTime': end,
                }
            }
        })

        request.execute()
    }

    const deleteAnEvent = (eventId) => {
        var request = gapi.client.calendar.events.delete({
            'calendarId': 'primary',
            'eventId': eventId
        })

        request.execute()
    }


    const value = {
        handleAuth,
        handleLogout,

        createAnEvent,
        deleteAnEvent,

        upcomingEvents,
        isUpcomingEventsLoading,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}