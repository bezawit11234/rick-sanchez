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
     <div class="page-container">
        <h1 class="title">Rick and Morty Characters</h1>
      <main class="main-content">
        <p v-if="error" class="error-message">Something went wrong...</p>
        <p v-if="loading" class="loading-message">Loading...</p>
        <div v-else>
          <div
            v-for="character in result.characters.results"
            :key="character.id"
            class="character-box"
            @click="goToCharacterDetail(character.id)"
          >
            <div class="character-content">
              <img :src="character.image" :alt="character.name" class="character-image">
              <div class="character-details">
                <h2 class="character-name">{{ character.name }}</h2>
                <p class="charc">Status: {{ character.status }}</p>
                <p class="charc">Species: {{ character.species }}</p>
                <p class="charc">Gender: {{ character.gender }}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';

const CHARACTERS_QUERY = gql`
  query {
    characters {
      results {
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

export default {
  name: 'CharactersPage',
  setup() {
    const { result, loading, error } = useQuery(CHARACTERS_QUERY);
    const router = useRouter();

    const goToCharacterDetail = (id) => {
      router.push(`/character/${id}`);
    };

    return {
      result,
      loading,
      error,
      goToCharacterDetail
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

.body {
  font-family: 'Times New Roman', Times, serif;
  margin: 0;
  background-color: #092513;
  color: #092513;
  padding-top: 80px;
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
}

.title {
  background-color: #092513;
  text-align: center;
  padding: 20px;
  font-size: 65px;
  font-weight: bolder;
  color: gold;
  font-family: 'Times New Roman', Times, serif;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #092513;
}

.error-message, .loading-message {
  text-align: center;
  font-size: 1.2em;
  margin-top: 20px;
  color: red;
}

.character-box {
  background-color: rgba(0, 128, 0, 0.2);
  border: 2px solid rgba(0, 128, 0, 0.5);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 128, 0, 0.1);
  transition: transform 0.3s ease;
  width: 1000px;
  display: flex;
   align-items: center;
 
}
.character-box:hover{
  transform: translateY(-5px);
  background-color: gold;
}
.character-content {
   justify-content: center;
  align-items: center;
  display: flex;
  gap: 20px;
}

.character-image {
  width: 300px;
  height: 300px;
  border: 4px solid #004d40;
  border-radius: 10px;
}

.character-details {
  display: flex;
  flex-direction: column;
  
}

.character-name {
  font-size: 28px;
  font-weight: bolder;
  margin-bottom: 20px;
  color: whitesmoke;
  font-family: 'Times New Roman', Times, serif;
}
.charc{
  font-size: 22px;
  color:beige;
}
</style>
