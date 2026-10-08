import type { ApiVersion } from "@commercelayer/sdk"

// Core API version targeted by every SDK client created in the app.
// `2017-08` keeps the API behavior the app was built on;
// `2026-05` is the latest API version the SDK supports.
// https://github.com/commercelayer/commercelayer-sdk#api-version
export const apiVersion: ApiVersion = "2026-05"
