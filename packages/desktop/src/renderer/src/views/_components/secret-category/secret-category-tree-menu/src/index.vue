<script lang="ts" setup>
import { useCssVar } from '@renderer/shared'
import type { ThemeConfig, MenuProps, ItemType, CSSProperties } from '@renderer/shared/deps'
import { useSecretCategoryStore } from '@renderer/stores'

defineOptions({ name: 'SecretCategoryTreeMenu', inheritAttrs: false })

const { layoutLeftBgColor } = useCssVar()

const secretCategoryStore = useSecretCategoryStore()
onMounted(() => {
  secretCategoryStore.loadCategoryList()
})

const selectedKeys = ref<string[]>(['1'])
const openKeys = ref<string[]>(['sub1'])

const items = computed((): ItemType[] => {
  return []
})

const menuStyle = computed<CSSProperties>(() => {
  return {
    backgroundColor: layoutLeftBgColor
    // textAlign: 'center'
  }
})

const configTheme: ThemeConfig = {
  components: {
    Menu: {
      colorPrimary: '#00b96b',
      colorItemBg: layoutLeftBgColor,
      colorSubItemBg: layoutLeftBgColor,
      colorItemBgSelected: 'red'
    }
  }
}

const onClick: MenuProps['onClick'] = () => {}
</script>

<template>
  <div class="secret-category-tree-menu">
    <a-config-provider :theme="configTheme">
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        :style="menuStyle"
        mode="inline"
        theme="dark"
        :items="items"
        @click="onClick"
      ></a-menu>
    </a-config-provider>
  </div>
</template>

<style lang="scss" scoped>
.secret-category-tree-menu {
  min-height: 450px;
  height: calc(100vh - 220px);
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
