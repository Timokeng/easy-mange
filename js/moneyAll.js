var app = new Vue({
    el: '#app',
    data(){
        return {
            currentMoney: '0.00',
            yesMoney: {
                bid_number: 0,
                bid_ok_number: 0,
                bid_money: 0,
                get_money: 0
            },
            moneyLists: [{
                time: '2018-10-30',
                bid_number: 0,
                bid_ok_number: 0,
                bid_money: 0,
                get_money: 0
            }],
            hint: '获取更多',
            moreLists: [],
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
                    this.currentMoney = res.body.currentMoney;
                    this.yesMoney = res.body.yesMoney;
                    this.moneyLists = res.body.moneyLists;
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
                    this.moreLists = res.body.moneyLists;
                    this.hint = '获取更多';
                } else{
                    this.hint = '已无更多数据';
                }
            }, res => {
                alert('发生未知错误');
                this.hint = '请稍后再试...';
            });
            this.moneyLists = this.moneyLists.concat(this.moreLists);
            this.moreLists = [];
        },
        out(){
            alert('本应用暂时不支持手动提现，固定周期内系统会自动提现。');
        },
        jump(url){
            window.location.href = url;
        }
    }
});