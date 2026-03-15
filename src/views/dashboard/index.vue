<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stat-cards">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <div class="stat-title">用户总数</div>
              <div class="stat-value">{{ overview.userCount }}</div>
            </div>
            <div class="stat-icon" style="background-color: #409eff20">
              <el-icon :size="40" color="#409eff"><User /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <div class="stat-title">角色数量</div>
              <div class="stat-value">{{ overview.roleCount }}</div>
            </div>
            <div class="stat-icon" style="background-color: #67c23a20">
              <el-icon :size="40" color="#67c23a"><UserFilled /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <div class="stat-title">访问量</div>
              <div class="stat-value">{{ overview.visitCount }}</div>
            </div>
            <div class="stat-icon" style="background-color: #e6a23c20">
              <el-icon :size="40" color="#e6a23c"><View /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <div class="stat-title">订单数量</div>
              <div class="stat-value">{{ overview.orderCount }}</div>
            </div>
            <div class="stat-icon" style="background-color: #f56c6c20">
              <el-icon :size="40" color="#f56c6c"><ShoppingCart /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :xs="24" :lg="16">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <span>访问趋势</span>
          </template>
          <div ref="trendChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="8">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <span>访问来源</span>
          </template>
          <div ref="categoryChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { User, UserFilled, View, ShoppingCart } from "@element-plus/icons-vue";
import * as echarts from "echarts";
import { getOverview, getTrend, getCategory } from "@/api/dashboard";
import type { DashboardOverview, TrendItem, CategoryItem } from "@/types";

const overview = ref<DashboardOverview>({
  userCount: 0,
  roleCount: 0,
  visitCount: 0,
  orderCount: 0,
});

const trendChartRef = ref<HTMLElement>();
const categoryChartRef = ref<HTMLElement>();
let trendChart: echarts.ECharts | null = null;
let categoryChart: echarts.ECharts | null = null;

// 获取概览数据
const fetchOverview = async () => {
  overview.value = await getOverview();
};

// 初始化趋势图表
const initTrendChart = async () => {
  if (!trendChartRef.value) return;

  const data = await getTrend();

  trendChart = echarts.init(trendChartRef.value);
  trendChart.setOption({
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: data.map((item: TrendItem) => item.date.slice(5)),
      axisLine: {
        lineStyle: {
          color: "#dcdfe6",
        },
      },
      axisLabel: {
        color: "#606266",
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: "#606266",
      },
      splitLine: {
        lineStyle: {
          color: "#ebeef5",
        },
      },
    },
    series: [
      {
        name: "访问量",
        type: "line",
        smooth: true,
        data: data.map((item: TrendItem) => item.value),
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(64, 158, 255, 0.3)" },
            { offset: 1, color: "rgba(64, 158, 255, 0.05)" },
          ]),
        },
        lineStyle: {
          color: "#409eff",
        },
        itemStyle: {
          color: "#409eff",
        },
      },
    ],
  });
};

// 初始化分类图表
const initCategoryChart = async () => {
  if (!categoryChartRef.value) return;

  const data = await getCategory();

  categoryChart = echarts.init(categoryChartRef.value);
  categoryChart.setOption({
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "5%",
      left: "center",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data.map((item: CategoryItem) => ({
          name: item.name,
          value: item.value,
        })),
      },
    ],
  });
};

// 窗口大小变化时重绘图表
const handleResize = () => {
  trendChart?.resize();
  categoryChart?.resize();
};

onMounted(async () => {
  await fetchOverview();
  await initTrendChart();
  await initCategoryChart();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  trendChart?.dispose();
  categoryChart?.dispose();
});
</script>

<style scoped lang="scss">
.dashboard {
  .stat-cards {
    margin-bottom: 20px;
  }

  .stat-card {
    margin-bottom: 20px;
  }

  .stat-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .stat-info {
    .stat-title {
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 10px;
    }

    .stat-value {
      font-size: 28px;
      font-weight: 600;
      color: var(--text-primary);
    }
  }

  .stat-icon {
    width: 70px;
    height: 70px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chart-row {
    margin-top: 20px;
  }

  .chart-card {
    margin-bottom: 20px;
  }

  .chart-container {
    height: 300px;
  }
}
</style>
