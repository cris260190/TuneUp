let sharedCtx = null

export function getSharedAudioCtx() {
  if (!sharedCtx) {
    sharedCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return sharedCtx
}

export function unlockSharedAudioCtx() {
  // creează SINCRON în user gesture
  const ctx = getSharedAudioCtx()
  
  // silent buffer - must be sync
  const buf = ctx.createBuffer(1, 1, ctx.sampleRate)
  const src = ctx.createBufferSource()
  src.buffer = buf
  src.connect(ctx.destination)
  src.start(0)

  // resume e async dar il pornim fara await
  ctx.resume()
  
  return ctx
}