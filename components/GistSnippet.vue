<template>
    <div class="gist mb-5" v-if="dataFetched">
      <!-- head info -->
      <div class="flex justify-between my-2">
        <div class="flex">
          <!-- avatar -->
          <img :src="gist.owner.avatar_url" alt="" class="w-8 h-8 rounded-full mr-2">
          
          <!-- username & gist date info -->
          <div class="flex flex-col">
            <a id="username" :href="'https://github.com/' + gist.owner.login" target="_blank" class="font-fira_bold text-purple-text text-xs pb-1 hover:cursor-pointer">
              @{{ gist.owner.login }}
            </a>
            <p class="font-fira_retina text-xs text-menu-text">Created {{ monthsAgo }} months ago</p>
          </div>
        </div>
  
        <!-- details and stars -->
        <div class="flex text-menu-text font-fira_retina text-xs justify-self-end lg:mx-2">
          <div class="flex lg:mx-2 hover:cursor-pointer hover:text-white">
            <img src="/icons/gist/comments.svg" alt="" class="w-4 h-4 mr-2">
            <span @click="showComment(gist.id)">details</span>
          </div>
          <div class="hidden lg:flex hover:cursor-pointer hover:text-white">
            <img src="/icons/gist/star.svg" alt="" class="w-4 h-4 mx-2">
            <span class="">stars</span>
          </div>
        </div>
      </div>
  
      <!-- Code Highlighting -->
      <pre v-if="content" :class="`hljs language-${language}`" v-html="highlightContent(content)"></pre>
  
      <!-- Comment Section -->
      <div :id="'comment' + gist.id" class="flex hidden justify-between text-menu-text font-fira_retina mt-4 pt-4 border-top">
        <p id="comment" v-if="comment" class="w-5/6">{{ comment }}</p>
        <p v-else class="w-5/6">No comments.</p>
        <img src="/icons/close.svg" alt="" class="hover:cursor-pointer" @click="showComment(gist.id)">
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  const gist = ref(null)
  const monthsAgo = ref(null)
  const content = ref(null)
  const language = ref(null)
  const dataFetched = ref(false)
  const comment = ref(null)
  
  const showComment = (id) => {
    const commentElement = document.getElementById('comment' + id)
    commentElement.classList.toggle('hidden')
  }
  
  const setValues = async (gistData) => {
    gist.value = gistData
    monthsAgo.value = setMonths(gistData.created_at)
    content.value = setSnippet(gistData)
    language.value = Object.values(gistData.files)[0].language
    dataFetched.value = true
    comment.value = await setComments(gistData.comments_url)
  }
  
  const setMonths = (date) => {
    let now = new Date()
    let gistDate = new Date(date)
    let diff = now.getTime() - gistDate.getTime()
    let days = Math.floor(diff / (1000 * 3600 * 24))
    let months = Math.floor(days / 30)
    return months
  }
  
  const setSnippet = (gist) => {
    return Object.values(gist.files)[0].content
  }
  
  const setComments = async (comments_url) => {
    const response = await fetch(comments_url)
    const data = await response.json()
    try {
      return data[0].body
    } catch {
      console.log(`no comments found on ${comments_url}`)
    }
  }
  
  const highlightContent = (code) => {
    const hljs = useNuxtApp().$hljs
    return hljs.highlightAuto(code).value
  }
  
  onMounted(() => {
    fetch(`https://api.github.com/gists/${props.id}`)
      .then(response => response.json())
      .then(data => setValues(data))
  })
  </script>
  
  <style scoped>
  .snippet-container {
    background-color: #011221;
    padding: 5px;
    border-radius: 15px;
    border: 1px solid #1E2D3D;
    font-size: 12px;
    overflow-y: scroll;
    overflow-x: scroll;
    max-height: 220px;
  }
  
  .snippet-container pre {
    margin: 0;
    overflow: hidden;
    width: 100%;
    max-height: 220px;
  }
  
  .snippet-container code {
    white-space: pre-wrap;
    max-height: 220px;
    width: max-content;
    overflow: hidden;
  }
  
  .snippet-container::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
  </style>
  