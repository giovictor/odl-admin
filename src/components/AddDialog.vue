<template>
    <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ on }">
            <v-btn color="#e9954b" class="mb-4" dark v-on="on">
                <v-icon left>mdi-plus</v-icon>
                <span class="caption">{{label}}</span>
            </v-btn>
        </template>
        <slot></slot>
    </v-dialog>
</template>

<script>
import bus from '../helpers/eventBus'

export default {
    name: 'AddDialog',
    props: {
        label: {
            type: String,
            required: true
        }
    },
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