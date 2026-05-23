<template>
  <div class="liquid-container">
    <div class="container glass-shell">
      <div class="top">
        <!-- 主按钮 -->
        <div class="box start-btn glass-surface" style="--gw: 205px;--gh: 48px;--gr: 24px;--gtr: 15%;" @click="handleBtnClick">
          <span>{{ text }}</span>
          <div class="btn-icon">
            <slot name="icon">
              <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M779.180132 473.232045 322.354755 16.406668c-21.413706-21.413706-56.121182-21.413706-77.534887 0-21.413706 21.413706-21.413706 56.122205 0 77.534887l418.057421 418.057421L244.819868 930.057421c-21.413706 21.413706-21.413706 56.122205 0 77.534887 10.706853 10.706853 24.759917 16.059767 38.767955 16.059767s28.061103-5.353938 38.767955-16.059767L779.180132 550.767955C800.593837 529.35425 800.593837 494.64575 779.180132 473.232045z" />
              </svg>
            </slot>
          </div>
          <div class="circle-overlay"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { withBase } from 'vitepress'

const props = defineProps({
  text: {
    type: String,
    default: 'Get started',
  },
  link: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['btn-click'])

const handleBtnClick = () => {
  if (props.link) {
    window.location.href = withBase(props.link)
  }
  emit('btn-click')
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
  text-decoration: none;
  transition: 0.25s;
}

.liquid-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
}

.container {
  display: flex;
  flex-direction: column;
}

.top {
  display: flex;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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

.start-btn {
  height: var(--gh);
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.start-btn span {
  font-size: 18px;
  font-family: "微软雅黑", serif;
  color: #3e3e3e;
}

.btn-icon {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3e3e3e;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
}

.btn-icon svg {
  width: 14px;
  fill: #f5f5f5;
}


</style>
