<template>
    <button>
        <div class="button hvr-icon-forward">
            <div>{{text}}</div>
            <i class="fas fa-forward icon hvr-icon"></i>
        </div>
    </button>
</template>

<script>
export default {
  name: 'ForwardButton',
  props: ["text"]
}
</script>

<style scoped>
button {
    cursor: pointer;
    background: #FF6D5A;
    box-shadow: 0px 6px 4px rgba(0, 0, 0, 0.25);
    border-width: 0;
    padding: 1rem;
    border-radius: 30px;
    color: white;
    font-weight: bold;
    width: 15rem;
}

/* Icon Forward */
.hvr-icon-forward {
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.1s;
}
.hvr-icon-forward .hvr-icon {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.1s;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.hvr-icon-forward:hover .hvr-icon, .hvr-icon-forward:focus .hvr-icon, .hvr-icon-forward:active .hvr-icon {
  -webkit-transform: translateX(4px);
  transform: translateX(4px);
}
</style>