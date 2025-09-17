<template>
  <div class="home">
    <h1>Welcome to Theater-Tix 🎭</h1>
    <p>Discover and buy tickets for your favorite events!</p>

    <section class="featured-events">
      <h2>Featured Events</h2>
      <ul>
        <li v-for="event in featuredEvents" :key="event.id">
          <NuxtLink :to="`/events/${event.id}`">
            {{ event.name }} - {{ event.date }}
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
// Example data for demonstration
const featuredEvents = [
  { id: 1, name: 'Shakespeare in the Park', date: '2025-10-01' },
  { id: 2, name: 'Broadway Musical Night', date: '2025-10-15' },
  { id: 3, name: 'Jazz Concert', date: '2025-11-05' },
]
</script>

<style scoped lang="scss">
.home {
  text-align: center;
  padding: 2rem;

  h1 {
    color: #fefefe; // assumes Bulma variable overridden in main.scss
    margin-bottom: 1rem;
  }

  .featured-events {
    margin-top: 2rem;

    ul {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 0.5rem;

        a {
          color: #fe6824;
          text-decoration: underline;

          &:hover {
            color: darken(#fefefe, 10%);
          }
        }
      }
    }
  }
}
</style>
