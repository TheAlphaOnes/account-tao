<template>
  <div class="edit-profile-form">
    <!-- Display static profile info -->


    <!-- Editable form for specific fields -->
    <div  class="form-grid">
      <div class="form-group">
        <label for="digitalLocation">Digital Location</label>
        <input id="digitalLocation" v-model="localForm.digitalLocation" class="input-field" />
      </div>
      <div class="form-group">
        <label for="whoAmI">Who am I</label>
        <input id="whoAmI" v-model="localForm.whoAmI" class="input-field" />
      </div>
      <div class="form-group bio-group">
        <label for="bio">Bio</label>
        <textarea id="bio" v-model="localForm.bio" rows="4" class="textarea-field"></textarea>
      </div>


      <div class="btn-box">

        <button class="btn-close" @click="handleCancle">Close</button>
        <button  class="btn-save" @click="handleSubmit" >Save</button>

      </div>
    </div>
  </div>
</template>

<script setup lang="js">

// Props: initialData containing both static and editable fields
const props = defineProps({
  initialData: {
    type: Object,
    required: true,
    default: () => ({
      digitalLocation: '',
      whoAmI: '',
      bio: ''
    })
  }
})
const emit = defineEmits(['save'])




// Create a local reactive copy for editable fields
const localForm = ref({
  digitalLocation: props.initialData.digitalLocation,
  whoAmI: props.initialData.whoAmI,
  bio: props.initialData.bio
})

function handleSubmit() {
  emit('save', { ...localForm.value,cancle:false })
}

const handleCancle  = () => {
  emit('save', { ...localForm.value,cancle:true })

}

</script>

<style scoped>


.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-field, .textarea-field {
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 7px;
  background: var(--bg);
  color: whitesmoke;
  outline: none;
  font-family: var(--font-k2d);
}

.input-field:focus, .textarea-field:focus {
  border-color: #666;
}

.bio-group textarea {
  resize: vertical;
}



.btn-close {
  align-self: flex-start;
  padding: 0.6rem 1.2rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 7px;
  /* color: #fff; */
  cursor: pointer;
  width: 80px;
}

.btn-close:hover {
  background: rgb(37, 37, 37);
  color: #fff;

}

.btn-save {
  align-self: flex-start;
  padding: 0.6rem 1.2rem;
  background: whitesmoke;
  border: 1px solid var(--border);

  border-radius: 7px;
  color: black;
  cursor: pointer;
  width: 80px;

}

.btn-save:hover {

  background: rgb(163, 163, 163);

}

.btn-box{
  display: flex;
  gap: 10px;

}
</style>
