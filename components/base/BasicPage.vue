<script setup>
import "~/assets/github-markdown-dark.css";
import BasicNotFound from "./BasicNotFound.vue";
import BasicHeader from "./BasicHeader.vue";
import BasicFooter from "./BasicFooter.vue";

const props = defineProps({
  isPage: {
    default: false
  },

});
</script>

<template>
  <BasicHeader/>
  <div id="temp-box">
    <div id="main-box" v-if="!isPage">

      <BasicNotFound/>
        <BasicFooter/>

    </div>

    <div id="main-box" v-if="isPage">
        <slot></slot>
        <BasicFooter/>
    </div>


  </div>

</template>

<style scoped>


#main-box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
  align-items: stretch;
}

#temp-box {
  min-height: calc(97vh - 80px);

  display: flex;

  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  border-radius: 10px;
  background-color: var(--bg2);
  border: 1px solid transparent;
  transition: all ease-in-out 200ms;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 3px;
  /* overflow-y: auto; */
}

#temp-box:hover {
  border: 1px solid var(--border);
}


@media only screen and (max-width: 768px) {
#temp-box{
  margin-left: 0px;
  margin-right: 0px;
}
}

</style>
