let sharedCtx = null

export function getSharedAudioCtx() {
  if (!sharedCtx) {
    sharedCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return sharedCtx
}

export async function unlockSharedAudioCtx() {
  const ctx = getSharedAudioCtx()
  const silentBuffer = ctx.createBuffer(1, 1, 22050)
  const source = ctx.createBufferSource()
  source.buffer = silentBuffer
  source.connect(ctx.destination)
  source.start(0)
  await ctx.resume()
  return ctx
}