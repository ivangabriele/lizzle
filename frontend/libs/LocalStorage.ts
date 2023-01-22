/* eslint-disable class-methods-use-this */

import type { LocalStorageNamespace } from '@frontend/constants'

export class LocalStorage {
  get<T extends Record<string, any>, K extends keyof T = keyof T>(
    namespace: LocalStorageNamespace,
    key: K,
  ): T[K] | undefined {
    const namespaceValueAsJson = window.localStorage.getItem(namespace)
    if (!namespaceValueAsJson) {
      return undefined
    }

    const namespaceValue = JSON.parse(namespaceValueAsJson) as T

    return namespaceValue[key]
  }

  set<T extends Record<string, any>, K extends keyof T = keyof T>(
    namespace: LocalStorageNamespace,
    key: K,
    value: T[K],
  ): void {
    const namespaceValueAsJson = window.localStorage.getItem(namespace)
    const namespaceValue: T = namespaceValueAsJson ? JSON.parse(namespaceValueAsJson) : {}

    const nextNamespaceValue: T = {
      ...namespaceValue,
      [key]: value,
    }
    const nextNamespaceValueAsJson = JSON.stringify(nextNamespaceValue)

    window.localStorage.setItem(namespace, nextNamespaceValueAsJson)
  }
}
