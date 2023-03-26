export function isNotPresent(value: any): value is null | undefined {
  return value === undefined || value === null
}

export function isPresent<T>(value: T | undefined | null): value is T {
  return !isNotPresent(value)
}
