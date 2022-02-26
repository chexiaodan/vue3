import hmRequest from '../index'

interface IAccount {
  name: string
  password: string
}

interface IDataType {
  code: number
  data: any
}

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return hmRequest.post<IDataType>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return hmRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  })
}

export function requestUserByRoleId(id: number) {
  return hmRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
