<template>
<div class="container">
    <header class="header">
      
      <nav class="nav">
        <ul class="nav-link">
          <li>
            <router-link class="nav-item" to="/">Home</router-link>
          </li>
          <li>
            <router-link class="nav-item" to="/seasons">Episodes</router-link>
          </li>
          <li>
            <router-link class="nav-item" to="/characters">Character</router-link>
          </li>
          <li>
            <router-link class="nav-item" to="/location">Location</router-link>
          </li>
        </ul>
      </nav>
    </header>
  
    <p v-if="error" class="error-message">Oops! Something went wrong...</p>
    <p v-else-if="loading" class="loading-message">Loading...</p>
    <div v-else>
      <h2 class="title">Discover Episodes</h2>
      <div class="episodes">
        <div
          v-for="episode in result.episodes.results"
          :key="episode.id"
          class="episode"
          @click="goToEpisodeDetail(episode.id)"
        >
          <h3 class="episode-name">Episode: {{ episode.name }}</h3>
          <p class="episode-detail">{{ episode.air_date }}</p>
          <p class="episode-detail">{{ episode.episode }}</p>
          <p class="episode-detail">{{ episode.created }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';

const EPISODES_QUERY = gql`
  query {
    episodes {
      results {
        id
        name
        air_date
        episode
        created
      }
    }
  }
`;

export default {
  name: 'EpisodesPage',
  setup() {
    const { result, loading, error } = useQuery(EPISODES_QUERY);
    const router = useRouter();

    const goToEpisodeDetail = (id) => {
      router.push(`/episode/${id}`);
    };

    return {
      result,
      loading,
      error,
      goToEpisodeDetail
    };
  }
};
</script>

<style scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  background-color: #092513;
  color: gold;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 500;
  font-size: x-large;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000; 
  height: 60px;
  
}

.nav {
  flex: 1;
  text-align: right;
}

.nav-link {
      list-style-type: none;
    display: inline-flex;
    gap: 100px;
    padding: 0;
    margin: 0;
}
.nav-item{
  color: gold;
}

.container {
  max-width: auto;
  margin: 0 auto;
  padding: 20px;
  background-color: #092513;
  border-radius: 12px;
  text-align: center; /* Center align text */
  padding-top: 80px;
}

.error-message, .loading-message {
  color: #ff4c4c;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.title {
  text-align: center;
  font-size: 55px;
  font-weight: bolder;
  color: gold;
  margin-bottom: 40px;
  font-family: 'Times New Roman', Times, serif;
}

.episodes {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align the episode boxes horizontally */
}

.episode {
  background: rgba(0, 128, 0, 0.2); /* Transparent green background */
  padding: 20px;
  width: 100%; /* Make the episode box take full width */
  max-width: 1000px; /* Limit the maximum width */
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(0, 128, 0, 0.1); /* Box shadow */
  transition: transform 0.3s, ease;
}

.episode:hover {
  transform: translateY(-5px);
  background-color: gold;
}

.episode-name {
  font-size: 48px;
  font-weight: bolder;
  color: limegreen;
  margin-bottom: 10px;
  font-family: 'Times New Roman', Times, serif;
}

.episode-detail {
  font-size: 28px;
  color: gainsboro;
  margin-bottom: 5px;
  font-family: 'Times New Roman', Times, serif;
}
</style>
