export type ISelectOptionValue<T> = {
  value: T,
  label: string
}
export type ISelectOptionValueList<T> = ISelectOptionValue<T>[]

export function EnumToSelectList<T extends string>(object: Record<T | string, string>): ISelectOptionValueList<T> {
  return Array.from(Object.entries(object))
    .map(([key, locale]) => ({label: locale, value: key as T}))
}
