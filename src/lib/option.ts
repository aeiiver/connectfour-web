export type Option<T> = { is_present: true; value: T } | { is_present: false };

export function Some<T>(value: T): Option<T> {
  return { is_present: true, value };
}

export function None<T>(): Option<T> {
  return { is_present: false };
}
