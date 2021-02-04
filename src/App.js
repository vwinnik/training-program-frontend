import { useState } from 'react'

import Level4 from './Level_4'
import Level5 from './Level_5'
import Level6 from './Level_6'
import Level7 from './Level_7'
import Congratulations from './Congratulations'

function App () {
  const [isBackendOnline, setIsBackendOnline] = useState(false)
  const [isDBConnectorInstalled, setIsDBConnectorInstalled] = useState(false)
  const [isDBConnected, setIsDBConnected] = useState(false)
  const [isBonusLevelCompleted, setIsBonusLevelCompleted] = useState(false)
  const isLevel5Enabled = isBackendOnline
  const isLevel6Enabled = isLevel5Enabled && isDBConnectorInstalled
  const isLevel7Enabled = isLevel6Enabled && isDBConnected
  const areAllLevelsCompleted = isLevel7Enabled && isBonusLevelCompleted

  return (
    <code>
      <Level4
        isBackendOnline={isBackendOnline}
        onBackendOnlineStatusChange={setIsBackendOnline}
      />
      {isLevel5Enabled && (
        <Level5
          onDBConnectorInstalledStatusChange={setIsDBConnectorInstalled}
          isDBConnectorInstalled={isDBConnectorInstalled}
        />
      )}
      {isLevel6Enabled && (
        <Level6
          onDBConnectionStatusChange={setIsDBConnected}
          isDBConnected={isDBConnected}
        />
      )}
      {isLevel7Enabled && (
        <Level7
          onBonusLevelCompletionStatusChange={setIsBonusLevelCompleted}
          isBonusLevelCompleted={isBonusLevelCompleted}
        />
      )}
      {areAllLevelsCompleted && (
        <Congratulations />
      )}
    </code>
  )
}

export default App
