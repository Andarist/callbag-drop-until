# callbag-drop-until

Drop emitted values from source until provided observable emits.

## Example

```js
import dropUntil from 'callbag-drop-until'
import forEach from 'callbag-for-each'
import pipe from 'callbag-pipe'
import timer from 'callbag-timer'

pipe(
  interval(1000),
  dropUntil(timer(6000)),
  forEach(value => {
    // will log 5 6 7 8 ...
    console.log(value)
  }),
)
```
