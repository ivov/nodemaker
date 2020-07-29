:<template>
  <div id="instructions">
      <h1>{{header}}</h1>
      <h3>{{subtitle}}</h3>
      <h4>{{instructions}}</h4>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    name: 'Instructions',
    props: [
        'header',
        'subtitle',
        'instructions'
    ]
})

export default class App extends Vue {}
</script>

<style scoped>
#instructions {
    background-color: white;
    width: 35rem;
    margin: 2rem;
    padding: 2rem;
    border-radius: 1rem;
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