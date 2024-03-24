<template>
  <div class="w-full bg-c overflow-hidden h-[63px]">
    <div class="cloud one">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div class="cloud two">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div class="cloud three">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div class="cloud four">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

  </div>
</template>
<style scoped>
:root {
  --sky-primary: rgba(238, 174, 202, 1);
  --sky-secondary: rgba(148, 187, 233, 1);
  --cloud: rgba(255, 255, 255, 1);
}
.bg-c {
  background: rgb(238, 174, 202);
  background: linear-gradient(
    250deg,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
}
.cloud {
  position: relative;
  animation: clouds;
  animation-iteration-count: infinite;
  opacity: 70%;
}

.one {
  top: -5vmin;
  animation-duration: 30s;
  left: -25vw;
}
.two {
  top: 5vmin;
  animation-duration: 30s;
  animation-delay: 2s;
  transform: scale(0.9);
  left: -35vw;
}

.three {
  top: -15vmin;
  left: -35vw;
  animation-duration: 30s;
  animation-delay: 5s;
  transform: scale(1.1);
}

.four {
  top: 45vmin;
  left: -40vw;
  animation-duration: 30s;
  animation-delay: 4s;
  transform: scale(1.2);
}

.cloud div {
  position: absolute;
  background: inherit;
  height: 20vmin;
  width: 20vmin;
  background: white;
  border-radius: 100%;
}

.cloud div:nth-child(1) {
  translate: 0vmin 5vmin;
}

.cloud div:nth-child(2) {
  translate: 15vmin 9vmin;
}

.cloud div:nth-child(3) {
  translate: 10vmin -6vmin;
}

.cloud div:nth-child(4) {
  translate: 28vmin -3vmin;
}

.cloud div:nth-child(5) {
  translate: 34vmin 8vmin;
}

@keyframes clouds {
  100% {
    translate: 100vw;
  }
}
</style>
