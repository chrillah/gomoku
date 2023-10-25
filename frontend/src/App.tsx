import axios from 'axios'
import { useEffect } from 'react'
function App() {
    useEffect(() => {
        //axios.get('https://avancera.app/cities/')
        axios.get('http://localhost:3000/api/gomoku/play')
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    // Servern svarade med en statuskod som inte är 2xx
                    console.error('Svar från server med felstatuskod:', error.response.status);
                  } else if (error.request) {
                    // Förfrågan gjordes men inget svar mottogs
                    console.error('Inget svar från servern');
                  } else {
                    // Ett fel uppstod vid förberedelsen eller under förfrågan
                    console.error('Ett oväntat fel uppstod:', error.message);
                  }
            })
    }, [])

    return (
        <>
            <h1 className="text-3xl font-bold underline">Gomuko App</h1>
        </>
    )
}

export default App
