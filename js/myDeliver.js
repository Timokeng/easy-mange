var app = new Vue({
    el: '#app',
    data(){
        return {
            delivers: [],
            deliver_id: '',
            hint: '获取更多',
            showNav: 2,
            moreDelivers: []
        }
    },
    mounted(){

    },
    methods: {
        async getMore(){
            this.page++;
            this.hint = '正在获取更多内容';
            const url = `https://private-anon-d7acce3be6-auction17.apiary-mock.com/auctions/seller?status=${this.auction_status}&page=${this.page}`;
            await this.$http.get(url).then(res => {
                if(res.body.code === 0){
                    this.moreAuctions = res.body.auctions;
                    this.hint = '获取更多';
                } else{
                    this.hint = '已无更多数据';
                }
            }, res => {
                alert('发生未知错误');
            });
            this.delivers = this.delivers.concat(this.moreDelivers);
            this.moreDelivers = [];
        },
        search(){
            
        }
    }
});