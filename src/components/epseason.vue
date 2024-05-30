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
      <h2 class="title">Episode: {{ result.episode.name }}</h2>
      <p class="episode-detail">Air Date: {{ result.episode.air_date }}</p>
      <p class="episode-detail">Episode: {{ result.episode.episode }}</p>
      <p class="episode-detail">Created: {{ result.episode.created }}</p>
    
    <h2 class="characters-title">Characters</h2>
    <div class="characters-grid">
      <div v-for="character in result.episode.characters" :key="character.id" class="character-card">
        <img :src="character.image" :alt="character.name" class="character-image">
        <p class="character-name">{{ character.name }}</p>
        <p class="character-detail">Status: {{ character.status }}</p>
        <p class="character-detail">Species: {{ character.species }}</p>
        <p class="character-detail">Gender: {{ character.gender }}</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import { useRoute } from 'vue-router';

const id = useRoute().params.id;
const EPISODE_DETAILS_QUERY = gql`
  query {
    episode(id: ${id}) {
      id
      name
      air_date
      episode
      created
      characters {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;

const { result, loading, error } = useQuery(EPISODE_DETAILS_QUERY);
</script>

<style scoped>


.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  background-color: #092513;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 500;
  font-size: x-large;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000; 
  height: 60px; /* Assuming an estimated height */
}

.nav {
  flex: 1; 
  text-align: right;
}

.nav-link {
    list-style: none;
    display: flex;
    gap: 40px;
    padding-right: 32px;
    margin: 0;
}
.nav-item{
  color: gold;
}
.container {
  max-width: auto;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(to bottom, #092513, #092513);
  border-radius: 12px;
  text-align: center;
  padding-top: 80px;
}

.error-message,
.loading-message {
  color: #ff4c4c;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.title {
  font-size: 55px;
  font-weight: bolder;
  color: gold;
  margin-bottom: 40px;
  font-family: 'Times New Roman', Times, serif;
}

.episode-detail {
  font-size: 28px;
  color: gainsboro;
  margin-bottom: 5px;
  font-family: 'Times New Roman', Times, serif;
}

.characters-title {
  font-size: 36px;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 20px;
  font-family: 'Times New Roman', Times, serif;
}

.characters-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.character-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #1e3a3a;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  width: 300px;
}

.character-card:hover {
  transform: scale(1.05);
}

.character-image {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 3px solid #ffd700;
}

.character-name {
  font-size: 22px;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 10px;
}

.character-detail {
  font-size: 18px;
  color: gainsboro;
  margin-bottom: 5px;
  font-family: 'Times New Roman', Times, serif;
}
</style>
