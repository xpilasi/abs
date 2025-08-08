import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Composable to detect mobile devices
 * @returns {{ isMobile: import('vue').Ref<boolean> }}
 */
export function useMobile() {
  const isMobile = ref(false);

  const checkDevice = () => {
    isMobile.value = window.innerWidth < 768;
  };

  onMounted(() => {
    checkDevice();
    window.addEventListener('resize', checkDevice);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkDevice);
  });

  return { isMobile };
}
