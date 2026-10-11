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
          <q-td key="name" :props="props">
            {{ props.row.users.fullname }}
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
          <q-td key="action" :props="props">
            <q-btn @click="confirmDialog(props.row.transactionID)" label="confirm" color="primary" unelevated no-caps icon="check"/>
          </q-td>
          </q-tr>
          </template>
          </q-table>
  </q-page>
</template>
<script setup>
import { Notify, useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import { formatPrice } from 'src/helper/FormatPrice'
import { onMounted, ref } from 'vue'

const columns = [
  { name: 'transactionID', align: 'left', label: 'Transaction ID', field: 'transactionID', sortable: true },
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
  { name: 'movie', align: 'left', label: 'Movie', field: 'movie', sortable: true },
  { name: 'jumlah', align: 'left', label: 'Jumlah', field: 'jumlah', sortable: true },
  { name: 'harga', align: 'left', label: 'Harga', field: 'harga', sortable: true },
  { name: 'total', align: 'left', label: 'Total', field: 'total', sortable: true },
  { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
  { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: true }

]
const rows = ref([])
const loading = ref(true)
const q = useQuasar()

onMounted(() => getData())

const getData = async () => {
  try {
    loading.value = true
    const res = await api.get('transaction/get-all')
    rows.value = res.data.data
  } finally {
    loading.value = false
  }
}

const confirmDialog = (id) => {
  q.dialog({
    title: 'Confirm',
    message: 'Would you like to confirm this transaction?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      const res = await api.put(`transaction/confirm-transaction/${id}`)
      Notify.create({
        message: res.data.msg,
        color: 'positive'
      })
      getData()
    } catch (error) {

    }
  })
}
</script>
