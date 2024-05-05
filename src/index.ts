export type Some<A> = {
    readonly _tag: 'Some'
    readonly value: A
}

export type None = { readonly _tag: 'None' }

export type Option<A> = Some<A> | None

type Match<A, R> = {
    some: (value: A) => R
    none: () => R,
}

export const some = <A>(value: A): Some<A> => ({_tag: 'Some', value})
export const none: None = {_tag: 'None'}

export const isSome = <A>(option: Option<A>): option is Some<A> => option._tag === 'Some'
export const isNone = <A>(option: Option<A>): option is None => option._tag === 'None'

export const wrap = <A>(value: A): Option<A> => {
    if (value === null || value === undefined) {
        return none
    }

    return some(value)
}

export const unwrap = <A>(option: Option<A>): A => {
    if (isNone(option)) {
        throw new Error('Cannot unwrap a None value')
    }

    return option.value
}

export const unwrapOr = <A>(option: Option<A>, fallback: A): A => {
    if (isNone(option)) {
        return fallback
    }

    return option.value
}

export const expect = <A>(option: Option<A>, message: string): A => {
    if (isNone(option)) {
        throw new Error(message)
    }

    return option.value
}

export const match = <A, R>(option: Option<A>, match: Match<A, R>): R => {
    if (isSome(option)) {
        return match.some(option.value)
    } else {
        return match.none()
    }
}

export const find = <A>(
    array: A[],
    callback: (item: A, index: number) => boolean
): Option<A> => wrap(array.find(callback))