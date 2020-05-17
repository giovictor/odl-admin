<template>
    <v-dialog v-model="dialog" width="400">
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
                <v-icon small>mdi-delete</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-card-text class="subtitle-1">
                    Are you sure you want to delete {{label}}?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#efefef" class="mb-4" @click="dialog = false">
                        <span class="caption">Close</span>
                    </v-btn>
                    <v-btn color="#D32F2F" class="mb-4" dark @click="$emit('delete', id)">
                        <span v-if="isDeleting" class="caption">Deleting...</span>
                        <span v-else class="caption">Delete</span>
                    </v-btn>
                </v-card-actions>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import bus from '../helpers/eventBus'

export default {
    name: 'DeleteDialog',
    props: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            dialog: false,
            isDeleting: false
        }
    },
    mounted() {
        bus.$on('CLOSE_DIALOG', () => {
            this.dialog = false
        })
        
        bus.$on('IS_DELETING', (data) => {
            this.isDeleting = data
        })
    }
}
</script>