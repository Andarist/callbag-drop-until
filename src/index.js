export default function dropUntil(notifier) {
  return source => (start, sink) => {
    if (start !== 0) return
    let sourceTalkback
    let notifierTalkback
    let notified = false
    source(0, (type, data) => {
      if (type === 0) {
        sourceTalkback = data

        notifier(0, (type, data) => {
          if (type === 0) {
            notifierTalkback = data
            notifierTalkback(1)
          } else if (type === 1) {
            notified = true
            notifierTalkback(2)
          }
        })
      }

      if (type !== 1) {
        sink(type, data)
        return
      }

      if (!notified) {
        sourceTalkback(1)
        return
      }

      sink(1, data)
    })
  }
}
