import { getToken } from 'firebase/messaging'
import { useEffect, useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import { messaging } from './firebaseConfig'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const requestPermission = async () => {
      await Notification.requestPermission().then(async (permission) => {
        if (permission === 'granted') {
          return await getToken(messaging!, {
            vapidKey: process.env.FCM_VAPID_KEY
          })
            .then(async (token) => {
              alert(`token: ${token}`)
            })
            .catch((error) => {
              alert(error)
            })
        }
      })
    }
    void requestPermission()
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
