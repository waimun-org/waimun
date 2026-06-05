interface Success<T> {
  data: T;
  error: undefined;
}

interface Failure<E> {
  data: undefined;
  error: E;
}

type Result<T, E> = Success<T> | Failure<E>;

export function tryCatch<T, E = Error>(fn: () => T): Result<T, E>;
export function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>>;
export function tryCatch<T, E = Error>(
  input: (() => T) | Promise<T>,
): Result<T, E> | Promise<Result<T, E>> {
  if (typeof input === "function") {
    try {
      return { data: input(), error: undefined };
    } catch (error) {
      return { data: undefined, error: error as E };
    }
  }

  return input
    .then((data): Success<T> => ({ data, error: undefined }))
    .catch((error): Failure<E> => ({ data: undefined, error: error as E }));
}
