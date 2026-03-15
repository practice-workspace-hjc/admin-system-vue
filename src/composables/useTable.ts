import { ref, reactive, computed } from 'vue'
import type { PageParams, PageResponse } from '@/types'

interface UseTableOptions<T, P extends PageParams> {
  fetchFn: (params: P) => Promise<PageResponse<T>>
  defaultPageSize?: number
}

export const useTable = <T, P extends PageParams>(options: UseTableOptions<T, P>) => {
  const { fetchFn, defaultPageSize = 10 } = options

  const loading = ref(false)
  const tableData = ref<T[]>([])
  const total = ref(0)
  const currentPage = ref(1)
  const pageSize = ref(defaultPageSize)

  const queryParams = reactive<Record<string, unknown>>({})

  const pagination = computed(() => ({
    page: currentPage.value,
    pageSize: pageSize.value,
    total: total.value,
  }))

  // 获取数据
  const fetchData = async () => {
    loading.value = true
    try {
      const params = {
        ...queryParams,
        page: currentPage.value,
        pageSize: pageSize.value,
      } as P

      const res = await fetchFn(params)
      tableData.value = res.list
      total.value = res.total
    } finally {
      loading.value = false
    }
  }

  // 搜索
  const handleSearch = () => {
    currentPage.value = 1
    fetchData()
  }

  // 重置
  const handleReset = () => {
    Object.keys(queryParams).forEach((key) => {
      delete queryParams[key]
    })
    currentPage.value = 1
    fetchData()
  }

  // 分页改变
  const handlePageChange = (page: number) => {
    currentPage.value = page
    fetchData()
  }

  // 每页条数改变
  const handleSizeChange = (size: number) => {
    pageSize.value = size
    currentPage.value = 1
    fetchData()
  }

  // 刷新当前页
  const refresh = () => {
    fetchData()
  }

  return {
    loading,
    tableData,
    total,
    currentPage,
    pageSize,
    queryParams,
    pagination,
    fetchData,
    handleSearch,
    handleReset,
    handlePageChange,
    handleSizeChange,
    refresh,
  }
}
