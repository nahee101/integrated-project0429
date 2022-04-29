<template>
    <div>
        <h1>{{memo.title}}</h1>
        <p>{{memo.memo}}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            memo: {}
        }
    },
    created() {
        // axios를 통해 값을 가져옴
        //단, id값에 따른 1개의 값
        //값을 받아와 this.memo에 저장한다.
        //route.params.id를 통해 memo의 id 값을 전달한다.
        this.$http.get(`/api/memo/${this.$route.params.id}`)
        .then((response) => {
            this.memo = response.data
        })
    }
}
</script>