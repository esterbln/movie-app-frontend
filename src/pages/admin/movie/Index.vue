<template>
  <q-page padding>
    <q-table
      flat
      bordered
      title="Master Movie"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:top-right>
      <q-btn :to="{name: 'inputDataMovieAdmin'}" label="Tambah" uneleveted icon="add" no-caps color="primary"/>
    </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="title" :props="props">
            {{ props.row.title }}
          </q-td>
          <q-td key="price" :props="props">
              {{ props.row.price }}
          </q-td>
          <q-td key="rating" :props="props">
            <q-rating
                v-model="props.row.rating"
                size="1.8em"
                color="orange"
                readonly
                max="5"
              />
          </q-td>
          <q-td key="desc" :props="props">
            <div class="ellipsis" style="width: 5em;">
              {{ props.row.description }}
            </div>
          </q-td>
            <q-td key="image" :props="props">
              <q-img
              :src="`${baseURL}/img/movie/${props.row.image}`"
              />
          </q-td>
          <q-td key="action" :props="props">
            <div class="row q-gutter-x-sm">
              <q-btn :to="{name:'editDataMovieAdmin', params: {id: props.row.idMovie}}" label="Edit" color="warning" unelevated icon="edit" no-caps/>
              <q-btn @click="deleteMovie(props.row.idMovie)" label="Delete" color="negative" unelevated icon="delete" no-caps/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
<script setup>
import { Notify, useQuasar } from 'quasar'
import { api, baseURL } from 'src/boot/axios'
import { onMounted, ref } from 'vue'

const rows = ref([])
const columns = [
  { name: 'title', align: 'left', label: 'Title', field: 'title', sortable: true },
  { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
  { name: 'rating', align: 'left', label: 'Rating', field: 'rating', sortable: true },
  { name: 'desc', align: 'left', label: 'Desc', field: 'desc', sortable: true },
  { name: 'image', align: 'left', label: 'Image', field: 'image', sortable: true },
  { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: true }
]
const q = useQuasar()

onMounted(() => getData())

const getData = async () => {
  try {
    const res = await api.get('movie/get-all')
    if (res.data.status) {
      rows.value = res.data.data
    }
  } catch (error) {

  }
}

const deleteMovie = (id) => {
  q.dialog({
    title: 'Confirm',
    message: 'Would you like to delete this data?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      const res = await api.delete(`movie/delete/${id}`)
      if (res.data.status) {
        Notify.create({
          message: res.data.msg,
          color: 'positive'
        })
        getData()
      } else {
        Notify.create({
          message: res.data.msg,
          color: 'negative'
        })
      }
    } catch (error) {
      Notify.create({
        message: 'Terjadi Kesalahan',
        color: 'negative'
      })
    }
  })
}
</script>
