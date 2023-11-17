<template>
    <div class="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[100] bg-cus">
        <div class="loader">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    </div>
</template>
<script>
export default {
    name: 'Loading'
}
</script>
<style scoped>
.bg-cus {
    background-color: rgba(0, 0, 0, 0.8);
}


.loader {
    display: flex;
    justify-content: center;
    align-items: center;
}

.loader>div {
    width: 3px;
    height: 48px;
    background: #b8e8ea;
    margin: 3px;
    animation: wave 1.05s linear infinite;
    border-radius: 20px;
}

.loader>div:nth-child(2) {
    animation-delay: 0.15s;
}

.loader>div:nth-child(3) {
    animation-delay: 0.3s;
}

.loader>div:nth-child(4) {
    animation-delay: 0.45s;
}

.loader>div:nth-child(5) {
    animation-delay: 0.6s;
}

.loader>div:nth-child(6) {
    animation-delay: 0.75s;
}

.loader>div:nth-child(7) {
    animation-delay: 0.9s;
}

.loader>div:nth-child(8) {
    animation-delay: 1.05s;
}

@keyframes wave {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1);
    }

    100% {
        transform: scale(0);
    }
}
</style>