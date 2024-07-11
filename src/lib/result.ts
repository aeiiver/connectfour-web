export type Result<T, E> = { is_ok: true; value: T } | { is_ok: false; error: E };

export function Ok<T, E>(value: T): Result<T, E> {
  return { is_ok: true, value };
}

export function Err<T, E>(error: E): Result<T, E> {
  return { is_ok: false, error };
}
