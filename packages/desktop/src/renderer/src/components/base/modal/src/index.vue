<script lang="ts" setup>
import { useNamespace } from '@renderer/components/_shared'
import { modalProps } from './props'
import { useVModel } from '@vueuse/core'

defineOptions({ name: 'XlBaseModal', inheritAttrs: false })

const props = defineProps(modalProps())
const emits = defineEmits(['update:open', 'ok', 'cancel'])
const openRef = useVModel(props, 'open', emits)

const { b } = useNamespace('base-modal')
const getClass = computed(() => {
  return [b()]
})

const handleOk = (event: Event) => {
  emits('ok', event)
}

const handleCancel = (event: Event) => {
  emits('cancel', event)
}
</script>

<template>
  <a-modal
    v-model:open="openRef"
    :class="getClass"
    :width="width"
    :title="title"
    :ok-text="okText"
    :cancel-text="cancelText"
    :destroy-on-close="true"
    :mask-closable="false"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <slot></slot>
  </a-modal>
</template>

<style lang="scss" scoped>
.#{$ns}-base-modal {
}
</style>
