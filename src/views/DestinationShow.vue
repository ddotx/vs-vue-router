<template>
    <div>
        <div>
            <h2>Hello DestinationShow.vue {{ $route.params.id }}</h2>
        </div>
        <section v-if="destination" class="destination">
            <h1>{{ destination.name }}</h1>
            <GoBack />
            <div class="destination-details">
                <img :src="`/images/${destination.image}`" :alt="destination.name" />
                <p>{{ destination.description }}</p>
            </div>
        </section>
        <section class="experiences">
            <h2>Top Experiences in {{ destination.name }}</h2>
            <div class="cards">
                <router-link v-for="experience in destination.experiences" :key="experience.slug"
                    :to="{ name: 'experience.show', params: { experienceSlug: experience.slug } }">
                    <ExperienceCard :experience="experience" />
                </router-link>

            </div>
            <router-view></router-view>


        </section>
    </div>
</template>

<script>
import sourceData from '../data.json'
import ExperienceCard from '@/components/ExperienceCard.vue';
import GoBack from '@/components/GoBack.vue';
export default {
    components: { ExperienceCard, GoBack },

    // NOTE: decoupled from $route.params.id
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    // data() {
    //     return {
    //         destination: null
    //     }
    // },
    computed: {
        /*
        destinationId() {
                    return parseInt(this.$route.params.id)
                },
        destination() {
            return sourceData.destinations.find(
                destination => destination.id === this.destinationId
            )
        } */
        destination() {
            return sourceData.destinations.find(destination => destination.id === this.id);
        }
    },

}
</script>