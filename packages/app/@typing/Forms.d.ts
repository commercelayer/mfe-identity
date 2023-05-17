declare module 'Forms' {
  export interface LoginFormValues {
    customerEmail: string
    customerPassword: string
  }

  export interface SignUpFormValues {
    customerEmail: string
    customerPassword: string
    customerConfirmPassword: string
  }
}
