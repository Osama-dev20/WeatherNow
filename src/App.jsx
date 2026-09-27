import './App.css'

import { createTheme, ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


const theme = createTheme({
  typography:{
    fontFamily: ['IBM Plex Sans Arabic']
  }
})

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
           {/*card*/}
           <div>

             {/*===contnet card====*/}
             <div>

                 {/*===city and time====*/}
                 <div style={{display:"flex", justifyContent:"center", alignItems:"center"}} dir='rtl'>
                     <Typography variant="h3" gutterBottom>
                       غزة
                     </Typography>
                     
                     <Typography variant="h5" gutterBottom>
                       الاثنين 20/9/2026
                     </Typography>
                 </div>
                 {/*=====================*/}
               
               <hr/>

                 {/*Degree & description*/}
                 <div>

                 </div>
                 {/*=====================*/}    

             </div>

           </div>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default App
