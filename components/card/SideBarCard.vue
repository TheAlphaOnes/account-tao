<template>
        <div :class="boxClass">

          <NuxtLink :to="props.link">
            {{props.name}}
          </NuxtLink>

        </div>
</template>

<script  setup>
const props = defineProps({
  name:{
    default:"Item 0"
  },
  link:{
    default:"/"
  },
  currentLink:{
    default:""
  }
})

const boxClass = computed(()=>{
  // console.log(props.currentLink);

  return props.currentLink === props.link ?  `sbl-item onLink`:`sbl-item `
})

</script>

<style scoped>


a{
  text-decoration: none;

}

.sbl-item{
   border-bottom: 2px solid transparent;
  transition: all ease-in-out 300ms;
  font-size: 20px;
  margin-bottom: 5px;
}

.sbl-item:hover{
   border-bottom: 2px solid var(--red);
}


.onLink{
 border-bottom: 2px solid var(--red);
}


</style>
