var app = new Vue({
    el: '#app',
    data(){
        return {
            delivers: [{
                id: 1,
                deliver_id: '100861',
                company: '顺丰',
                status: '待发货',
                auctions: [1001, 1002, 1003, 1004, 1005],
                time: '2018-10-30'
            },{
                id: 1,
                deliver_id: '100862',
                company: '顺丰',
                status: '待发货',
                auctions: [1001, 1002, 1003, 1004, 1005],
                time: '2018-10-30'
            },{
                id: 1,
                deliver_id: '100863',
                company: '顺丰',
                status: '待发货',
                auctions: [1001, 1002, 1003, 1004, 1005],
                time: '2018-10-30'
            },{
                id: 1,
                deliver_id: '100864',
                company: '顺丰',
                status: '待发货',
                auctions: [1001, 1002, 1003, 1004, 1005],
                time: '2018-10-30'
            }],
            search_id: '',
            page: 1,
            search_result: [],
            showNav: 2
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
                    this.delivers = res.body.delivers;
                } else{
                    alert(res.body.message);
                }
            }, function(res){
                alert('接口还没写呢！');
            });
        },
        search(){
            if(this.search_id == ''){
                this.show_delivers = this.delivers;
            } else{
                this.search_result = [];
                const len = this.search_id.length;
                this.delivers.forEach(element => {
                    if(element.deliver_id.substr(0, len) == this.search_id){
                        this.search_result.push(element);
                    }
                });
                if(this.search_result.length === 0){
                    alert('没有符合条件的搜索结果');
                } else{
                    this.delivers = this.search_result;
                }
            }
        },
        jump(url){
            window.location.href = url;
        }
    }
});