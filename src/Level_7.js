import { useState, Fragment } from 'react'
import { useBackendHeartbeat } from './useBackendHeartbeat'

export default function Level7 ({
  onBonusLevelCompletionStatusChange,
  isBonusLevelCompleted
}) {
  const [error, setError] = useState('')

  useBackendHeartbeat({
    path: '/check-db-row',
    onResponse (response) {
      onBonusLevelCompletionStatusChange(response?.status === 200)
      if (response?.error) {
        setError(response?.error?.message ?? 'Something went wrong with the excercise, please contact us!')
      } else if (response?.status !== 200) {
        setError(response?.data)
      } else {
        setError('')
      }
    }
  })

  if (isBonusLevelCompleted) return null

  return (
    <>
      <span className='bold green' style={{ fontSize: '2em' }}>Congratulations!</span>
      <br /><br />
      <span className='bold'>You finished Level 6: </span>
      Setting up a new service.
      <br /><br /><br />
      <span className='bold green' style={{ fontSize: '1.5em' }}>You have just finished WeDevelop's Docker tutorial from our Training Program!</span>
      <br /><br /><br />
      <span className='bold'>-> LEVEL 7: BONUS!</span>
      <br /><br />
      - Try to login into the database you set up on the previous level.
      <br />
      - Then, inspect its structure and insert a row in the table we've created there.
      <br />
      - Use "BONUS_LEVEL" as the text to pass this level.
      <br />
      - No tips or special instructions this time!
      <br /><br />
      Waiting for database changes...
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
