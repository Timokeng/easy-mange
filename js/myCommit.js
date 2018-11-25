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
            moreAuctions: []
        }
    },
    mounted(){
        this.getList();
    },
    methods: {
        getList(){
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
