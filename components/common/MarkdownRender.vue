<script setup lang="ts">
import { renderMarkdown } from '~/utils/renderMarkdown'
import "~/assets/github-markdown-dark.css"

const props = defineProps({
  md:{
    type:String,
    default:"# CODE"
  }
})


// const rawMarkdown = ref(`# Hello World\nThis is **Markdown** with \`code\` block.`)
const html = computed(() => renderMarkdown(props.md))
</script>

<template>
    <span class="markdown-content reveal">

      <div class="prose max-w-none" v-html="html" />
  </span>
</template>



<style>

.markdown-content {
  font-weight: 400;
  font-style: normal;
  background: none !important;

  user-select: text;

}

.markdown-content p{
  white-space: pre-line;
}



@media only screen and (max-width: 768px) {

}
</style>
