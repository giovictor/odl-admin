<template>
    <v-snackbar v-model="snackbar.show" right dark :color="snackbar.color">
        {{snackbar.text}}
        <v-btn @click="snackbar.show = false" dark icon>
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-snackbar>
</template>

<script>
import bus from '../helpers/eventBus'

export default {
    data() {
        return {
            snackbar: {
                show: false,
                color: '',
                text: ''
            }
        }
    },
    mounted() {
        bus.$on('SHOW_SNACKBAR', (data) => {
            this.snackbar.show = true
            this.snackbar.color = data.color
            this.snackbar.text = data.text
        })
    }
}
</script>