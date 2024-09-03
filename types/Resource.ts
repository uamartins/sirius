import { AsyncData, UseFetchOptions } from 'nuxt/app'
import type { FetchError } from 'ofetch'
import { ResultSetInterface } from './ResultSet'
import { Entity } from './Entity'

export interface IResource<T extends Entity> {
  create(entity: T): AsyncData<T | null, FetchError<any> | null>
  show(uuid: string): AsyncData<T | null, FetchError<any> | null>
  list(options: UseFetchOptions<ResultSetInterface<T>>): AsyncData<ResultSetInterface<T> | null, FetchError<any> | null>
  delete(uuid: string): AsyncData<unknown, FetchError<any> | null>
}

export class Resource<T extends Entity> implements IResource<T> {
  constructor(readonly path = ``) {}


  save(entity: T): AsyncData<T | null, FetchError<any> | null> {
    if (entity.uuid) {
      return this.update(entity)
    }

    return this.create(entity)
  }

  create(entity: T): AsyncData<T | null, FetchError<any> | null> {
    return useCustomFetch<T>(`/${this.path}`, {
      method: 'POST',
      body: entity,
    })
  }

  update(entity: T): AsyncData<T | null, FetchError<any> | null> {
    return useCustomFetch<T>(`/${this.path}/${entity.uuid}`, {
      method: 'PUT',
      body: entity,
    })
  }

  show(uuid: string): AsyncData<T | null, FetchError<any> | null> {
    return useCustomFetch<T>(`/${this.path}/${uuid}`)
  }

  list(options: UseFetchOptions<ResultSetInterface<T>>): AsyncData<ResultSetInterface<T> | null, FetchError<any> | null> {
    return useCustomFetch<ResultSetInterface<T>>(`/${this.path}`, options)
  }

  delete(uuid: string) {
    return useCustomFetch(`/${this.path}/${uuid}`, {
      method: 'DELETE',
    })
  }
}
