<template>
    <div>
        <h1>메모</h1>
        <!--메모의 id, 작성자, 제목 출력-->
        <table>
            <tr>
                <td>아이디</td>
                <td>작성자</td>
                <td>제목</td>
            </tr>
            <tr v-for="memo in memo" :key="memo.i">
                <td>{{memo.id}}</td>
                <td>{{memo.writer}}</td>
                <!--타이틀을 눌렀을 때 /list/:id 링크로 이동-->
                <td @click="$router.push(`/list/${memo.id}` )">{{memo.title}}</td>
                <!--수정 버튼을 눌렀을 때, updateForm 이동-->
                <td>
                    <button @click="$router.push(`/updateform/${memo.id}` )">수정</button>
                </td>
                <!--삭제 버튼을 눌렀을 때, 삭제할 memo.id를 서버로 전송-->
                <td>
                    <button @click="deletememo(memo.id)">삭제</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            memo: [{
                id: 1,
                title: '첫 번째 메모',
                writer: 'green',
                memo: ''
            }]
        }
    },
    created() {
        //axios를 통해 값을 가져옴
        //this.memo에 가져온 값 넣어줌
        this.$http.get('/api/memo')
        .then((response) => {
            console.log(response.data);
            this.memo = response.data
        })
    },
    methods: {
        deletememo(id) {
            //axios를 통해 id 값을 가진 memo 삭제
            this.$http.delete(`/api/memo/${id}`)
            .then((response) => {
                //값 삭제된 메모배열 다시 할당
                //서버 요청해서 값 삭제됐지만
                //화면에 적용하기 위해서 메모 배열을 재차 들고옴
                this.memo = response.data
            })
        }
    }
}
</script>