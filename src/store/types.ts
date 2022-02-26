import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
import { IAnalysis } from './main/analysis/types'

export interface IRootState {
  name?: string
  age?: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
  entireDepartments?: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IAnalysis
}

export type IStoreType = IRootState & IRootWithModule
