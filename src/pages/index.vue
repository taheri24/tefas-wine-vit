
<template>

</template>
<script lang="ts" setup>
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
const router= useRouter();
onMounted( function (){ 
    router.replace('/dashboard');
});
</script>