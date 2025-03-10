import { jwtDecode } from "@commercelayer/js-auth"

export function isTokenExpired({
  accessToken,
  compareTo,
}: {
  accessToken: string
  compareTo: Date
}): boolean {
  const decodedJWT = jwtDecode(accessToken)
  const exp = decodedJWT.payload.exp
  if (exp == null) {
    return true
  }

  const nowTime = Math.trunc(compareTo.getTime() / 1000)
  return nowTime > exp
}
