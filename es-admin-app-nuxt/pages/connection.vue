<template lang="pug">
    div 
        p {{this.$store.state}}
        p {{this.$swagger}}
        button(@click="$logout('/login')") Disconnect
</template>

<script>
export default {};
</script>
