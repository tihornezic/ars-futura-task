import {createTheme, ThemeProvider} from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'

const CustomCircularProgress = () => {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#3f51b5',
                main: '#3f51b5',
                dark: '#3f51b5',
                contrastText: '#fff',
            },
        },
    })

    return (
        <div style={{position: 'absolute', left: '50%', top: '120%', transform: 'translate(-50%, -50%)'}}>
            <ThemeProvider theme={theme}>
                <CircularProgress thickness={5.5} size={30} />
            </ThemeProvider>
        </div>
    )
}

export default CustomCircularProgress
