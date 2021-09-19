import {useStateValue} from '../../context/StateProvider'
import {useAuth} from '../../googleAuth/AuthContext'
import {useState, useEffect} from 'react'
import DateRangeIcon from '@mui/icons-material/DateRange'
import DeleteIcon from '@mui/icons-material/Delete'
// for the fragment
import React from 'react'

const CalendarDayCard = ({day, currentMonth, currentYear, upcomingEvents}) => {
    const [date, setDate] = useState('')
    const [dayName, setDayName] = useState('')

    const {deleteAnEvent} = useAuth()
    const [{showModal}, dispatch] = useStateValue()

    useEffect(() => {
        getDates()
        getDayName()
    }, [date]) // eslint-disable-line react-hooks/exhaustive-deps


    const getDates = () => {
        let date = new Date(currentYear, currentMonth - 1, day)
        let prettifiedDate = date.toLocaleDateString('en-GB')

        setDate(prettifiedDate)
    }

    const getDayName = () => {
        // because new Date accepts a string with a date in en-us format only, and date are in en-gb,
        // parseDMY func is used to solve this problem and return correct day names back
        // withouth parsing, new Date below returns Invalid Date because it expects date format in en-us
            // setDays(new Date(date).toLocaleString('en-us', {weekday: 'long'}))
        setDayName(parseDMY(date).toLocaleString('en-GB', {weekday: 'long'}))
    }

    const convertDate = (date) => {
        const isoDate = date
        const dateString = new Date(isoDate)

        return dateString.toLocaleDateString('en-GB')
    }

    const generateTime = (date) => {
        const isoDate = date
        const dateString = new Date(isoDate)
        const time = dateString.toLocaleTimeString('en-GB')

        return time.substring(0, time.length - 3)
    }

    const parseDMY = (value) => {
        let date = value.split('/')
        let d = parseInt(date[0], 10),
            m = parseInt(date[1], 10),
            y = parseInt(date[2], 10)
        return new Date(y, m - 1, d)
    }

    const handleDeleteEvent = (eventId) => {
        deleteAnEvent(eventId)
        window.location.reload()
    }

    return (
        <div className={upcomingEvents?.find(event => convertDate(event.start.dateTime) === date)
            ?
            'calendarDayCard hasEvent'
            :
            'calendarDayCard'
        }>

            <div className='wrapper' onClick={() => {
                dispatch({
                    type: 'TOGGLE_MODAL',
                    payload: showModal
                })

                dispatch({
                    type: 'GET_CLICKED_DATE',
                    payload: date
                })
            }}>
            </div>

            <div className='dateIndicator'>
                <p>{date}</p>
                <p>{dayName}</p>
            </div>

            <DateRangeIcon className='calendarImg' />

            {upcomingEvents?.map((event, index) => {
                if (convertDate(event.start.dateTime) === date) {
                    return (
                        <React.Fragment key={index}>
                            <div className='event'>
                                <div key={index} className='info'>
                                    <p className='summary'>{event.summary}</p>
                                    <div className='startEnd'>
                                        <p>{generateTime(event.start.dateTime)}</p>
                                        <p>{generateTime(event.end.dateTime)}</p>
                                    </div>
                                    <DeleteIcon className='delete' onClick={() => handleDeleteEvent(event.id)} />
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }
                else {
                    return null
                }
            })}
        </div>
    )
}

export default CalendarDayCard
