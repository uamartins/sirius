<template>
  <v-card variant="outlined">
    <v-card-actions>
      <v-card-title v-if="title">
        <span class="text-h5 text-overline">{{ title }}</span>
      </v-card-title>
      <v-spacer />
      <v-btn
        class="text-overline text-none"
        rounded="xl"
        elevation="2"
        prepend-icon="mdi-check"
        :disabled="!valid"
        type="submit"
        form="entity-form"
      >
        Salvar
      </v-btn>
      <v-btn
        class="text-overline text-none"
        rounded="xl"
        elevation="2"
        prepend-icon="mdi-cancel"
        @click="emit('cancel')"
      >
        Cancelar
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <v-form v-model="valid" @submit.prevent="save" id="entity-form">
        <v-container grid-list-md>
          <slot></slot>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps(['title'])
const emit = defineEmits(['cancel', 'submit'])
const valid = ref(false)

function save() {
  if (valid) {
    emit('submit')
  }
}
</script>
