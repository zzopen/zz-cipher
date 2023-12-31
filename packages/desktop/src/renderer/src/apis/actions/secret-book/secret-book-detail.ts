import { req } from '@renderer/apis/instance'
import { API_SECRET_BOOK_DETAIL } from './define'
import type { SecretBook, Nullable } from '@common/types'

export interface SecretBookDetailRequest {
  id: string
  [propName: string]: any
}

export const secretBookDetailAction = async (
  p: SecretBookDetailRequest
): Promise<Nullable<SecretBook>> => {
  const apiDescription = Object.assign({}, API_SECRET_BOOK_DETAIL)
  const { data, mark } = await req!.request<SecretBook>(apiDescription, {
    config: { params: p }
  })

  if (!mark || !data) {
    return null
  }

  return transfer(data)
}

function transfer(data: any): Nullable<SecretBook> {
  if (!data) {
    return null
  }

  const res: SecretBook = {
    id: data.id ?? '',
    title: data.title ?? '',
    website: data.website ?? '',
    username: data.username ?? '',
    password: data.password ?? '',
    mobile: data.mobile ?? '',
    email: data.email ?? '',
    remark: data.remark ?? '',
    createdAt: data.created_at ?? '',
    updatedAt: data.updated_at ?? '',
    dataUpdatedAt: data.data_updated_at ?? '',
    secretCategoryId: data.secret_category_id ?? '',
    secretCategoryName: data.secret_category_name ?? ''
  }

  return res
}
