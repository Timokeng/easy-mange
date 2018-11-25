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
            hint: '获取更多',
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
        async getMore(){
            this.page++;
            this.hint = '正在获取更多内容';
            const url = ``;
            await this.$http.get(url).then(res => {
                if(res.body.code === 0){
                    this.moreLists = res.body.details;
                    this.hint = '获取更多';
                } else{
                    this.hint = '已无更多数据';
                }
            }, res => {
                alert('发生未知错误');
                this.hint = '请稍后再试...';
            });
            this.details = this.details.concat(this.moreLists);
            this.moreLists = [];
        },
        jump(url){
            window.location.href = url;
        }
    }
});