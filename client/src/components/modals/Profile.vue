<template>
  <form @submit.prevent="updateProfile">
    <div class="flex items-center justify-center mb-8">
      <div class="relative">
        <button
          @click="$refs.uploader.click()"
          class="absolute z-10 bg-white rounded-full shadow-md border top-0 right-0 p-1"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17 17V19H18C20.7614 19 23 16.7614
            23 14C23 11.485 21.1431 9.40363 18.7254 9.05224C17.875 6.10562 15.1586 4 12 4C9.65343
            4 7.50902 5.16507 6.21989 7.05027C3.26703 7.43346 1 9.95877 1 13C1 16.3137 3.68629
            19 7 19V17C4.79086 17 3 15.2091 3 13C3 10.8504 4.69934 9.08715 6.83966 9.00314L7.39066
            8.98151L7.66642 8.50398C8.5543 6.96643 10.1924 6 12 6C14.4511 6 16.5303 7.77626 16.9309
            10.1662L17.0738 11.0182L17.9375 11.0006C17.9531 11.0004 17.9608 11.0002 17.9686
            11.0002C17.9765 11.0001 17.9843 11.0001 18 11C19.6569 11 21 12.3431 21 14C21 15.6569
            19.6569 17 18 17H17ZM13 21V14.4142L15.2929 16.7071L16.7071 15.2929L12 10.5858L7.29289
            15.2929L8.70711 16.7071L11 14.4142V21H13Z" fill="black"/>
          </svg>
        </button>
        <v-avatar width="96" height="96" :id="user.id" :name="user.name" :url="user.avatar" />
        <input
          ref="uploader"
          @change="handleAvatarChange"
          type="file"
          class="absolute visibility-hidden opacity-0"
        />
      </div>
    </div>
    <div class="mb-4">
      <input
        class="border rounded p-2 w-full"
        type="text"
        placeholder="Full name"
        v-model="form.name"
      />
    </div>
    <div class="mb-4">
      <input
        class="border rounded p-2 w-full"
        type="text"
        placeholder="Your email"
        v-model="form.email"
      />
    </div>
    <button class="w-full bg-black text-white rounded p-2">
      Update profile
    </button>
  </form>
</template>

<script>
import VAvatar from '@/components/Avatar.vue';

export default {
  data: () => ({
    form: {
      name: '',
      email: '',
    },
  }),
  computed: {
    user() {
      return this.$store.getters['user/profile'];
    },
  },
  created() {
    this.form.name = this.user.name;
    this.form.email = this.user.email;
  },
  methods: {
    updateProfile() {
    },
    handleAvatarChange(input) {
      const file = input.target.files[0];
      const formData = new FormData();
      formData.append('avatar', file);

      return this.$fetch('/users/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then(({ user }) => {
          this.$store.dispatch('user/update', user);
        });
    },
  },
  components: { VAvatar },
};
</script>
