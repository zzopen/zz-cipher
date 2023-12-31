<script lang="ts" setup>
import { useSecretBookStore, useRequestStore } from '@renderer/stores'
import type { DataSource } from './props'
import { defaultDataSource } from './props'
import EmptyState from '@renderer/views/_components/empty-state'
import { message, Modal, ExclamationCircleOutlined } from '@renderer/shared/deps'
import {
  listenerSearchSecretBookDetail,
  listenerLoadSecretBookList,
  emitLoadSecretBookList,
  emitOpenUpdateSecretBookDrawer
} from '@renderer/shared'

defineOptions({ name: 'SecretBookDetail', inheritAttrs: false })
const secretBookStore = useSecretBookStore()
const requestStore = useRequestStore()

const state = reactive<{ dataSource: DataSource; showEmptyStatus: boolean }>({
  dataSource: { ...defaultDataSource },
  showEmptyStatus: true
})

const reset = () => {
  state.showEmptyStatus = true
  state.dataSource = { ...defaultDataSource }
}

const ready = async (p: { secret_book_id: string }) => {
  await secretBookStore.loadSecretBook({ id: p.secret_book_id })
  if (!secretBookStore.apiSecretBook) {
    message.error('查询数据失败')
    state.showEmptyStatus = true
    return
  }

  state.dataSource = {
    id: secretBookStore.apiSecretBook.id,
    title: secretBookStore.apiSecretBook.title,
    website: secretBookStore.apiSecretBook.website,
    username: secretBookStore.apiSecretBook.username,
    password: secretBookStore.apiSecretBook.password,
    email: secretBookStore.apiSecretBook.email,
    mobile: secretBookStore.apiSecretBook.mobile,
    remark: secretBookStore.apiSecretBook.remark,
    secretCategoryId: secretBookStore.apiSecretBook.secretCategoryId ?? '',
    secretCategoryName: secretBookStore.apiSecretBook.secretCategoryName
  }

  state.showEmptyStatus = false
}

listenerLoadSecretBookList(reset)
listenerSearchSecretBookDetail(ready)

const onUpdate = () => {
  emitOpenUpdateSecretBookDrawer({ secret_book_id: state.dataSource.id })
}

const onDelete = () => {
  Modal.confirm({
    title: `确认要删除"${state.dataSource.title}"吗？`,
    icon: h(ExclamationCircleOutlined),
    content: h('div', { style: 'color:red;' }, '请谨慎选择'),
    cancelText: '取消',
    keyboard: false,
    okButtonProps: { danger: true },
    okText: '删除',
    async onOk() {
      const res = await requestStore.deleteSecretBook({ id: state.dataSource.id })
      if (!res) {
        message.error('删除失败')
        return Promise.reject('删除失败')
      } else {
        message.success('删除成功')
        emitLoadSecretBookList({ secret_category_id: state.dataSource.secretCategoryId })
        reset()
      }
    }
  })
}

const descriptionItemSpan = 3
</script>

<template>
  <div class="secret-book-detail">
    <empty-state v-if="state.showEmptyStatus" />
    <template v-else>
      <a-descriptions bordered size="small">
        <template #title>
          <div style="text-align: center">{{ state.dataSource.title }}</div>
        </template>
        <template #extra>
          <a-button type="primary" size="small" @click="onUpdate">修改</a-button>
          <a-button type="primary" size="small" danger @click="onDelete">删除</a-button>
        </template>
        <a-descriptions-item label="标题" :span="descriptionItemSpan"
          ><span>{{ state.dataSource.title }}</span>
          <xl-base-copy :text="state.dataSource.title" />
        </a-descriptions-item>
        <a-descriptions-item label="网址" :span="descriptionItemSpan"
          ><span>{{ state.dataSource.website }}</span>
          <xl-base-copy :text="state.dataSource.website"
        /></a-descriptions-item>
        <a-descriptions-item label="账号" :span="descriptionItemSpan">
          <span>{{ state.dataSource.username }}</span
          ><xl-base-copy :text="state.dataSource.username"
        /></a-descriptions-item>
        <a-descriptions-item label="密码" :span="descriptionItemSpan"
          ><span>{{ state.dataSource.password }}</span
          ><xl-base-copy :text="state.dataSource.password"
        /></a-descriptions-item>
        <a-descriptions-item label="所属分类" :span="descriptionItemSpan"
          ><a-tag color="processing">{{
            state.dataSource.secretCategoryName
          }}</a-tag></a-descriptions-item
        >
        <a-descriptions-item label="邮箱" :span="descriptionItemSpan">{{
          state.dataSource.email
        }}</a-descriptions-item>
        <a-descriptions-item label="手机号" :span="descriptionItemSpan">{{
          state.dataSource.mobile
        }}</a-descriptions-item>
        <a-descriptions-item label="备注" :span="descriptionItemSpan">{{
          state.dataSource.remark
        }}</a-descriptions-item>
      </a-descriptions>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
