import { useState, Fragment } from 'react'
import { useBackendHeartbeat } from './useBackendHeartbeat'

export default function Level5 ({
  onDBConnectorInstalledStatusChange,
  isDBConnectorInstalled
}) {
  const [error, setError] = useState('')

  useBackendHeartbeat({
    path: '/check-db-connector-installed',
    onResponse (response) {
      onDBConnectorInstalledStatusChange(response?.status === 200)
      if (response?.error) {
        setError(response?.error?.message ?? 'Something went wrong with the excercise, please contact us!')
      } else if (response?.status !== 200) {
        setError(response?.data)
      } else {
        setError('')
      }
    }
  })

  if (isDBConnectorInstalled) return null

  return (
    <>
      <span className='bold green'>Congratulations! </span>
      <span className='bold'>You finished Level 4: </span>
      enabling the Backend.
      <br /><br /><br />
      <span className='bold'>-> LEVEL 5: Oops! An error occurred!</span>
      <br /><br />
      - Before continuing to the next level, you'll need to fix the following error
      that's currently occurring on the backend:
      <br /><br />
      <details>
        <summary>
          <span className='bold'>TIP:</span> expand this collapsible for help on how to make
          the error go away
        </summary>
        <div style={{ padding: '10px' }}>
          - Make sure all NPM modules are installed on the backend repository.
          <br />
          - Remember to restart the backend service after you make the required changes.
          <br />
          - <span className='bold'>To restart a Docker container</span> you can use this command:
          "docker restart &lt;container-name&gt;"
        </div>
      </details>
      <br /><br />
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
