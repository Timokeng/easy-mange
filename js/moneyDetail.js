var app = new Vue({
    el: '#app',
    data(){
        return {
            details:[{
                id: 1,
                time: '2018-11-1 12:17:10',
                number: '-500',
                status: '已拒绝',
                flow: '支出',
                remark: '提交过于频繁'
            }],
            moreLists: [],
            page: 1,
            showNav: 3
        }
    },
    mounted(){
        this.getList();
    },
    methods: {
        getList(){
            const url = ``;
            this.$http.get(url).then(function(res){
                if(res.body.code === 0){
                    this.details = res.body.details;
                } else{
                    alert(res.body.message);
                }
            }, function(res){
                alert('接口还没写呢！');
            });
        },
        jump(url){
            window.location.href = url;
        }
    }
});