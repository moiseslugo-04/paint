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
const erase = (x, y, size) => {
  ctx.clearRect(x - size / 2, y - size / 2, size, size)
}

canvas.addEventListener('mouseup', () => (isPaint = false))
canvas.addEventListener('mousedown', (e) => {
  updateMousePosition(e)
  isPaint = true
})
canvas.addEventListener('mousemove', ({ clientX, clientY }) => {
  if (!isPaint) return
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
})

btn.addEventListener('click', () => {
  btn.textContent = btn.textContent === 'Erase' ? 'Paint' : 'Erase'
})
