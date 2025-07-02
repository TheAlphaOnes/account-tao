<script setup></script>

<template>

  <div id="footer">
    <div id="f-head">Made with ❤️ By <NuxtLink>TheAlphaOnes</NuxtLink></div>
    <div id="f-sub">
      <NuxtLink to="https://x.com/TheNormVg"> twitter </NuxtLink>
      •
      <NuxtLink to="https://www.youtube.com/@thenormvg"> youtube </NuxtLink>
      •
      <NuxtLink to="mailto:thealphaones.work@gmail.com"> email </NuxtLink>
      <!-- •
      <NuxtLink> discord </NuxtLink> -->

    </div>
  </div>
</template>

<style scoped>

#footer{

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* border-top: 1px solid var(--border); */
  padding-top: 100px;
  padding-bottom: 20px;
  justify-self: flex-end;
  /* position: sticky;
  bottom: 0%; */

}

#f-head{
  font-size: 15px;
  font-family: var(--font-k2d);
  color: whitesmoke;
}




a{
text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all ease-in-out 300ms;
}

a:hover {
  text-decoration: none;
  border-bottom: 1px solid var(--red);
}


#f-head a {
  font-family: var(--font-ital);
  font-size: 27px;
  color: whitesmoke;
  border: none;

}

#f-head a:hover {
  font-family: var(--font-ital);
  font-size: 27px;
  color: var(--blue);
  border: none;

}

</style>
