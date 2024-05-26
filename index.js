const canvas = document.querySelector('canvas')
const btn = document.querySelector('button')
const ctx = canvas.getContext('2d')
let isPainting = false
let mouseX, mouseY, lastX, lastY, color, lineWidth

function updateMousePosition({ clientX, clientY }) {
  const rect = canvas.getBoundingClientRect()
  mouseX = clientX - rect.left
  mouseY = clientY - rect.top
}

function draw(x, y, mouseX, mouseY, color, size) {
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.lineWidth = size
  ctx.lineCap = 'round'
  ctx.moveTo(mouseX, mouseY)
  ctx.lineTo(x, y)
  ctx.stroke()
}

function startDrawing(event) {
  updateMousePosition(event)
  isPainting = true
}
function stopDrawing() {
  isPainting = false
}
function drawingOrErase(event) {
  if (!isPainting) return

  const { clientX, clientY } = event?.touches ? event.touches[0] : event

  lastX = mouseX
  lastY = mouseY

  updateMousePosition({ clientX, clientY })

  color = document.getElementById('color').value
  lineWidth = document.getElementById('size').value

  if (btn.textContent === 'Erase') {
    draw(lastX, lastY, mouseX, mouseY, color, lineWidth)
  } else if (btn.textContent === 'Draw') {
    erase(mouseX, mouseY, lineWidth)
  }
}
function erase(x, y, size) {
  ctx.clearRect(x - size / 2, y - size / 2, size, size)
}

btn.addEventListener('click', () => {
  btn.textContent = btn.textContent === 'Erase' ? 'Draw' : 'Erase'
})

//mobile events
canvas.addEventListener('touchstart', (e) => startDrawing(e))
canvas.addEventListener('touchmove', (e) => drawingOrErase(e))
canvas.addEventListener('touchend', () => stopDrawing())
//desktop events
canvas.addEventListener('mouseup', () => stopDrawing())
canvas.addEventListener('mousedown', (e) => startDrawing(e))
canvas.addEventListener('mousemove', (e) => drawingOrErase(e))
canvas.addEventListener('mouseout', stopDrawing)
