<template>
  <a-spin :spinning="$store.state.common.gloableLoading">
    <router-view />
  </a-spin>
</template>
