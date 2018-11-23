var app = new Vue({
    el: "#app",
    data() {
        return {
            auctions: [],
            options: [
                {name: '全部', value: 'all'},
                {name: '审核中', value: 'shelve_applying'},
                {name: '已下架', value: 'unshelve'},
                {name: '拍卖中', value: 'biding'},
                {name: '拍卖结束', value: 'biding_end'}
            ],
            page: 1,
            auction_status: 'all',
            showNav: 1,
            hint: '获取更多',
            moreAuctions: []
        }
    },
    mounted(){
        this.getList();
    },
    methods: {
        getList(){
            this.page = 1;
            const url = `https://private-anon-d7acce3be6-auction17.apiary-mock.com/auctions/seller?status=${this.auction_status}&page=${this.page}`;
            this.$http.get(url).then(function(res){
                if(res.body.code === 0){
                    this.auctions = res.body.auctions;
                } else{
                    alert(res.body.message);
                }
            }, function(res){
                alert('发生未知错误');
            });
        },
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
            this.auctions = this.auctions.concat(this.moreAuctions);
            this.moreAuctions = [];
        },
        simpleTitle(title){
            if(title.length >= 14){
                return title.substr(0, 14) + '...';
            } else{
                return title;
            }
        },
        showStatus(status){
            if(status === 'shelve_applying'){
                return '审核中';
            } else if(status === 'unshelve'){
                return '已下架';
            } else if(status === 'biding'){
                return '拍卖中';
            } else{
                return '已截拍';
            }
        },
        toChange(id){
            window.location.href = `commitAuction.html?auction_id=${id}`;
        },
        jump(url){
            window.location.href = url;
        }
        /*function(){
            this.$http.post('', this.auction, {emulateJSON:true}).then(function(res){
                window.location.href='success.html';
            }, function(res){
                alert('上传数据时出现错误，请重试');
            });
        }*/
    },
});
