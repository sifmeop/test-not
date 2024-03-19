import { addDoc, collection } from 'firebase/firestore'
import { getToken } from 'firebase/messaging'
import { useEffect, useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import { fireStore, messaging } from './firebaseConfig'
import viteLogo from '/vite.svg'

let retryCount = 0

function App() {
  const [count, setCount] = useState(0)
  const [token, setToken] = useState('')

  const requestPermission = async () => {
    try {
      await Notification.requestPermission().then(async (permission) => {
        if (permission === 'granted') {
          return await getToken(messaging!, {
            vapidKey: 'BMbiMHhWWpWzXIIfnPSvQkl5v_SDWJhTau4aucu7EIg7a_W7GKgQYCTIo7v9U6XYM8Tnmvl5jKuKNqQGIPUO8Uk'
          }).then(async (token) => {
            setToken(token)
            const oldToken = localStorage.getItem('fcm_token')

            if (oldToken === token) {
              return
            }

            await addDoc(collection(fireStore, 'tokens'), {
              token,
              target: 'ANDROID'
            })
              .then(() => {
                console.log('Token added', token)
                localStorage.setItem('fcm_token', token)
              })
              .catch((error) => {
                console.log('Error adding token: ', error)
                localStorage.removeItem('fcm_token')
              })
          })
        }
      })
    } catch (error) {
      console.log(`error: ${error}`)
      if (retryCount < 5) {
        retryCount += 1
        requestPermission()
      }
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      void requestPermission()
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>{token}</h2>
      <button onClick={requestPermission}>click</button>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
