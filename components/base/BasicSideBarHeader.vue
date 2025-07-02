<script setup>
import { PanelLeft } from "lucide-vue-next";

const props = defineProps({
  isSidebar:{
    default:false
  },
  callback:{
    type:Function,
    default:()=>{console.log('asd');},
  }
})

</script>

<template>

  <div id="template-header">
    <div id="th-brand">
      <div>
        <span @click="props.callback" id="pannel-btn">

          <PanelLeft
          v-if="props.isSidebar"
          color="#1A1A1A"
          fill="#A8A7AC"
          />
          <PanelLeft v-else color="#A8A7AC" />
        </span>

        TheAlphaOnes
      </div>
    </div>

    <div id="nav-links">
      <NuxtLink to="/" class="nav-link"> Home </NuxtLink>

      <!-- <NuxtLink to="/" class="nav-link"> Docs </NuxtLink> -->

      <NuxtLink to="https://discord.gg/BafRxadauZ" class="nav-link"> Community </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

#template-header {
  /* width: 100%; */
  height: 40px;
  background-color: var(--bg2);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 20px;
  margin-right: 10px;
  margin-left: 10px;
  border: 1px solid transparent;
  transition: all ease-in-out 200ms;
}

#th-brand {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  /* border: 1px solid saddlebrown; */
}

#th-brand img {
  height: 35px;
}

#pannel-btn{
  /* border: 1px solid salmon; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

#th-brand div span:active{
  scale: 0.95;
}

#th-brand div {
  display: flex;
  justify-content: center;
  align-items: center;
  color: whitesmoke;
  font-family: var(--font-ital);
  /* font-weight: 500; */
  font-size: 30px;
  gap: 10px;
  margin-bottom: -6px;
}

#template-header:hover {
  border: 1px solid var(--border);
}

#nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: var(--white);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: all 200ms ease-in-out;
}

.nav-link:hover {
  border-bottom: 2px solid var(--red);
}

@media only screen and (max-width: 768px) {
#th-brand div {
  font-size: 25px;

}

#template-header {
  /* width: 100%; */

  padding: 3px 20px;
  margin-right: 0px;
  margin-left: 0px;

}
}


</style>
