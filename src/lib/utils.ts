import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * used as tagged function helps to intellisense tailwind classes if appropriate settings applied to IDE
 * @param twClasses
 */
export function tw(twClasses: TemplateStringsArray) {
  return twClasses.join('');
}

/**
 * Helps in type assertion for nullable | undefined values:
 * ```ts
 * const formFieldContext = useContext(FormFieldContext as CustomInterface | null) ?? assert("Oh no! There's an error");
 * //    ^? CustomInterface (eliminates nullability)
 * ```
 * @param msg
 */
export function assert(msg: string): never {
  throw new Error(msg);
}
