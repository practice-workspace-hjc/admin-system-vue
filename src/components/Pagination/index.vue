<template>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[10, 20, 50, 100]"
    :total="total"
    :background="true"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  page: number
  pageSize: number
  total: number
}>()

const emit = defineEmits<{
  'update:page': [value: number]
  'update:pageSize': [value: number]
  change: []
}>()

const currentPage = computed({
  get: () => props.page,
  set: (val) => emit('update:page', val),
})

const pageSize = computed({
  get: () => props.pageSize,
  set: (val) => emit('update:pageSize', val),
})

const handleSizeChange = () => {
  emit('change')
}

const handleCurrentChange = () => {
  emit('change')
}
</script>

<style scoped lang="scss">
.el-pagination {
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
