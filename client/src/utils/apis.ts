const BASE_URL = import.meta.env.VITE_BASE_URL

export const USER_SIGNUP_API = BASE_URL + "/api/auth/signup"
export const USER_LOGIN_API = BASE_URL + "/api/auth/login"

export const ADD_PROJECT_API = BASE_URL + "/api/manager/addProject"
export const DELETE_PROJECT_API = BASE_URL + "/api/manager/project"
export const UPDATE_PROJECT_API = BASE_URL + "/api/manager/updateProject"