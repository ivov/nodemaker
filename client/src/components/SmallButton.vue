<template>
    <button>
        <div class="button">
            <i class="fas fa-times-circle icon" v-if="cancel"></i>
            <i class="fas fa-plus-circle icon" v-else></i>
        </div>
    </button>
</template>

<script>
export default {
  name: 'SmallButton',
  props: ["cancel"]
}
</script>

<style scoped>
button {
    cursor: pointer;
    background: #FF6D5A;
    box-shadow: 0px 6px 4px rgba(0, 0, 0, 0.25);
    border-width: 0;
    padding: .75rem;
    border-radius: 30px;
    color: white;
    font-weight: bold;
    margin-left: .2rem;
}
</style>