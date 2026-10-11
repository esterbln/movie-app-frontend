<template>
  <q-page padding>
    <q-table
      flat
      bordered
      title="Your Transaction"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :loading="loading"
    >
      <template v-slot:body="props">
       <q-tr :props="props">
          <q-td key="transactionID" :props="props">
            {{ props.row.transactionID }}
          </q-td>
          <q-td key="movie" :props="props">
              {{ props.row.movie.title }}
          </q-td>
          <q-td key="jumlah" :props="props">
              {{ props.row.jumlah }}
          </q-td>
          <q-td key="harga" :props="props">
              {{ formatPrice(props.row.harga) }}
          </q-td>
          <q-td key="total" :props="props">
              {{ formatPrice(props.row.total) }}
          </q-td>
          <q-td key="status" :props="props">
            <q-badge class="q-pa-sm" :color="props.row.status === 1 ? 'negative' : 'positive'">
              {{ props.row.status === 1 ? 'Unconfirmed' : 'Confirmed' }}
            </q-badge>
          </q-td>
          </q-tr>
          </template>
          </q-table>
  </q-page>
</template>
<script setup>
import { api } from 'src/boot/axios'
import { formatPrice } from 'src/helper/FormatPrice'
import { getProfile } from 'src/helper/Profile'
import { onMounted, ref } from 'vue'

const columns = [
  { name: 'transactionID', align: 'left', label: 'Transaction ID', field: 'transactionID', sortable: true },
  { name: 'movie', align: 'left', label: 'Movie', field: 'movie', sortable: true },
  { name: 'jumlah', align: 'left', label: 'Jumlah', field: 'jumlah', sortable: true },
  { name: 'harga', align: 'left', label: 'Harga', field: 'harga', sortable: true },
  { name: 'total', align: 'left', label: 'Total', field: 'total', sortable: true },
  { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true }
]
const rows = ref([])
const loading = ref(true)

onMounted(() => getData())

const getData = async () => {
  try {
    loading.value = true
    const res = await api.get(`transaction/get/${getProfile().username}`)
    rows.value = res.data.data
  } finally {
    loading.value = false
  }
}
</script>
