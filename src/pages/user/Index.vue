<template>
  <q-page padding>
    <div class="text-h6 text-blue-grey-14">List Movie For You</div>
    <div class="row q-mt-md">
      <div class="col-4" v-for="(data, i) in datas" :key="i">
      <q-card flat>
        <q-img :src="`${baseURL}/img/movie/${data.image}`"/>
        <q-card-section>
          <div class="text-body1">{{ data.title }}</div>
          <div>
            <q-rating
                v-model="data.rating"
                size="1.8em"
                color="orange"
                readonly
                max="5"
            />
          </div>
          <div class="text-bold">{{ formatPrice(data.price) }}</div>
          <div class="text-body2">{{ data.genre_movie_genreTogenre.name }}</div>
          <div class="text- caption ellipsis-2-lines">{{ data.description }}</div>
          <div class="row q-mt-sm justify-between q-gutter-x-sm">
            <q-btn @click="openDialog(data)" class="col-9" label="Buy Now" outline icon="shopping_bag"/>
            <q-btn class="col-2" unelevated color="dark" outline icon="share"/>
          </div>
        </q-card-section>
      </q-card>
      </div>
    </div>
    <q-dialog
      v-model="dialogTransaction"
      v-if="activeData !== null"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Transaction</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-form ref="formTransaction" @submit="onSubmit">
              <div>{{ activeData.title }} - {{ activeData.price }}</div>
              <q-input
              v-model="jumlah"
              :rules="[
                val => val > 0 || 'Mohon isi dengan benar'
              ]"
              />
              <div class="q-mt-sm">Total {{ jumlah * activeData.price }}</div>
            </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat color="primary" label="Cancel" v-close-popup />
          <q-btn unelevated label="Save" @click="formTransaction.submit()" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import { Notify } from 'quasar'
import { api, baseURL } from 'src/boot/axios'
import { formatPrice } from 'src/helper/FormatPrice'
import { getProfile } from 'src/helper/Profile'
import { onMounted, ref } from 'vue'

const datas = ref([])
const dialogTransaction = ref(false)
const activeData = ref(null)
const jumlah = ref(0)
const formTransaction = ref()

onMounted(() => getData())

const getData = async () => {
  try {
    const res = await api.get('movie/get-all')
    datas.value = res.data.data
  } catch (error) {

  }
}

const openDialog = (data) => {
  activeData.value = data
  dialogTransaction.value = true
}

const onSubmit = async (data) => {
  try {
    const res = await api.post('transaction/insert', {
      userID: getProfile().username,
      movieID: activeData.value.idMovie,
      harga: activeData.value.price,
      jumlah: jumlah.value,
      total: activeData.value.price * jumlah.value
    })
    if (res.data.status) {
      Notify.create({
        message: res.data.msg,
        color: 'positive'
      })
      dialogTransaction.value = false
    }
    console.log(res)
  } catch (error) {

  }
}
</script>
