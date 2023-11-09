import { db } from '../firebase'
import {
    set,
    ref,
    update,
    remove,
    onValue,
    // off,
    DataSnapshot
} from 'firebase/database'

function DatabaseCalls() {

    
    // Lyssna på förändringar i realtid från en specifik sökväg
    const onDataChange = (snapshot: DataSnapshot | null) => {
        if (snapshot) {
            const data = snapshot.val()
            console.log(data)
        }
    }

    const userRef = ref(db, 'användare')
    onValue(userRef, onDataChange)

    // Skriv data till en specifik sökväg
    set(ref(db, 'användare/123'), {
        namn: 'John Doe',
        ålder: 30
    })
        .then(() => {
            console.log('Data har sparats till databasen.')
        })
        .catch((error) => {
            console.error(error)
        })

    // Uppdatera specifika egenskaper i en befintlig post
    update(ref(db, 'användare/123'), {
        ålder: 31
    })
        .then(() => {
            console.log('Åldern har uppdaterats.')
        })
        .catch((error) => {
            console.error(error)
        })

    // Ta bort en specifik post från databasen
    remove(ref(db, 'användare/123'))
        .then(() => {
            console.log('Posten har tagits bort från databasen.')
        })
        .catch((error) => {
            console.error(error)
        })

    // Avsluta lyssnaren när komponenten blir obelagd
    // return () => {
    //     off(userRef, onDataChange)
    // }

    return <div>DatabaseCalls</div>
}

export default DatabaseCalls
