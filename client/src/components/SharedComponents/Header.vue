:<template>
  <div id="header">
      <img id="headerImg" src="../../assets/n8n_copy.png" />
      <h1 id="headerText">nodemaker</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    name: 'Header'
})

export default class App extends Vue {}
</script>

<style>
#header {
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 1rem;
    background-color: white;
}

#headerImg {
    align-self: center;
}

#headerText {
    font-weight: normal;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 2.5rem;
}
</style>