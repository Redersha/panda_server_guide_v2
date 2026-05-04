<template>
  <div class="capsule-status">
    <div class="capsule-container" :class="{ loading: loading, online: status?.online, offline: !status?.online }">
      <div v-if="loading" class="loading-content">
        <div class="capsule-spinner"></div>
        <span>查询中...</span>
      </div>
      
      <div v-else-if="error" class="error-content">
        <span class="error-icon">⚠</span>
        <span>查询失败</span>
      </div>
      
      <div v-else class="status-content">
        <div class="status-main">
          <span class="server-icon">🖥️</span>
          <div class="server-info">
            <span class="server-name">{{ serverAddress }}</span>
            <span class="status-text" :class="{ online: status?.online, offline: !status?.online }">
              {{ status?.online ? '在线' : '离线' }}
            </span>
          </div>
        </div>
        
        <div v-if="status?.online" class="status-details">
          <div class="detail-item">
            <span class="detail-label">版本</span>
            <span class="detail-value" :title="status.version">{{ formatVersion(status.version) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">玩家</span>
            <span class="detail-value">{{ status.players.online }}/{{ status.players.max }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">延迟-非实时</span>
            <span class="detail-value" :class="getPingClass(latency)">
              {{ latency ? `${latency}ms` : '--' }}
            </span>
          </div>
        </div>
      </div>
      
      <div class="status-indicator" :class="{ online: status?.online, offline: !status?.online }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const serverAddress = ref('panda.neiki.top')
const status = ref(null)
const loading = ref(true)
const error = ref('')
const latency = ref(null)

// 格式化版本号，只显示版本号
const formatVersion = (version) => {
  if (!version) return '--'
  // 提取版本号，例如从 "Paper 1.20.1" 中提取 "1.20.1"
  const match = version.match(/\d+(\.\d+)+/)
  return match ? match[0] : version
}

// 根据延迟值返回CSS类
const getPingClass = (ping) => {
  if (!ping) return 'ping-na'
  if (ping < 100) return 'ping-good'
  if (ping < 200) return 'ping-medium'
  return 'ping-bad'
}

// 手动测量延迟
const measureLatency = async () => {
  if (!status.value?.online) {
    latency.value = null
    return
  }
  
  try {
    const startTime = Date.now()
    // 尝试通过服务器的端口来测量延迟
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)
    
    // 注意：由于浏览器的同源策略，我们不能直接ping服务器的25565端口
    // 所以我们尝试通过API的响应时间来估算
    const response = await fetch(`https://api.mcsrvstat.us/2/${serverAddress.value}`, {
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    
    const endTime = Date.now()
    latency.value = endTime - startTime
    
  } catch (err) {
    console.warn('延迟测量失败:', err)
    // 如果测量失败，尝试使用API返回的ping值
    if (status.value?.ping) {
      latency.value = status.value.ping
    } else {
      latency.value = null
    }
  }
}

// 获取服务器状态
const fetchStatus = async () => {
  loading.value = true
  error.value = ''
  latency.value = null
  
  try {
    const startTime = Date.now()
    const response = await fetch(`https://api.mcsrvstat.us/2/${serverAddress.value}?t=${Date.now()}`)
    const data = await response.json()
    const endTime = Date.now()
    
    if (data.online !== undefined) {
      status.value = data
      
      // 如果有API返回的ping就用，否则计算延迟
      if (data.ping) {
        latency.value = data.ping
      } else {
        // 计算从请求开始到结束的时间作为延迟估算
        latency.value = endTime - startTime
      }
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

// 当状态变化时，如果在线就测量延迟
watch(() => status.value?.online, (online) => {
  if (online) {
    setTimeout(measureLatency, 100)
  }
})

onMounted(() => {
  fetchStatus()
})
</script>

<style scoped>
.capsule-status {
  display: inline-block;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin-top: 3rem;       /* 添加上边距 */
  margin-bottom: 2rem;    /* 添加下边距 */
}

.capsule-container {
  position: relative;
  min-width: 200px;
  min-height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  padding: 12px 20px 12px 16px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  overflow: hidden;
}

.capsule-container.online {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
}

.capsule-container.offline {
  background: linear-gradient(135deg, #718096 0%, #4a5568 100%);
  box-shadow: 0 4px 20px rgba(113, 128, 150, 0.3);
}

.capsule-container.loading {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.loading-content {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.capsule-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
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
  gap: 12px;
  color: #fed7d7;
  font-size: 14px;
  font-weight: 500;
}

.error-icon {
  font-size: 18px;
  line-height: 1;
}

.status-content {
  width: 100%;
  color: white;
}

.status-main {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.server-icon {
  font-size: 20px;
  line-height: 1;
  background: rgba(255, 255, 255, 0.2);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.server-info {
  flex: 1;
  min-width: 0;
}

.server-name {
  display: block;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
}

.status-text {
  font-size: 12px;
  font-weight: 500;
  padding: 2px 10px;
  border-radius: 10px;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-text.online {
  background: rgba(34, 197, 94, 0.2);
  color: #86efac;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.status-text.offline {
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.status-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 8px 0 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.detail-label {
  font-size: 10px;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 12px;
  font-weight: 600;
  font-family: 'Monaco', 'Consolas', monospace;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 50px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
}

/* 延迟颜色样式 */
.ping-good {
  color: #86efac;
  background: rgba(34, 197, 94, 0.2) !important;
  border-color: rgba(34, 197, 94, 0.3) !important;
}

.ping-medium {
  color: #fde047;
  background: rgba(234, 179, 8, 0.2) !important;
  border-color: rgba(234, 179, 8, 0.3) !important;
}

.ping-bad {
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.2) !important;
  border-color: rgba(239, 68, 68, 0.3) !important;
}

.ping-na {
  opacity: 0.7;
}

.status-indicator {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 0 8px currentColor;
}

.status-indicator.online {
  background: #4ade80;
  color: #4ade80;
  animation: glow 2s infinite;
}

.status-indicator.offline {
  background: #f87171;
  color: #f87171;
}

@keyframes glow {
  0%, 100% { 
    opacity: 1;
    box-shadow: 0 0 8px currentColor;
  }
  50% { 
    opacity: 0.6;
    box-shadow: 0 0 12px currentColor;
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .capsule-container {
    min-width: 180px;
    padding: 10px 16px 10px 12px;
  }
  
  .server-icon {
    width: 32px;
    height: 32px;
    font-size: 18px;
  }
  
  .server-name {
    font-size: 12px;
  }
  
  .status-details {
    gap: 6px;
  }
  
  .detail-value {
    font-size: 11px;
    min-width: 45px;
  }
}
</style>