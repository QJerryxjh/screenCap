const start = document.querySelector('#start')
const stop = document.querySelector('#stop')
const chunks = []

const canv = document.getElementsByTagName('canvas')[0]
const stream = canv.captureStream(120) 

let recorder = new MediaRecorder(stream)

recorder.ondataavailable = e => {
  chunks.push(e.data)
}

recorder.onstop = () => {
  console.log(chunks)
  const blob = new Blob(chunks, {
    type: 'video/mp4'
  })
  console.log(blob)
  const downloadUrl = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = downloadUrl
  link.download = 'test.mp4'
  document.body.append(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(downloadUrl)
}


start.onclick = () => {
  recorder.start(100)
  stop.removeAttribute('disabled')
  start.setAttribute('disabled', 'disabled')
}
stop.onclick = () => {
  recorder.stop()
  start.removeAttribute('disabled')
  stop.setAttribute('disabled', 'disabled')
}
