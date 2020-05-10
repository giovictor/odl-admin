<template>
    <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
                <v-icon small>mdi-pencil</v-icon>
            </v-btn>
        </template>
        <slot></slot>
    </v-dialog>
</template>

<script>
import bus from '../helpers/eventBus'

export default {
    name: 'UpdateDialog',
    data() {
        return {
            dialog: false
        }
    },
    mounted() {
        bus.$on('CLOSE_DIALOG', () => {
            this.dialog = false
        }) 
    }
}
</script>