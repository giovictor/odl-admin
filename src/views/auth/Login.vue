<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card width="650">
                    <v-toolbar color="#e9954b" dark>
                        <v-toolbar-title>Login</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="Email" type="text" prepend-inner-icon="mdi-account" v-model="$v.loginForm.email.$model" @keyup="clearLoginError"></v-text-field>
                            <span class="caption red--text text--darken-2" v-if="!$v.loginForm.email.required && $v.loginForm.email.$dirty">{{validationMessages.email.required}}</span>
                            <span class="caption red--text text--darken-2" v-if="!$v.loginForm.email.email && $v.loginForm.email.$dirty">{{validationMessages.email.email}}</span>
                            <v-text-field label="Password" type="password" prepend-inner-icon="mdi-lock" v-model="$v.loginForm.password.$model" @keyup="clearLoginError"></v-text-field>
                            <span class="caption red--text text--darken-2" v-if="!$v.loginForm.password.required && $v.loginForm.password.$dirty">{{validationMessages.password.required}}</span>
                            <v-checkbox v-model="loginForm.remember_me" label="Remember Me"></v-checkbox>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <span class="caption red--text text--darken-2">{{loginError}}</span>
                        <v-spacer></v-spacer>
                        <v-btn color="#e9954b" dark right @click="login">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import axios from '../../plugins/axios'
import Cookies from 'js-cookie'

export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                email: '',
                password: '',
                remember_me: false
            },
            validationMessages: {
                email: {
                    required: 'Please type your email.',
                    email: 'Please type a valid email.'
                },
                password: {
                    required: 'Please type your password.'
                }
            },
            loginError: ''
        }
    },
    validations: {
        loginForm: {
            email: { required, email },
            password: { required }
        }
    },
    methods: {
        login() {
            if(!this.$v.loginForm.$invalid) {
                let credentials = {
                    email: this.loginForm.email,
                    password: this.loginForm.password
                }
                axios.post('auth/admin/login', credentials)
                .then(response => {
                    this.clearLoginError()
                    if(this.loginForm.remember_me) {
                        Cookies.set('access_token', response.data.data.access_token, { expires: response.data.data.expires_in })
                    } else {
                        Cookies.set('access_token', response.data.data.access_token)
                    }
                    this.$router.go('/')
                })
                .catch(err => {
                    this.loginError = err.response.data.message
                })
            } else {
                this.$v.loginForm.$touch()
            }
        },
        clearLoginError() {
            this.loginError = ''
        }
    }
}
</script>
