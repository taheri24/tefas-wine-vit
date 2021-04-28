<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {useAsync} from '~/core'
const name = ref('')
const router = useRouter()
const go = () => {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}
const delay=(ms: number )=>{
  return new Promise(resolve=>{
    setTimeout(resolve,ms)
  })
}
const api={  
  async sayHello(person:string): string{
    await delay(2000);
  return `Hello:${person}`;
}
}
const [sayHelloTo,isLoading,sayHello]=useAsync(api.sayHello);
const { t } = useI18n()
</script>

<template>
<div :v-loading="true">
<h1 style="font-size:64px">{{sayHelloTo || 'click to below buttons'}}</h1>
<h3>
</h3>
<p>
  we use func 2sec delay for show loading
</p>
<el-button type="primary" @click="sayHello('Majid')">Hello#1</el-button>
<el-button type="danger" @click="sayHello('Mohamand(or ali) in Every Family')">Hello#2</el-button>
<el-button type="default" @click="sayHello('Negarin & Negin')">Hello#3</el-button>
<el-button type="danger" @click="sayHello('Mohamand(or ali) in Every Family')">Hello#2</el-button>

  <div v-loading="loading">
    <p class="text-4xl">
      <carbon-campsite class="inline-block" />
    </p>
    <p>

      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        VitesseXX
      </a>
    </p>
    <p>
      <em class="text-sm opacity-75">{{ t('intro.desc') }}</em>
    </p>

    <div class="py-4" />

    <el-input
      id="input"
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      :aria-label="t('intro.whats-your-name')"
      type="text"
      autocomplete="false"
      class="px-4 py-2 text-sm text-center bg-transparent border border-gray-200 rounded outline-none active:outline-none dark:border-gray-700"
      style="width: 250px"
      @keydown.enter="go"
   />
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <el-button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </el-button>
    </div>
  </div>
</div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

 