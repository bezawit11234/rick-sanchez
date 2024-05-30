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
      <div class="character-info">
        <img :src="result.character.image" :alt="result.character.name" class="character-image">
        <div class="character-details">
          <h2 class="character-name">{{ result.character.name }}</h2>
          <p class="character-detail">Status: {{ result.character.status }}</p>
          <p class="character-detail">Species: {{ result.character.species }}</p>
          <p class="character-detail">Gender: {{ result.character.gender }}</p>
        </div>
      </div>
      <div class="episodes-section">
        <h3 class="episodes-title">Episodes</h3>
        <div class="episodes-grid">
          <div v-for="episode in result.character.episode" :key="episode.id" class="episode-card">
            <h4 class="episode-name">{{ episode.name }}</h4>
            <p class="episode-detail">Air Date: {{ episode.air_date }}</p>
            <p class="episode-detail">Episode: {{ episode.episode }}</p>
          </div>
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
const CHARACTER_DETAILS_QUERY = gql`
  query {
    character(id: ${id}) {
      id
      name
      status
      species
      gender
      image
      episode {
        id
        name
        air_date
        episode
      }
    }
  }
`;

const { result, loading, error } = useQuery(CHARACTER_DETAILS_QUERY);
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
  text-align: center;
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
  background-color: #092513;
  margin: 0 auto;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  padding-top: 80px;
  min-height: 100vh;
}

.error-message, .loading-message {
  color: #ff4c4c;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.character-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centers the box vertically */
  background: #1e3a3a;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto; /* Centers the box horizontally */
  max-width: 1000px; /* Ensures the character box doesn't stretch too much */
}

.character-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 3px solid #ffd700;
}

.character-details {
  text-align: center;
  color: gainsboro;
}

.character-name {
  font-size: 36px;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 10px;
}

.character-detail {
  font-size: 20px;
  margin-bottom: 5px;
  font-family: 'Times New Roman', Times, serif;
}

.episodes-section {
  margin-top: 40px;
}

.episodes-title {
  font-size: 36px;
  font-weight: bolder;
  color: #ffd700;
  margin-bottom: 20px;
  font-family: 'Times New Roman', Times, serif;
}

.episodes-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.episode-card {
  background: #1e3a3a;
  border-radius: 10px;
  padding: 15px;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  width: 300px;
  height: 200px;
}

.episode-card:hover {
  transform: scale(1.05);
}

.episode-name {
  font-size: 25px;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 10px;
  font-family: 'Times New Roman', Times, serif;
}

.episode-detail {
  font-size: 20px;
  color: gainsboro;
  margin-bottom: 5px;
  font-family: 'Times New Roman', Times, serif;
}
</style>
