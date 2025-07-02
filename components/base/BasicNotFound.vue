<script setup>

</script>

<template>
<div id="not-found-box">

  <div id="nf-head">404 PAGE NOT FOUND.</div>
  <div id="nf-sub">Nothing to see here. Try going back

    <NuxtLink to="/">home</NuxtLink></div>
</div>

</template>

<style scoped>
#not-found-box{
  height: calc(97vh - 300px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* border: 1px solid salmon; */


}

a{
  color: var(--red);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all ease-in-out 300ms;
}

a:hover{
text-decoration: none;
border-bottom: 1px solid var(--red)
}

#nf-head{
  color: var(--yellow);
  font-size: 45px;
  font-family: var(--font-k2d);
}


#nf-sub{
  color: var(--white);
  font-size: 21px;
  font-family: var(--font-k2d);
}


</style>

