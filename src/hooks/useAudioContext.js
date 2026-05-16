let sharedCtx = null

export function getSharedAudioCtx() {
  if (!sharedCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) throw new Error('Web Audio API not supported')
    sharedCtx = new Ctx()
  }
  return sharedCtx
}

export async function unlockSharedAudioCtx() {
  const ctx = getSharedAudioCtx()
  try {
    if (ctx.state === 'suspended') {
      try {
        const silentBuffer = ctx.createBuffer(1, 1, ctx.sampleRate || 44100)
        const src = ctx.createBufferSource()
        src.buffer = silentBuffer
        src.connect(ctx.destination)
        src.start(0)
      } catch (e) {
        // ignore buffer/play errors
      }
      await ctx.resume()
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('unlockSharedAudioCtx failed', e)
  }
  return ctx
}