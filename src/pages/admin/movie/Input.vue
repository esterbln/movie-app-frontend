<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6 q-mb-md">Form Input Movie</div>
        <q-form @submit="onSubmit">
         <q-input
         v-model="form.title"
         label="Title"
         outlined
         dense
         :rules="[val => val !== '' || 'Mohon Isi']"
         />
         <q-input
         v-model="form.price"
         label="Price"
         outlined
         dense
         :rules="[val => val > 0 || 'Mohon Isi']"
         />
         <q-select
         v-model="genreSelected"
         :options="listGenre"
         label="Pilih Genre"
         outlined
         dense
         option-value="idGenre"
         option-label="name"
         :rules="[val => val || 'Mohon Pilih']"
         />
         <q-input
         v-model="form.rating"
         label="Rating"
         outlined
         dense
         :rules="[val => val > 0 && val <= 5 || 'Mohon Isi Rating']"
         />
         <q-input
         v-model="form.description"
         label="Desription"
         outlined
         dense
         type="textarea"
         :rules="[val => val !== '' || 'Mohon isi']"
         />
        <q-file accept=".jpg, image/*" outlined v-model="image" label="Poster Image" :rules="[val => val !== null || 'Mohon Pilih']">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
         <q-btn type="submit" label="Simpan" unelevated color="primary" no-caps/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { Notify } from 'quasar'
import { api } from 'src/boot/axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const form = ref({
  title: '',
  price: 0,
  genre: 0,
  rating: 0,
  description: ''
})
const genreSelected = ref(null)
const listGenre = ref([])
const image = ref(null)
const router = useRouter()

onMounted(() => {
  getGenre()
})

const getGenre = async () => {
  try {
    const res = await api.get('genre/get')
    if (res.data.status) {
      listGenre.value = res.data.data
    }
  } catch (error) {
    Notify.create({
      message: 'Terjadi Kesalahan',
      color: 'negative'
    })
  }
}

const onSubmit = async () => {
  try {
    form.value.genre = genreSelected.value.idGenre
    const formData = new FormData()
    formData.append('image', image.value)
    formData.append('data', JSON.stringify(form.value))
    const res = await api.post('movie/insert', formData)
    if (res.data.status) {
      Notify.create({
        message: res.data.msg,
        color: 'positive'
      })
      router.back()
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
}

</script>
