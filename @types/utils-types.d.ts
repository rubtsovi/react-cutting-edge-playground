declare type EnumLikeValues<T> = T[keyof T];

declare type NotEmptyArray<T> = [T, ...T[]];

declare type KebabCase<
  T extends string,
  Prefix extends string = '',
> = T extends `${infer First}${infer Rest}`
  ? KebabCase<
      Rest,
      `${Prefix}${First extends Uppercase<First>
        ? Prefix extends ''
          ? ''
          : '-'
        : ''}${Lowercase<First>}`
    >
  : Prefix;

declare type KeysByPrefix<T, Prefix extends string = ''> = keyof {
  [Key in keyof T as Key extends `${Prefix}${string}` ? Key : never]: Key;
};
