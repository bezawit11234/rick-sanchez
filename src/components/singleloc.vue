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
      <div class="location-info">
        <h2 class="location-name">{{ result.location.name }}</h2>
        <p class="location-detail">Type: {{ result.location.type }}</p>
        <p class="location-detail">Dimension: {{ result.location.dimension }}</p>
        <p class="location-detail">Created: {{ result.location.created }}</p>
      </div>
      <div class="residents-section">
        <h3 class="residents-title">Residents</h3>
        <div class="residents-grid">
          <div v-for="resident in result.location.residents" :key="resident.id" class="resident-card">
            <img :src="resident.image" :alt="resident.name" class="resident-image">
            <h4 class="resident-name">{{ resident.name }}</h4>
            <p class="resident-detail">Status: {{ resident.status }}</p>
            <p class="resident-detail">Species: {{ resident.species }}</p>
            <p class="resident-detail">Gender: {{ resident.gender }}</p>
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

const route = useRoute();
const id = route.params.id;

const LOCATION_DETAILS_QUERY = gql`
  query GetLocation($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      created
      residents {
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

const { result, loading, error } = useQuery(LOCATION_DETAILS_QUERY, { id });
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
  max-width: 12000px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(to bottom, #092513, #092513);
  border-radius: 12px;
  text-align: center;
  padding-top: 80px;
}

.error-message, .loading-message {
  color: #ff4c4c;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.location-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centers the box vertically */
  background: #1e3a3a;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto; /* Centers the box horizontally */
  max-width: 1000px;
}

.location-name {
  font-size: 48px;
  font-weight: bolder;
  color: #ffd700;
  margin-bottom: 10px;
  font-family: 'Times New Roman', Times, serif;
}

.location-detail {
  font-size: 22px;
  color: gainsboro;
  margin-bottom: 5px;
  font-family: 'Times New Roman', Times, serif;
}

.residents-section {
  margin-top: 80px;

}

.residents-title {
  font-size: 36px;
  font-weight: bolder;
  color: #ffd700;
  margin-bottom: 20px;
  font-family: 'Times New Roman', Times, serif;
}

.residents-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
}

.resident-card {
  background: #1e3a3a;
  border-radius: 10px;
  padding: 15px;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  width: 200px;
  text-align: center;
}

.resident-card:hover {
  transform: scale(1.05);
}

.resident-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 3px solid #ffd700;
}

.resident-name {
  font-size: 28px;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 10px;
  font-family: 'Times New Roman', Times, serif;
}

.resident-detail {
  font-size: 20px;
  color: gainsboro;
  margin-bottom: 5px;
  font-family: 'Times New Roman', Times, serif;
}
</style>
