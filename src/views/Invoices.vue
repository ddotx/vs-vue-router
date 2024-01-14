<template>
    <div>
        <h1>Invoices</h1>
    </div>
</template>

<script>
import { onBeforeRouteLeave } from 'vue-router';
export default {
    setup() {
        onBeforeRouteLeave((to, from, next) => {
            const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
            if (answer) {
                next()
            } else {
                next(false)
            }
        })
    }
}
</script>