import { useEffect } from 'react'
import axios from 'axios'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? window.location.href

async function tryPingRequest(href, cancelToken) {
  try {
    const response = await axios.get(href, {
      cancelToken,
      timeout: 2500
    })

    return response
  } catch (err) {
    return err.response ?? { error: err }
  }
}

export function useBackendHeartbeat({ path, onResponse }, dependencies) {
  useEffect(() => {
    let source
    let timeout
    const cleanup = () => {
      source?.cancel()
      clearTimeout(timeout)
    }
    const testBackendConnection = async () => {
      cleanup()
      source = axios.CancelToken.source()

      const response = await tryPingRequest(
        (new URL(path, BACKEND_URL)).href,
        source.token
      )

      onResponse(response)
      timeout = setTimeout(testBackendConnection, 5000)
    }

    testBackendConnection()

    return cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}
