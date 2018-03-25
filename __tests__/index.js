import forEach from 'callbag-for-each'
import pipe from 'callbag-pipe'

import dropUntil from '../src'

const noop = () => {}

const makeSource = () => {
  const ret = {}
  ret.source = (start, sink) => {
    if (start !== 0) return
    ret.next = sink
    sink(0, noop)
  }
  return ret
}

test('works', () => {
  const actual = []
  let next

  const source = makeSource()
  const notifier = makeSource()

  pipe(
    source.source,
    dropUntil(notifier.source),
    forEach(data => {
      actual.push(data)
    }),
  )

  return Promise.resolve()
    .then(() => source.next(0))
    .then(() => source.next(1))
    .then(() => source.next(2))
    .then(() => source.next(3))
    .then(() => notifier.next(0))
    .then(() => source.next(4))
    .then(() => source.next(5))
    .then(() => source.next(6))
    .then(() => source.next(7))
})
