<template>
 <div class="body">
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
   
    
    <div class="container">
      
      <p v-if="error" class="error">Something went wrong...</p>
      <p v-if="loading" class="loading">Loading...</p>

      <div v-else>
        <div
          v-for="location in result.locations.results"
          :key="location.id"
          class="location-box"
          @click="goToLocationDetail(location.id)"
        >
          <h3 class="title">Location</h3>
          <p class="location-name">{{ location.name }}</p>
          <p class="location-info">Type: {{ location.type }}</p>
          <p class="location-info">Dimension: {{ location.dimension }}</p>
          <p class="location-info">Created: {{ location.created }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';

const LOCATIONS_QUERY = gql`
  query {
    locations {
      results {
        id
        name
        type
        dimension
        created
      }
    }
  }
`;

export default {
  setup() {
    const { result, loading, error } = useQuery(LOCATIONS_QUERY);
    const router = useRouter();

    const goToLocationDetail = (id) => {
      router.push(`/location/${id}`);
    };

    return {
      result,
      loading,
      error,
      goToLocationDetail
    };
  }
};
</script>

<style scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
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
  /* flex: 1; */
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

.body {
  background-color: #092513;
  margin-top: -50px;
  padding-top: 80px;
}
.container {
  font-family: 'Times New Roman', Times, serif;
  margin: 50px;
  margin-top: 50px;
}

.error, .loading {
  color: red;
  font-size: 1.2em;
  text-align: center;
}

.location-box {
  background-color: rgba(0, 128, 0, 0.2); /* Transparent greenish box */
  border: 2px solid rgba(0, 128, 0, 0.5); /* Semi-transparent border */
  border-radius: 10px;
  padding: 15px;
  margin: 15px 0;
  box-shadow: 0 4px 8px rgba(0, 128, 0, 0.1);
}
.location-box h3 {
  color: gold;
  border-bottom: 2px solid rgba(0, 128, 0, 0.5);
  padding-bottom: 5px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 55px;
  font-weight: bolder;
}

.location-name {
  font-weight: bolder;
  font-size: 35px;
  color: #32CD32;
  transition: transform 0.3s ease;
}
.location-name:hover {
  transform: translateY(-5px);
  background-color: gold;
}
.location-info {
  font-size: 28px;
  color: #E0FFFF;
}
</style>
