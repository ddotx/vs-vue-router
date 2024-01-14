<template>
    <div>
        <h1>Greetings, {{ username }}</h1>
        <button @click="logout">Logout</button>
        <router-link :to="{ name: 'invoices' }">
            <button>Invoices</button>
        </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: window.user
        }
    },
    methods: {
        logout() {
            window.user = null
            // this.$router.push({ name: 'login' })
            // this.$router.push({ name: 'Home', hash: "#logout" }) // => http://localhost:8080/#logout
            this.$router.push({ name: 'Home', query: { logout: null } }) // => http://localhost:8080/?logout
            // this.$router.replace({ name: 'Home', query: { logout: null } }) // => http://localhost:8080/?logout
        }
    }
}
</script>