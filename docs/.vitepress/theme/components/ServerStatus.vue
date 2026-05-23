<template>
  <!-- 幽灵占位：维持 flex 布局空间，visibility:hidden 不可见但占位 -->
  <div ref="ghostRef" class="island-ghost" aria-hidden="true">
    <div class="island-placeholder"></div>
  </div>

  <!-- 固定胶囊：始终 position:fixed，rAF 平滑追踪目标位置 -->
  <div ref="pillRef" class="island-pill" :class="{ docked: isDocked }">
    <div class="island-status glass-shell">
      <div class="island-container glass-surface" :class="{ loading: loading, online: status?.online, offline: !status?.online }" style="--gw: 280px; --gh: 48px; --gr: 24px; --gtr: 20%;">
        <div class="circle-overlay"></div>
        <div v-if="loading" class="loading-content">
          <div class="island-spinner"></div>
          <span>查询中...</span>
        </div>
        
        <div v-else-if="error" class="error-content">
          <span class="error-icon">⚠</span>
          <span>查询失败</span>
        </div>
        
        <div v-else class="status-content">
          <div class="status-indicator" :class="{ online: status?.online, offline: !status?.online }"></div>
          <span class="server-name">服务器状态</span>
          <span class="divider"></span>
          <span class="status-text" :class="{ online: status?.online, offline: !status?.online }">
            {{ status?.online ? '在线' : '离线' }}
          </span>
          <span class="divider"></span>
          <span class="player-count">{{ status?.online ? `${status.players.online}/${status.players.max}` : '--' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const serverAddress = ref('panda.neiki.top')
const status = ref(null)
const loading = ref(true)
const error = ref('')
const ghostRef = ref(null)
const pillRef  = ref(null)

/* ============== 吸顶 / 回位 滚动交互 ============== */
const isDocked = ref(false)

let rafId   = null

const BOTTOM_GAP  = 32               // 浮动时距离视口底部
const PILL_H      = 48               // 胶囊高度

/* 返回胶囊在页面底部中央的固定坐标 */
const floatPos = () => ({
  x: (window.innerWidth - 280) / 2,
  y: window.innerHeight - PILL_H - BOTTOM_GAP,
})

/* 返回占位元素在视口中的坐标（dock 目标） */
const dockPos = () => {
  const g = ghostRef.value
  if (!g) return floatPos()
  const r = g.getBoundingClientRect()
  return { x: r.left, y: r.top }
}

/* rAF 循环：直接定位，CSS transition 负责动画 */
const loop = () => {
  const pill = pillRef.value
  if (!pill) { rafId = requestAnimationFrame(loop); return }

  const g = ghostRef.value
  if (g) {
    const r  = g.getBoundingClientRect()
    const dist = window.innerHeight - r.bottom
    isDocked.value = dist > -60
  }

  const { x, y } = isDocked.value ? dockPos() : floatPos()
  pill.style.setProperty('--px', `${Math.round(x)}px`)
  pill.style.setProperty('--py', `${Math.round(y)}px`)

  rafId = requestAnimationFrame(loop)
}

/* resize 时去掉过渡，避免缩放时滑入过程 */
const removeTransition = () => {
  const pill = pillRef.value
  if (pill) pill.style.transition = 'none'
}
const restoreTransition = () => {
  const pill = pillRef.value
  if (pill) pill.style.transition = ''
  const { x, y } = isDocked.value ? dockPos() : floatPos()
  if (pill) {
    pill.style.setProperty('--px', `${Math.round(x)}px`)
    pill.style.setProperty('--py', `${Math.round(y)}px`)
  }
}

let resizeTimer = null
const onResize = () => {
  removeTransition()
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(restoreTransition, 100)
}

onMounted(() => {
  fetchStatus()
  rafId = requestAnimationFrame(loop)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  window.removeEventListener('resize', onResize)
  clearTimeout(resizeTimer)
})
/* ============== 吸顶 / 回位 END ============== */

const fetchStatus = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch(`https://api.mcsrvstat.us/2/${serverAddress.value}?t=${Date.now()}`)
    const data = await response.json()
    
    if (data.online !== undefined) {
      status.value = data
    } else {
      status.value = { online: false }
    }
  } catch (err) {
    console.error('查询失败:', err)
    error.value = '查询失败'
    status.value = { online: false }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
  transition: 0.25s;
}

/* ---- 幽灵占位：维持 flex 空间 ---- */
.island-ghost {
  pointer-events: none;
}
.island-placeholder {
  width: 280px;
  height: 48px;
  visibility: hidden;
}

/* ---- 固定胶囊 ---- */
.island-pill {
  position: fixed;
  z-index: 100;
  left: var(--px, 0);
  top:  var(--py, 0);
  transition: left 0.18s ease-out, top 0.18s ease-out;
}

/* dock 态让胶囊稍 “沉” 下去，呼吸动画减弱 */
.island-pill.docked .island-status {
  animation: island-float 6s ease-in-out infinite;
}

.island-status {
  display: inline-block;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  /* 悬浮时微妙的浮动呼吸 */
  animation: island-float 4s ease-in-out infinite;
}

@keyframes island-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

/* ---- 玻璃胶囊内部 ---- */
.island-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  overflow: hidden;
}

.circle-overlay {
  position: absolute;
  width: calc(var(--gw) - 9px);
  height: calc(var(--gh) - 9px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--gr);
  filter: blur(1px);
  pointer-events: none;
}

.status-content,
.loading-content,
.error-content {
  position: relative;
  z-index: 520;
}

.loading-content {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #3e3e3e;
  font-size: 13px;
}

.island-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-content {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #e06060;
  font-size: 13px;
}

.error-icon {
  font-size: 16px;
}

.status-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-indicator.online {
  background: #22c55e;
  box-shadow: 0 0 8px #22c55e, 0 0 16px rgba(34, 197, 94, 0.4);
  animation: glow 2s infinite;
}

.status-indicator.offline {
  background: #ef4444;
  box-shadow: 0 0 8px #ef4444, 0 0 16px rgba(239, 68, 68, 0.3);
}

@keyframes glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.server-name {
  font-size: 14px;
  font-weight: 600;
  color: #3e3e3e;
}

.divider {
  width: 1px;
  height: 16px;
  background: rgba(0, 0, 0, 0.12);
}

.status-text {
  font-size: 13px;
  font-weight: 700;
}

.status-text.online {
  color: #209626;
}

.status-text.offline {
  color: #ef4444;
}

.player-count {
  font-size: 13px;
  font-weight: 500;
  color: #3e3e3e;
  font-family: 'SF Mono', Monaco, Consolas, monospace;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .island-placeholder {
    width: 260px;
    height: 44px;
  }
  .island-container {
    --gw: 260px;
    --gh: 44px;
    --gr: 22px;
    padding: 0 16px;
  }
  .status-content {
    gap: 10px;
  }
  .server-name {
    font-size: 13px;
  }
  .status-text,
  .player-count {
    font-size: 12px;
  }
}
</style>
