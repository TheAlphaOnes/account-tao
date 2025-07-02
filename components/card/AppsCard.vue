
<script  setup>
import { ExternalLink } from "lucide-vue-next";


const props = defineProps({
  link:{
    default:"https://taohq.org"
  },
  head:{
    default:"Heading"
  },
  sub:{
    default:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus dolores dolorum minima excepturi totam asperiores commodi dolor labore atque assumenda nemo quae pariatur aspernatur aut, autem delectus voluptates illo aliquid?"
  }
})

</script>

<template>
          <div class="app-card">
            <div class="app-heading">{{props.head}}</div>
            <div class="app-desc">{{ props.sub }}</div>
            <div class="app-link">
              <NuxtLink :to="props.link">
                <ExternalLink size="20"/>
              </NuxtLink>
            </div>
          </div>
</template>

<style scoped>

.app-card {
  background: var(--bg);
  padding: 1rem;
  border-radius: 10px;
  position: relative;
  height: 100px;
  width: min(300px,100%);
  border: 1px solid var(--border);
  transition: all ease-in-out 300ms;
  overflow: hidden;

}

.app-card:hover{
  border: 1px solid grey;
}

.app-heading {
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: whitesmoke;

}

.app-desc {
  font-size: 0.9rem;
  line-height: 1.3;
}
.app-link {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>
