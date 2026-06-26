import { faker } from "@faker-js/faker"

type UrlParamKey = "clientId" | "scope" | "returnUrl"
type UrlParams = Partial<Record<UrlParamKey, string | undefined>>

export const getRequiredEnv = (
  name: "E2E_CLIENTID" | "E2E_SCOPE" | "E2E_RETURN_URL",
): string => {
  const value = process.env[name]

  if (value == null || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

export const getEnvOrDefault = (
  name: "E2E_BASE_URL",
  defaultValue: string,
): string => {
  const value = process.env[name]
  if (value == null || value.trim().length === 0) {
    return defaultValue
  }
  return value
}
export const e2eBaseUrl = getEnvOrDefault(
  "E2E_BASE_URL",
  "http://localhost:5173/identity/login",
)
const parseAbsoluteUrl = (value: string, envName: string): URL => {
  try {
    const parsed = new URL(value)
    if (parsed.origin === "null") {
      throw new Error("URL is not absolute")
    }
    return parsed
  } catch {
    throw new Error(
      `Environment variable ${envName} must be a valid absolute URL (e.g. https://example.com/callback), got: "${value}"`,
    )
  }
}

export const e2eClientId = getRequiredEnv("E2E_CLIENTID")
export const e2eScope = getRequiredEnv("E2E_SCOPE")
export const e2eReturnUrl = getRequiredEnv("E2E_RETURN_URL")
export const expectedReturnUrl = parseAbsoluteUrl(
  e2eReturnUrl,
  "E2E_RETURN_URL",
)

export const defaultParams: Record<UrlParamKey, string> = {
  clientId: e2eClientId,
  scope: e2eScope,
  returnUrl: e2eReturnUrl,
}

export const buildLoginUrl = (params: UrlParams = {}): string => {
  const url = new URL(e2eBaseUrl)
  url.search = ""
  const mergedParams: UrlParams = {
    ...defaultParams,
    ...params,
  }

  for (const [key, value] of Object.entries(mergedParams)) {
    if (value == null || value.length === 0) {
      continue
    }

    url.searchParams.set(key, value)
  }

  return url.toString()
}

export const buildRandomCredentials = (): {
  email: string
  password: string
} => {
  return {
    email: faker.internet.email({ provider: "example.com" }),
    password: faker.internet.password({
      length: 16,
      memorable: false,
      pattern: /[a-zA-Z0-9]/,
      prefix: "E2e!",
    }),
  }
}
