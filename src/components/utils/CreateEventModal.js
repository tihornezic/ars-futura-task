import {useStateValue} from '../../context/StateProvider'
import {useAuth} from '../../googleAuth/AuthContext'
import {useState, useEffect} from 'react'
import DateAdapter from '@mui/lab/AdapterMoment'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import CloseIcon from '@mui/icons-material/Close'
import CustomDateTimePicker from '../utils/CustomDateTimePicker'

const CreateEventModal = () => {
    const [name, setName] = useState('')
    const [startDateTime, setStartDateTime] = useState(new Date())
    const [endDateTime, setEndDateTime] = useState(new Date())

    const [convertedSelectedStartDate, setConvertedSelectedStartDate] = useState('')
    const [convertedSelectedEndDate, setConvertedSelectedEndDate] = useState('')

    const {createAnEvent} = useAuth()
    const [{showModal, clickedDate}, dispatch] = useStateValue()


    useEffect(() => {
        if (clickedDate) {
            convertclickedDateToIsoDate(clickedDate)
        }
    }, [clickedDate])

    const convertclickedDateToIsoDate = (clickedDate) => {
        let clickedDateString = clickedDate
        let darr = clickedDateString.split('/')
        let date = new Date(parseInt(darr[2]), parseInt(darr[1]) - 1, parseInt(darr[0]))


        setConvertedSelectedStartDate(date.toISOString())
        setConvertedSelectedEndDate(date.toISOString())
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // createAnEvent(name, startDateTime._d.toISOString(), endDateTime._d.toISOString())
        createAnEvent(name, startDateTime.toISOString(), endDateTime.toISOString())

        setName('')
        setStartDateTime(new Date())
        setEndDateTime(new Date())

        dispatch({
            type: 'TOGGLE_MODAL',
            payload: showModal
        })
    }


    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <div className={showModal ? 'createEventModal open' : 'createEventModal'}>
                <div className='modalContainer'>
                    <CloseIcon className='closeIcon' onClick={() => {
                        dispatch({
                            type: 'TOGGLE_MODAL',
                            payload: showModal
                        })
                    }} />

                    <h1>Create an Event</h1>

                    <form onSubmit={handleSubmit}>
                        <div className='inputGroup'>
                            <label htmlFor='name' className='nameLabel'>Name</label>
                            <input className='nameInput' type='text' required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className='inputGroup'>
                            <CustomDateTimePicker
                                type='startTime'
                                startDateTime={startDateTime}
                                setStartDateTime={setStartDateTime}
                                convertedSelectedStartDate={convertedSelectedStartDate}
                                setConvertedSelectedStartDate={setConvertedSelectedStartDate}
                            />
                        </div>

                        <div className='inputGroup'>
                            <CustomDateTimePicker
                                type='endTime'
                                endDateTime={endDateTime}
                                setEndDateTime={setEndDateTime}
                                convertedSelectedEndDate={convertedSelectedEndDate}
                                setConvertedSelectedEndDate={setConvertedSelectedEndDate}
                            />
                        </div>

                        <button type='submit' className='button buttonTertiary buttonMargin'>Submit</button>
                    </form>
                </div>
            </div>
        </LocalizationProvider>
    )
}

export default CreateEventModal
