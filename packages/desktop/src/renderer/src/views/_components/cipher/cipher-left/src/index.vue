<script lang="ts" setup>
import { useNamespace, useCssVar } from '@renderer/shared'
import SecretBookSearch from '@renderer/views/_components/secret-book/secret-book-search'
import SecretBookTitle from '@renderer/views/_components/secret-book/secret-book-title'
import SecretBookList from '@renderer/views/_components/secret-book/secret-book-list'

defineOptions({ name: 'CipherLeft', inheritAttrs: false })

const { b } = useNamespace('cipher-left')
const { cipherLeftWidth, cipherLeftBgColor } = useCssVar()
const getClass = computed(() => {
  return [b()]
})

const siderProps = computed(() => {
  return {
    width: cipherLeftWidth
  }
})
</script>

<template>
  <a-layout-sider :class="getClass" v-bind="siderProps">
    <secret-book-title />
    <secret-book-search />
    <secret-book-list />
  </a-layout-sider>
</template>

<style lang="scss" scoped>
.#{$b-ns}-cipher-left {
  height: '100%';
  background-color: v-bind('cipherLeftBgColor');
}
</style>
