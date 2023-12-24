<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        active-text-color="#ffd04b"
        router
        background-color="#545c64"
        class="el-menu-vertical-demo"
        text-color="#fff"
      >
        <template
          v-for="item in store.menuList"
          :key="item.id"
        >
          <!--如果有子菜单 -> 渲染当前父级菜单 -->
          <el-sub-menu
            v-if="item.children.length"
            :index="item.menu_path"
          >
            <template #title>{{ item.menu_name }}</template>
            <!-- 渲染当前父级菜单的子菜单 -->
            <el-menu-item
              v-for="childMenu in item.children"
              :key="childMenu.id"
              :index="childMenu.menu_path"
            >
              <span>{{ childMenu.menu_name }}</span>
            </el-menu-item>
          </el-sub-menu>

          <!-- 如果没子菜单 -> 只渲染当前顶级菜单 -->
          <el-menu-item
            v-else
            :index="item.menu_path"
          >
            <span>{{ item.menu_name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <h1>码农商城</h1>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { useUserMenuStore } from "@/stores/useUserMenu"

// 获取用户菜单
const store = useUserMenuStore()
store.getUserMenu()
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  background: #545c64;
}
</style>
