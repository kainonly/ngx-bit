export function emptyObject<T>(object: T): boolean {
  return Object.keys(object).length === 0;
}
