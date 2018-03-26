import forEach from 'callbag-for-each'
import pipe from 'callbag-pipe'
import subject from 'callbag-subject'

import dropUntil from '../src'

test('works', () => {
  const actual = []
  let next

  const source = subject()
  const notifier = subject()

  pipe(
    source,
    dropUntil(notifier),
    forEach(data => {
      actual.push(data)
    }),
  )

  return Promise.resolve()
    .then(() => source(1, 0))
    .then(() => source(1, 1))
    .then(() => source(1, 2))
    .then(() => source(1, 3))
    .then(() => notifier(1, 0))
    .then(() => source(1, 4))
    .then(() => source(1, 5))
    .then(() => source(1, 6))
    .then(() => source(1, 7))
    .then(() => {
      expect(actual).toEqual([4, 5, 6, 7])
    })
})
