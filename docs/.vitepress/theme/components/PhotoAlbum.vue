<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  categories: { type: Array, required: true, default: () => [] },
})

/* ── 响应式状态 ── */
const activeCategory = ref('')
const activeEvent = ref(null)
const lightboxImage = ref(null)
const isMobile = ref(false)

/* ── 计算属性 ── */
const currentCategory = computed(() =>
  props.categories.find(c => c.name === activeCategory.value)
)
const currentEvents = computed(() => currentCategory.value?.events || [])
const currentImages = computed(() => activeEvent.value?.images || [])

/* ── 玻璃卡片扇形旋转角度 ── */
function getRotation(index, total) {
  const step = Math.min(18, 50 / Math.max(total - 1, 1))
  const center = (total - 1) / 2
  return Math.round((index - center) * step)
}

/* ── 选择分类 ── */
function selectCategory(name) {
  if (activeCategory.value === name) return
  activeCategory.value = name
  activeEvent.value = null
}

/* ── 选择事件 ── */
function selectEvent(event) {
  activeEvent.value = event
}

/* ── 移动端检测 ── */
function checkMobile() {
  isMobile.value = window.innerWidth < 768
}
let resizeTimer = null
function onResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(checkMobile, 150)
}

/* ── 灯箱 ── */
function openLightbox(src) {
  lightboxImage.value = src
  document.body.style.overflow = 'hidden'
}
function closeLightbox() {
  lightboxImage.value = null
  document.body.style.overflow = ''
}
function onKeydown(e) {
  if (e.key === 'Escape') closeLightbox()
}

/* ── 初始化 ── */
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKeydown)

  if (props.categories.length > 0) {
    activeCategory.value = props.categories[0].name
    const events = props.categories[0].events
    if (events && events.length > 0) {
      activeEvent.value = events[0]
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="photo-album">
    <!-- ============ 分类选择器（uiverse.io "ugly-lion-23" 玻璃卡片） ============ -->
    <section class="cat-section">
      <div class="cat-container">
        <div
          v-for="(cat, idx) in categories"
          :key="cat.name"
          :data-text="cat.name"
          :style="{ '--r': getRotation(idx, categories.length) }"
          :class="['cat-glass', { active: activeCategory === cat.name }]"
          @click="selectCategory(cat.name)"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- ============ 事件列表 ============ -->
    <section class="event-section">
      <div class="event-list">
        <div
          v-for="event in currentEvents"
          :key="event.name"
          :class="['event-card', { active: activeEvent?.name === event.name }]"
          @click="selectEvent(event)"
        >
          <div class="event-cover-wrap">
            <img
              :src="event.cover"
              :alt="event.name"
              class="event-cover"
              loading="lazy"
            />
            <div class="event-cover-shine"></div>
          </div>
          <div class="event-meta">
            <span class="event-name">{{ event.name }}</span>
            <span class="event-date">{{ event.date }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 图片展示区 ============ -->
    <section v-if="currentImages.length" class="gallery-section">
      <div class="gallery-scroll" :class="{ vertical: isMobile }">
        <div
          v-for="(img, idx) in currentImages"
          :key="idx"
          class="gallery-item"
          @click="openLightbox(img)"
        >
          <img :src="img" :alt="`Photo ${idx + 1}`" loading="lazy" />
          <div class="gallery-zoom-hint">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- 空状态 -->
    <section v-else class="gallery-section gallery-empty">
      <div class="empty-hint">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21,15 16,10 5,21"/>
        </svg>
        <span>选择一个事件以查看照片</span>
      </div>
    </section>

    <!-- ============ 灯箱 ============ -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="lightboxImage" class="lightbox-overlay" @click="closeLightbox">
          <button class="lightbox-close" @click="closeLightbox" aria-label="关闭">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          <img :src="lightboxImage" class="lightbox-img" @click.stop />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* ================================================================
   PhotoAlbum — 服务器相册
   ================================================================ */

.photo-album {
  --album-bg: rgba(255,255,255,0.2);
  --album-border: rgba(255,255,255,0.45);
  --card-bg: rgba(255,255,255,0.55);
  --card-hover-bg: rgba(255,255,255,0.75);
  --card-shadow: 0 1px 4px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);
  --card-hover-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06);

  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1.5rem 4rem;
  gap: 2rem;
}

/* ================================================================
   1. 分类选择器 — uiverse.io "ugly-lion-23" 玻璃卡片
   ================================================================ */
.cat-section {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem 0 0.75rem;
}

.cat-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
}

.cat-glass {
  position: relative;
  width: 150px;
  height: 170px;
  background: linear-gradient(rgba(255,255,255,0.25), transparent);
  border: 1px solid rgba(255,255,255,0.35);
  box-shadow: 0 25px 25px rgba(0,0,0,0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  margin: 0 -40px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transform: rotate(calc(var(--r) * 1deg));
  cursor: pointer;
  color: var(--vp-c-text-1);
}

.cat-glass svg {
  width: 2.8em;
  height: 2.8em;
  transition: transform 0.4s ease;
}

/* Hover — 所有卡片展开对齐 */
.cat-container:hover .cat-glass {
  transform: rotate(0deg);
  margin: 0 10px;
}

.cat-container:hover .cat-glass svg {
  transform: scale(1.08);
}

/* 激活态 — 品牌色边框发光 */
.cat-glass.active {
  border-color: var(--vp-c-brand-1);
  box-shadow:
    0 0 0 1px var(--vp-c-brand-1),
    0 0 20px rgba(107,174,62,0.25),
    0 25px 25px rgba(0,0,0,0.15);
  z-index: 2;
}

.cat-glass.active svg {
  color: var(--vp-c-brand-1);
}

/* 底部标签 — 通过 data-text 属性显示 */
.cat-glass::before {
  content: attr(data-text);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 36px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--vp-c-text-1);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 8px;
  box-sizing: border-box;
  border-radius: 0 0 12px 12px;
  transition: background 0.5s ease, color 0.5s ease;
}

.cat-glass.active::before {
  background: rgba(107,174,62,0.18);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

/* ================================================================
   2. 事件列表
   ================================================================ */
.event-section {
  width: 100%;
  max-width: 1100px;
}

.event-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  padding: 0.5rem 0;
}

.event-card {
  flex: 0 0 auto;
  width: 200px;
  background: var(--card-bg);
  backdrop-filter: blur(16px) saturate(130%);
  -webkit-backdrop-filter: blur(16px) saturate(130%);
  border: 1px solid var(--album-border);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--card-shadow);
}

.event-card:hover {
  transform: translateY(-3px);
  background: var(--card-hover-bg);
  box-shadow: var(--card-hover-shadow);
  border-color: rgba(107,174,62,0.25);
}

.event-card.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 2px rgba(107,174,62,0.35), var(--card-shadow);
  background: var(--card-hover-bg);
}

/* 封面图容器 */
.event-cover-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: rgba(128,128,128,0.06);
}

.event-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.event-card:hover .event-cover {
  transform: scale(1.06);
}

/* 封面高光 */
.event-cover-shine {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.3) 0%,
    transparent 40%,
    transparent 75%,
    rgba(255,255,255,0.08) 100%
  );
}

/* 事件信息 */
.event-meta {
  padding: 0.75rem 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.event-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-date {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  font-weight: 400;
}

/* ================================================================
   3. 图片展示区
   ================================================================ */
.gallery-section {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.gallery-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.empty-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
  opacity: 0.7;
}

.gallery-scroll {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: 0.25rem 0 1rem;
  /* 自定义滚动条在外层容器 */
  scrollbar-width: thin;
  scrollbar-color: rgba(128,128,128,0.2) transparent;
}

/* 移动端 — 垂直滚动 */
.gallery-scroll.vertical {
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 70vh;
}

.gallery-scroll::-webkit-scrollbar {
  height: 6px;
}
.gallery-scroll::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 3px;
}
.gallery-scroll::-webkit-scrollbar-thumb {
  background: rgba(128,128,128,0.2);
  border-radius: 3px;
}

.gallery-scroll.vertical::-webkit-scrollbar {
  width: 4px;
  height: auto;
}

.gallery-item {
  position: relative;
  flex: 0 0 auto;
  height: 380px;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.4);
  box-shadow: 0 1px 4px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(128,128,128,0.04);
}

.gallery-item:hover {
  transform: scale(1.015);
  box-shadow: 0 2px 8px rgba(107,174,62,0.1), 0 8px 24px rgba(0,0,0,0.06);
  border-color: rgba(107,174,62,0.3);
}

.gallery-item img {
  width: auto;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery-item:hover img {
  transform: scale(1.04);
}

/* 移动端 — 垂直滚动时图片全宽 */
.gallery-scroll.vertical .gallery-item {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
}

.gallery-scroll.vertical .gallery-item img {
  width: 100%;
  height: 100%;
}

/* 缩放提示 */
.gallery-zoom-hint {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;
}

.gallery-item:hover .gallery-zoom-hint {
  opacity: 1;
  transform: scale(1);
}

/* ================================================================
   4. 灯箱
   ================================================================ */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 10;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  transition: all 0.25s ease;
}

.lightbox-close:hover {
  background: rgba(255,255,255,0.2);
  transform: scale(1.1);
}

.lightbox-img {
  max-width: 92vw;
  max-height: 92vh;
  object-fit: contain;
  border-radius: 6px;
  cursor: default;
  box-shadow: 0 4px 40px rgba(0,0,0,0.4);
}

/* 灯箱过渡 */
.lightbox-enter-active {
  transition: opacity 0.25s ease;
}
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
.lightbox-enter-active .lightbox-img {
  animation: lb-zoom-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes lb-zoom-in {
  from { transform: scale(0.9); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
}

/* ================================================================
   5. 响应式
   ================================================================ */
@media (max-width: 768px) {
  .photo-album {
    padding: 1rem 0.75rem 3rem;
    gap: 1.25rem;
  }

  .cat-container {
    padding: 0.25rem 0.5rem;
  }

  .cat-glass {
    width: 110px;
    height: 130px;
    margin: 0 -30px;
    border-radius: 10px;
  }

  .cat-glass svg {
    width: 2.2em;
    height: 2.2em;
  }

  .cat-glass::before {
    height: 30px;
    font-size: 0.72rem;
    border-radius: 0 0 10px 10px;
  }

  /* 移动端直接展开，不重叠 */
  .cat-container:hover .cat-glass,
  .cat-container .cat-glass {
    transform: rotate(0deg);
    margin: 0 4px;
  }

  .cat-section {
    padding: 0.5rem 0 0.25rem;
  }

  .event-list {
    gap: 0.75rem;
  }

  .event-card {
    width: 150px;
    border-radius: 12px;
  }

  .event-meta {
    padding: 0.55rem 0.65rem;
  }

  .event-name {
    font-size: 0.8rem;
  }

  .event-date {
    font-size: 0.7rem;
  }

  .gallery-item {
    height: 240px;
    border-radius: 10px;
  }

  .gallery-scroll.vertical .gallery-item {
    border-radius: 10px;
  }

  .lightbox-close {
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .photo-album {
    padding: 0.75rem 0.5rem 2.5rem;
    gap: 1rem;
  }

  .cat-glass {
    width: 90px;
    height: 110px;
    margin: 0 -12px;
  }

  .cat-glass svg {
    width: 1.8em;
    height: 1.8em;
  }

  .cat-glass::before {
    height: 26px;
    font-size: 0.68rem;
  }

  .cat-container:hover .cat-glass,
  .cat-container .cat-glass {
    margin: 0 2px;
  }

  .event-card {
    width: 130px;
  }

  .gallery-scroll {
    gap: 0.5rem;
  }
}
</style>
