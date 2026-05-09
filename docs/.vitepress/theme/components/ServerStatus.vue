<template>
  <div class="island-status">
    <div class="island-container" :class="{ loading: loading, online: status?.online, offline: !status?.online }">
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
</template>

<script setup>
import { ref, onMounted } from 'vue'

const serverAddress = ref('panda.neiki.top')
const status = ref(null)
const loading = ref(true)
const error = ref('')

// 获取服务器状态
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

onMounted(() => {
  fetchStatus()
})
</script>

<style scoped>
.island-status {
  display: inline-block;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin-top: 3rem;
  margin-bottom: 2rem;
}

.island-container {
  position: relative;
  display: inline-flex;
  height: 44px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border-radius: 22px;
  padding: 0 20px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.island-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
}

.island-container.online {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
}

.island-container.offline {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
}

.island-container.loading {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.loading-content {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
}

.island-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top: 2px solid rgba(255, 255, 255, 0.7);
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
  color: #fca5a5;
  font-size: 13px;
}

.error-icon {
  font-size: 16px;
}

.status-content {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-indicator.online {
  background: #4ade80;
  box-shadow: 0 0 8px #4ade80;
  animation: glow 2s infinite;
}

.status-indicator.offline {
  background: #f87171;
  box-shadow: 0 0 8px #f87171;
}

@keyframes glow {
  0%, 100% { 
    opacity: 1;
    box-shadow: 0 0 8px #4ade80;
  }
  50% { 
    opacity: 0.7;
    box-shadow: 0 0 12px #4ade80;
  }
}

.server-name {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.divider {
  width: 1px;
  height: 16px;
  background: rgba(255, 255, 255, 0.2);
}

.status-text {
  font-size: 13px;
  font-weight: 600;
}

.status-text.online {
  color: #4ade80;
}

.status-text.offline {
  color: #f87171;
}

.player-count {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'SF Mono', Monaco, Consolas, monospace;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .island-container {
    height: 40px;
    border-radius: 20px;
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
