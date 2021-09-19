import {createTheme, ThemeProvider} from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const CustomSelect = ({orderBy, setOrderBy, currentMonthDay, daysInMonth}) => {
    const theme = createTheme({
        typography: {
            fontFamily: 'Montserrat, sans-serif',
            fontWeightRegular: 400,
        },
        palette: {
            primary: {
                light: '#407bff',
                main: '#407bff',
                dark: '#407bff',
                contrastText: '#fff',
            },
        },
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        fontWeight: '600',
                        fontSize: '0.97rem'
                    }
                }
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        fontWeight: '500',
                        fontSize: '0.97rem'
                    }
                }
            }
        }
    })

    const handleChange = (event) => {
        setOrderBy(event.target.value)
    }

    return (
        <ThemeProvider theme={theme}>
            <FormControl className=''>
                <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={orderBy}
                    onChange={handleChange}
                >
                    {/* logic how to group by */}
                    <MenuItem value={currentMonthDay}>Today</MenuItem>
                    <MenuItem value={currentMonthDay + 7}>Weekly</MenuItem>
                    <MenuItem value={daysInMonth}>End of the Month</MenuItem>
                    <MenuItem value={currentMonthDay + daysInMonth}>Next 30 days</MenuItem>
                </Select>
            </FormControl>
        </ThemeProvider>
    )
}

export default CustomSelect
