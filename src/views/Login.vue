<template>
    <div class="login">
        <form class="form" @submit.prevent="login">
            <h1>Login</h1>
            <label for="username">Username</label>
            <input type="text" name="username" id="username" class="input" v-model="username" />
            <label for="password">Password</label>
            <input type="password" name="password" id="password" class="input" v-model="password" />
            <button class="btn">Login</button>
        </form>
    </div>
</template>

<!-- <script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            window.user = this.username
            // this.$router.push({ name: 'protected' })
            const redirectPath = this.$route.query.redirect || '/protected'
            this.$router.push(redirectPath)
        }
    }
}
</script> -->
<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
    setup() {
        const username = ref('');
        const password = ref('');
        const route = useRoute();
        const router = useRouter();
        const login = () => {
            window.user = username.value;
            const redirectPath = route.query.redirect || '/protected';
            router.push(redirectPath);
        };
        return { username, password, login };
    }
}
</script>