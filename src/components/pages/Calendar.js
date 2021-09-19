import {useStateValue} from '../../context/StateProvider'
import {useAuth} from '../../googleAuth/AuthContext'
import {useState, useEffect} from 'react'
import RefreshIcon from '@mui/icons-material/Refresh'
import CalendarDayCard from '../utils/CalendarDayCard'
import CreateEventModal from '../utils/CreateEventModal'
import BackgroundOverlay from '../utils/BackgroundOverlay'
import CustomSelect from '../utils/CustomSelect'
import CustomCircularProgress from '../utils/CustomCircularProgress'

const Calendar = () => {
    // const currentTime = new Date().toLocaleTimeString('en-GB')
    const currentDayNameNumber = new Date().getDay()
    const currentMonthDay = new Date().getDate()
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const [orderBy, setOrderBy] = useState(currentMonthDay + 7)

    /* eslint-disable no-unused-vars */
    const [currentDayName, setCurrentDayName] = useState('')
    /* eslint-disable no-unused-vars */
    const [currentMonthName, setCurrentMonthName] = useState('')
    const [daysInMonth, setDaysInMonth] = useState(28)

    const {upcomingEvents, isUpcomingEventsLoading} = useAuth()
    const [{user, showModal}, dispatch] = useStateValue()


    // 
    useEffect(() => {
        getCurrentDayNameString()
        getCurrentMonthNameString()
        getDaysInMonth(currentMonth, currentYear)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // gets current day's name
    const getCurrentDayNameString = () => {
        setCurrentDayName(days[currentDayNameNumber])
    }

    // get current month's name
    const getCurrentMonthNameString = () => {
        setCurrentMonthName(months[new Date().getMonth()])
    }

    // gets current month's days
    // using 1 for January, 2 for February, etc.
    const getDaysInMonth = (month, year) => {
        setDaysInMonth(new Date(year, month, 0).getDate())
    }


    // timeSpan defines how many days to display based on the select component;
    // by default, display timeSpan of 7 days (a week)
    const timeSpan = (currentMonthDay, orderBy) => {
        let numberOfDays = []

        // for each numberOfDays, render the CalendarDayCard component
        // in the given range that is defined by orderBy variable
        for (let i = currentMonthDay; i <= orderBy; i++) {
            numberOfDays.push(
                <CalendarDayCard
                    key={i}
                    day={i}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    upcomingEvents={upcomingEvents}
                />
            )
        }

        return numberOfDays
    }

    const handleResetWindow = () => {
        window.location.reload()
    }


    return (
        <>
            <CreateEventModal />
            <BackgroundOverlay showModal={showModal} />


            <div className='container'>
                <div className='calendar'>
                    <div className='headingRow'>
                        <h1>
                            {user.fullName}'s upcoming events
                        </h1>

                        <div className='orderBy'>
                            <p>Group by</p>

                            <CustomSelect
                                orderBy={orderBy}
                                setOrderBy={setOrderBy}
                                currentMonthDay={currentMonthDay}
                                daysInMonth={daysInMonth}
                            />

                        </div>
                    </div>

                    <div className='subHeadingRow'>
                        <div className='buttonsRow'>
                            <button className='button buttonSecondary'
                                onClick={() => {
                                    dispatch({
                                        type: 'ANNUL_CLICKED_DATE',
                                    })

                                    dispatch({
                                        type: 'TOGGLE_MODAL',
                                        payload: showModal
                                    })
                                }}
                            >
                                Create an Event
                            </button>
                            <RefreshIcon className='refreshIcon' onClick={handleResetWindow} />
                        </div>

                        <div className='dateTime'>
                            <p>{currentMonthName} {currentYear}</p>
                        </div>
                    </div>

                    {/* main grid of days */}
                    <div className='grid'>
                        {isUpcomingEventsLoading ?
                            <CustomCircularProgress />
                            :
                            timeSpan(currentMonthDay, orderBy)
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default Calendar
