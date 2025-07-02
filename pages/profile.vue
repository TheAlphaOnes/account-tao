<script  setup>
import { LogOut, SquarePen } from "lucide-vue-next";
import BasicPage from "~/components/base/BasicPage.vue";
import AppsCard from "~/components/card/AppsCard.vue";
import EditProfileForm from "~/components/profile/EditProfileForm.vue";

const isEdit = ref(false)


const profileData = ref({
  name: 'Vishnu Gupta',
  username: '@thenormvg',
  email: 'thenormvg@gmail.com',
  digitalLocation: 'localhost',
  whoAmI: 'Building in Public',
  bio: 'i code 13 hours | have backpain…'
})

function onSave(updated) {



  if (!updated.cancle){
    console.log(updated);


    profileData.value = updated


  }
  isEdit.value = false

  // close form / show success toast / etc.
}


</script>

<template>
  <BasicPage :is-page="true">
    <div class="profile-box">





      <main class="profile-header" >
        <div class="pb-name">
          Vishnu Gupta <span class="edit-icon"><SquarePen size="20" @click="isEdit = true" /></span>

        </div>
        <div class="pb-username">@thenormvg</div>
        <div class="pb-email">thenormvg@gmail.com</div>
      </main>


    <EditProfileForm
      :initialData="profileData"
      @save="onSave"
      v-if="isEdit"
    />

      <section class="profile-info" v-if="!isEdit">
        <div class="info-pair">
          <div class="pb-label">Digital Location</div>
          <div class="pb-dl">localhost</div>
        </div>
        <div class="info-pair">
          <div class="pb-label">Who am I</div>
          <div class="pb-who">Building in Public</div>
        </div>

        <div class="bio">
          <div class="pb-label">Bio</div>
          <p>

            i code 13 hours | have backpain | eat Maggi | get creative in dreams and woke up afraid of them
          </p>
        </div>
      </section>


      <div class="btn-logout">
        <LogOut color="#111111" size="20"/>
        <span>
          logout
        </span>
      </div>

      <div class="line"></div>

      <section class="pb-apps">
        <h2 class="apps-title">More From us</h2>
        <div class="apps-grid">

          <AppsCard/>
          <AppsCard/>
          <AppsCard/>


        </div>
      </section>
    </div>

  </BasicPage>
</template>


<style scoped>

/* .btn-logout *{
  border: 1px solid salmon;
} */

.btn-logout span{
    display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1px;
  color: #111111;

}

.btn-logout {
  padding: 7px 10px;
  background: var(--red);
  color: #fff;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  width: 80px;
  gap: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

}

.btn-logout:hover {
  opacity: 0.8;
}



.profile-box {
  padding: 2rem;
}

.profile-header {
  margin-bottom: 1.5rem;
}

.pb-name {
  font-size: 2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  color: whitesmoke;
}

.pb-name span{
  /* border: 1px solid salmon; */
  display: flex;

}

.edit-icon {
  font-size: 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
}

.pb-username {
  font-size: 1.2rem;
  color: #A8A7AC;
  margin-top: 0.25rem;

}

.pb-email {
  font-size: 0.9rem;
  color: #969696;
}

.profile-info {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 1.5rem;

}

.info-pair {
  flex: 1 1 200px;
}

.pb-label {
  font-size: 0.85rem;
  color: #A8A7AC;
}

.pb-dl, .pb-who {
  font-size: 1rem;
  margin-top: 0.25rem;
  color: whitesmoke;

}

.bio {
  flex: 1 1 100%;
  margin-top: 1rem;
  font-size: 1rem;
  line-height: 1.4;

  /* border: 1px solid red; */
}

.bio p{
  width: min(500px,100%);
  color: whitesmoke;

  word-wrap: break-word;
}

.line {
  height: 1px;
  background: var(--border);
  margin: 2rem 0;
}

.apps-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.apps-grid {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap:wrap ;
  gap: 10px;
}

</style>
