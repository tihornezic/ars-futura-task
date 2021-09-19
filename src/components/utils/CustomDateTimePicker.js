import {useStateValue} from '../../context/StateProvider'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import {DateTimePicker} from '@mui/lab'
import TextField from '@mui/material/TextField'

const CustomDateTimePicker = ({
    type, startDateTime, setStartDateTime, convertedSelectedStartDate, setConvertedSelectedStartDate,
    endDateTime, setEndDateTime, convertedSelectedEndDate, setConvertedSelectedEndDate
}) => {

    const [{clickedDate}] = useStateValue()

    const theme = createTheme({
        typography: {
            fontFamily: 'Montserrat, sans-serif',
        },
        palette: {
            primary: {
                light: '#407bff',
                main: '#407bff',
                dark: '#407bff',
                contrastText: '#fff',
            },
            text: {
                primary: '#6d6d6d',
            },
            action: {
                hover: '#6d6d6d'
            }
        },
        components: {
            MuiFormControl: {
                styleOverrides: {
                    root: {
                        width: '100%',
                    },
                },
            },

            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        fontWeight: '600'
                    },
                },
            },

            MuiInputBase: {
                styleOverrides: {
                    root: {
                        fontWeight: '600'
                    }
                }
            }
        }
    })

    return (
        <ThemeProvider theme={theme}>
            {type === 'startTime' ?
                // start time dateTimePicker
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label='Start time'
                    value={clickedDate ? convertedSelectedStartDate : startDateTime}
                    inputFormat='DD/MM/YYYY hh:mm a'
                    onChange={(newValue) => {
                        setStartDateTime(newValue)
                        setConvertedSelectedStartDate(newValue)
                    }}
                />
                :
                // end time dateTimePicker
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label='End time'
                    value={clickedDate ? convertedSelectedEndDate : endDateTime}
                    inputFormat='DD/MM/YYYY hh:mm a'
                    onChange={(newValue) => {
                        setEndDateTime(newValue)
                        setConvertedSelectedEndDate(newValue)
                    }}
                />
            }
        </ThemeProvider>
    )
}

export default CustomDateTimePicker
