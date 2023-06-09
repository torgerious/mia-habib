<script setup lang="ts">

</script>


<template>
  <div class="Construction">
    <div class="background-image"></div>
    <div class="container">
      <h1>MIA HABIB PRODUCTIONS</h1>
      <p><strong>NEW WEBSITE WILL BE READY IN JUNE - STAY TUNED</strong></p>
      <br><br><br>
      <p> <strong>Contact & Managing director</strong> <br> <a href="mailto:frida@miahabibproductions.com">frida@miahabibproductions.com</a></p>
    </div>
  </div>

</template>

<style scoped>


.Construction {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 800px;
  padding: 40px;
  border-radius: 4px;
  margin: 228px auto;
  color: white;
  text-align: center;
  text-shadow: 1px 1px #161616
}

h1 {
  font-size: 57px;
  color: white;
  margin: 0 0 20px 0;
}

p {
  font-size: 26px;
  color:white;
  margin: 0 0 10px 0;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .container {
    margin: 120px auto;
    padding: 20px;
  }

  h1 {
    font-size: 28px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    margin-bottom: 8px;
  }
}

.background-image {
  background-image: url('https://firebasestorage.googleapis.com/v0/b/mia-habib-f9b6c.appspot.com/o/mihabibproductions.jpg?alt=media&token=8e5989d9-c3a6-43b5-b206-8911427fef0c');
  background-size: cover;
  background-position: center;
  filter: brightness(70%);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}


</style>