:<template>
  <div class="inscructions">
      <h1>{{header}}</h1>
      <h3>{{subtitle}}</h3>
      <h4>{{instructions}}</h4>
  </div>
</template>

<script>
export default {
    name: 'Instructions',
    props: [
        'header',
        'subtitle',
        'instructions'
    ]
}
</script>

<style scoped>
.instructions {
  margin-bottom: 1rem;
}

h1, h3, h4 {
    margin: 0;
    padding: 0;
}

h1 {
    font-weight: 500;
}

h3 {
    font-weight: 400;
    margin-bottom: 2rem;
}

h5 {
    font-weight: bolder;
}
</style>