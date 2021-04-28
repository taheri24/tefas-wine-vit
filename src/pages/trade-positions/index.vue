
<script lang="ts" setup>
  import { tradePositionAPI } from "~/api/trade-positions";
  import { useQueryByCRUD } from "~/core";
  const  queryResult =useQueryByCRUD(tradePositionAPI) 
  </script> 
<template>
  <el-table
  :v-loading="true"
      :data="queryResult.pagedData"
      style="width: 100%">
      <el-table-column type="expand">
      <template #default="props">
        <p>State: {{ props.row.state }}</p>
        <p>City: {{ props.row.city }}</p>
        <p>Address: {{ props.row.address }}</p>
        <p>Zip: {{ props.row.zip }}</p>
      </template>
    </el-table-column>
      <el-table-column
        prop="date"
        label="Date"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="Address">
      </el-table-column>
    </el-table>
</template>

<route lang="yaml">
meta:
    layout: home
</route>