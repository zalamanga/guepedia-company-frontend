<template>
  <div class="account-page">
    <account/>
  </div>
</template>

<script>
// @ is an alias to /src
import Account from "@/components/AccountPage/Account/Account.vue";

export default {
  name: "Home",
  components: {
    Account
  },
};
</script>
