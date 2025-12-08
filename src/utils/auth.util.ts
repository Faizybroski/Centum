import { paths } from '@/navigate/paths'
import { removeCookie, setCookie } from './cookies'

export const handleLogout = () => {
  removeCookie('access_token')
  window.location.replace(paths.login())
}

export const TOKEN_EXPIRE_DURATION = 1

export const setUser = ({ access_token, redirection = false }: { access_token: string; redirection?: boolean }) => {
  setCookie('access_token', access_token, TOKEN_EXPIRE_DURATION)

  if (redirection) {
    const urlParams = new URLSearchParams(window.location.search)
    const returnTo = urlParams.get('returnTo')
    const redirectUrl = returnTo ?? '/'

    window.location.replace(redirectUrl)
  }
}
