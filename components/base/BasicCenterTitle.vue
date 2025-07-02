<script  setup>
const props = defineProps({
  head:{
    default:"Heading"
  },
  subs:{
    default:"Sub- Heading"
  }
})

</script>


<template>
  <div id="center-title-box">

    <div id="tc-head" class="reveal" >{{ props.head }}</div>
    <div id="tc-sub" class="reveal" :style="{animationDelay:'100ms'}">{{ props.subs }}</div>
  </div>
</template>


<style scoped>
#center-title-box{
display: flex;
flex-direction: column;
gap: 40px;
align-items: center;
justify-content: center;

}

#tc-head{
color: var(--yellow);
font-size: 40px;
}

#tc-sub{
color: var(--white);
font-size: 20px;
text-align: center;

}


@media only screen and (max-width: 768px) {
#tc-head{
font-size: 30px;
}

#tc-sub{
font-size: 15px;
}
}

</style>
