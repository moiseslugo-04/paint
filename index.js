const canvas = document.querySelector('canvas')
const btn = document.querySelector('button')
const ctx = canvas.getContext('2d')
let isPaint = false
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
//mobile
canvas.addEventListener('touchstart', (e) => startDraw(e))
canvas.addEventListener('touchmove', (e) => drawing(e))
canvas.addEventListener('touchend', () => (isPaint = false))
//desktop
canvas.addEventListener('mouseup', () => (isPaint = false))
canvas.addEventListener('mousedown', (e) => startDraw(e))
canvas.addEventListener('mousemove', (e) => drawing(e))
function startDraw(event) {
  updateMousePosition(event)
  isPaint = true
}
function drawing(event) {
  if (!isPaint) return
  const { clientX, clientY } = event?.touches[0] ?? event
  lastX = mouseX
  lastY = mouseY
  updateMousePosition({ clientX, clientY })
  color = document.getElementById('color').value
  lineWidth = document.getElementById('size').value
  if (btn.textContent !== 'Erase') {
    erase(mouseX, mouseY, lineWidth)
  } else if (btn.textContent !== 'Paint') {
    draw(lastX, lastY, mouseX, mouseY, color, lineWidth)
  }
}
function erase(x, y, size) {
  ctx.clearRect(x - size / 2, y - size / 2, size, size)
}

btn.addEventListener('click', () => {
  btn.textContent = btn.textContent === 'Erase' ? 'Paint' : 'Erase'
})
