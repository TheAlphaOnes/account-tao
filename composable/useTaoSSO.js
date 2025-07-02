// composables/useTaoSSO.js
export function useTaoSSO() {
  const accessToken = useCookie('tao_access_token', {
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
  })
  const refreshToken = useCookie('tao_refresh_token', {
    path: '/api/sso',
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  })
  const username = useCookie('tao_username', {
    path: '/',
    secure: true,
    httpOnly: false,
    sameSite: 'lax',
  })

  // Helpers
  const getTokens = () => ({
    accessToken: accessToken.value,
    refreshToken: refreshToken.value,
    username:username.value
  })

  const hasTokens = () => !!accessToken.value && !!refreshToken.value

  const setTokens = ({ access, refresh, user }) => {
    accessToken.value = access
    refreshToken.value = refresh
    username.value = user
  }

  const clearTokens = () => {
    accessToken.value = null
    refreshToken.value = null
    username.value = null
  }

  // Replace localStorage usage with cookie-based storage
  const validateAuthToken = async (TAO_AUTH_TOKEN, TAO_AUTH_URL) => {
    const serverURL = TAO_AUTH_URL.replace(/\/$/, '')
    const url = `${serverURL}/api/sso/validate?app=${location.origin}` +
      `&taoAuth=${TAO_AUTH_TOKEN}` +
      `&accessToken=${accessToken.value}` +
      `&refreshToken=${refreshToken.value}`

    try {
      const res = await $fetch(url, { method: 'GET' })
      if (res.status === 504) return undefined
      return res.isValid
    } catch (e) {
      console.error('validateAuthToken', e)
      return undefined
    }
  }

  const refreshAuthToken = async (TAO_AUTH_TOKEN, TAO_AUTH_URL) => {
    const serverURL = TAO_AUTH_URL.replace(/\/$/, '')
    const url = `${serverURL}/api/sso/refresh?app=${location.origin}` +
      `&taoAuth=${TAO_AUTH_TOKEN}` +
      `&accessToken=${accessToken.value}` +
      `&refreshToken=${refreshToken.value}`

    try {
      const res = await $fetch(url, { method: 'GET' })
      return res.data
    } catch (e) {
      console.error('refreshAuthToken', e)
      return null
    }
  }

  const cleanNextUrl = (url = '') => {
    let s = url.replace(/\/+$/, '')
    return s.replace(/^\/+/, '')
  }

  const redirectToTaoSSO = async (TAO_AUTH_TOKEN, TAO_AUTH_CALLBACK, TAO_AUTH_URL) => {
    const serverURL = TAO_AUTH_URL.replace(/\/$/, '')
    const next = cleanNextUrl(TAO_AUTH_CALLBACK)
    window.location.href =
      `${serverURL}/api/sso/generate?app=${location.origin}` +
      `&taoAuth=${TAO_AUTH_TOKEN}` +
      `&next=${location.origin}/${next}`
  }

  const isUserLoggedin = async (TAO_AUTH_TOKEN, TAO_AUTH_CALLBACK, TAO_AUTH_URL) => {
    if (!hasTokens()) return false

    const isValid = await validateAuthToken(TAO_AUTH_TOKEN, TAO_AUTH_URL)
    if (isValid === false) {
      const newTokens = await refreshAuthToken(TAO_AUTH_TOKEN, TAO_AUTH_URL)
      if (newTokens) {
        setTokens(newTokens)
        return true
      }
      clearTokens()
      return false
    }
    if (isValid === undefined) {
      clearTokens()
      await redirectToTaoSSO(TAO_AUTH_TOKEN, TAO_AUTH_CALLBACK, TAO_AUTH_URL)
      return false
    }
    return true
  }

  const logOutUser = () => {
    clearTokens()
    // optionally redirect or reload
  }

  return {
    accessToken,
    refreshToken,
    username,
    hasTokens,
    getTokens,
    setTokens,
    clearTokens,
    validateAuthToken,
    refreshAuthToken,
    isUserLoggedin,
    redirectToTaoSSO,
    logOutUser,
  }
}
