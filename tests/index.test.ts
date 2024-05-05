import * as Option from "../src/index"
import { it, expect } from "vitest"

it('~isSome', () => {
    const optionSome = Option.some(10)
    const optionNone = Option.none

    expect(Option.isSome(optionSome)).toBe(true)
    expect(Option.isSome(optionNone)).toBe(false)
})

it('~isNone', () => {
    const optionNone = Option.none
    const optionSome = Option.some(10)

    expect(Option.isNone(optionNone)).toBe(true)
    expect(Option.isNone(optionSome)).toBe(false)
})

it('~match some value', () => {
    const option = Option.some(10)

    const result = Option.match(option, {
        some: value => value + 1,
        none: () => 99,
    })

    expect(result).toBe(11)
})

it('~match none value', () => {
    const option = Option.none

    const result = Option.match<number>(option, {
        some: value => value + 1,
        none: () => 99,
    })

    expect(result).toBe(99)
})

it('~find finding an element', () => {
    const list = [1, 2, 3]

    const result = Option.find(list, item => item === 2)

    expect(Option.isSome(result) && result.value === 2).toBe(true)
})

it('~find not finding an element', () => {
    const list = [1, 2, 3]

    const result = Option.find(list, item => item > 100)

    expect(Option.isNone(result)).toBe(true)
})

it('~pop with a non empty array', () => {
    const list = [1, 2, 3]

    expect(Option.pop(list)).toStrictEqual(Option.some(3))
    expect(Option.pop(list)).toStrictEqual(Option.some(2))
    expect(Option.pop(list)).toStrictEqual(Option.some(1))
    expect(Option.pop(list)).toStrictEqual(Option.none)
});

it('~pop with a empty array', () => {
    const list = []

    const result = Option.pop(list)

    expect(result).toStrictEqual(Option.none)
});

it('~unwrap with some value', () => {
    const option = Option.some(10)

    const result = Option.unwrap(option)

    expect(result).toBe(10)
})

it('~unwrap with none value', () => {
    const option = Option.none

    expect(() => Option.unwrap(option)).toThrowError('Cannot unwrap a None value')
})

it('~unwrapOr with some value', () => {
    const option = Option.some(10)

    const result = Option.unwrapOr(option, 99)

    expect(result).toBe(10)
})

it('~unwrapOr with none value', () => {
    const option = Option.none

    const result = Option.unwrapOr(option, 99)

    expect(result).toBe(99)
})

it('~expect with some value', () => {
    const option = Option.some(10)

    const result = Option.expect(option, 'Expectation message')

    expect(result).toBe(10)
})

it('~expect with none value', () => {
    const option = Option.none

    expect(
        () => Option.expect(option, 'Expectation message')
    ).toThrowError('Expectation message')
})
