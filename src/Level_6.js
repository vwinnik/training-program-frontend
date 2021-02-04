import { useState, Fragment } from 'react'
import { useBackendHeartbeat } from './useBackendHeartbeat'

export default function Level6 ({
  onDBConnectionStatusChange,
  isDBConnected
}) {
  const [error, setError] = useState('')

  useBackendHeartbeat({
    path: '/check-db-connection',
    onResponse (response) {
      onDBConnectionStatusChange(response?.status === 200)
      if (response?.error) {
        setError(response?.error?.message ?? 'Something went wrong with the excercise, please contact us!')
      } else if (response?.status !== 200) {
        setError(response?.data)
      } else {
        setError('')
      }
    }
  })

  if (isDBConnected) return null

  return (
    <>
      <span className='bold green'>Congratulations! </span>
      <span className='bold'>You finished Level 5: </span>
      Oops! An error occurred!
      <br /><br /><br />
      <span className='bold'>-> LEVEL 6: Setting up a new service.</span>
      <br /><br />
      - In this level, you'll need to setup your own Docker Compose service!
      <br />
      - Use "tp-database" as the name for the new service.
      <br />
      - Use{' '}
      <a href='https://hub.docker.com/_/postgres' target='_blank' rel='noreferrer'>
        this Docker image
      </a>
      {' '}as the base for your service, and configure it properly.
      <br />
      - <span className='bold'>TIP:</span> set "postgres:13-alpine" as the image of your service.
      <br />
      - Before continuing to the next level, you'll need to fix the following error
      that's currently occurring on the backend:
      <br /><br />
      <details>
        <summary>
          <span className='bold'>TIP:</span> expand this collapsible for help on how to make
          the error go away
        </summary>
        <div style={{ padding: '10px' }}>
          - For help on how to configure the database image,{' '}
          <a
            href='https://github.com/docker-library/docs/blob/master/postgres/README.md#environment-variables'
            target='_blank'
            rel='noreferrer'
          >
            take a look at this
          </a>.
          <br />
          - Keep in mind that PostgreSQL's default port is "5432", and you'll need to map it using
          the "ports" directive on your "docker-compose.yaml" file.
          <br />
          - Remember to stop Docker Compose and start it again using "docker-compose up". Otherwise,
          it'll not pick the new service up!
          <br />
          - Don't forget to <span className='bold'>configure the environment variables</span> on the
          Backend service! They're needed so that it knows how to connect to the database.
          <br />
          - When one service from a "docker-compose.yaml" file needs to connect to another service
          from the same file, the host to use for the second service is its name. You'll need to
          set the appropriate environment variable so that the database connection is made to the
          "tp-database" host.
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
