import { useState, useEffect, Fragment } from 'react'
import { useBackendHeartbeat } from './useBackendHeartbeat'

export default function Level4 ({
  onBackendOnlineStatusChange,
  isBackendOnline
}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => { clearTimeout(timer) }
  }, [])
  useBackendHeartbeat({
    path: '/ping',
    onResponse (response) {
      if (response?.error) {
        setError(response?.error?.message ?? 'Something went wrong with the excercise, please contact us!')
      } else if (response?.status !== 200) {
        setError(
          'Backend connection failed.\n\nEnvironment ' +
          'variable value: REACT_APP_BACKEND_URL=' +
          process.env.REACT_APP_BACKEND_URL
        )
      }

      onBackendOnlineStatusChange(response?.data === 'pong')
    }
  }, [onBackendOnlineStatusChange])

  if (isBackendOnline) return null
  if (loading) return 'Initializing...'

  return (
    <>
      <span className='bold green'>Congratulations! </span>
      <span className='bold'>You finished Level 3: </span>
      enabling the Frontend.
      <br /><br /><br />
      <span className='bold'>-> LEVEL 4: enabling the Backend.</span>
      <br /><br />
      - <span className='bold'>From now on, you'll see all instructions on this page.</span>
      <br />
      - Your first task on this level is to enable the "tp-backend" service on the
       "docker-compose.yaml" file (uncomment the service).
      <br />
      - Then, stop all services (with Ctrl + C) and run "docker-compose up" again
        to start all services (including the newly enabled backend).
      <br />
      - Finally, take a look at any errors that may appear below and solve them to continue
      to the next level.
      <br /><br />
      <details>
        <summary>
          <span className='bold'>TIP:</span> expand this collapsible for help on how to make
          the error go away
        </summary>
        <div style={{ padding: '10px' }}>
          - This page uses an environment variable called "REACT_APP_BACKEND_URL" to make requests
            to the backend. Try setting it to an appropriate value.
          <br />
          - After changing environment variables, you need to stop the Docker Compose services
            and start them again with "docker-compose up".
          <br />
          - You may also need to reload this page for the changes to take effect.
        </div>
      </details>
      <br /><br />
      Waiting for connection to the backend...
      <br /><br /><br />
      <div className='red'>
        {error && <span className='bold'>ERROR: </span>}
        {error?.split('\n').map((str, i) => (
          <Fragment key={i}>
            {str}
            <br />
          </Fragment>
        ))}
      </div>
    </>
  )
}
