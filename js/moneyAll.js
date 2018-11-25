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
            page: 1,
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
                    this.moneyLists = res.body.moneyLists;
                    if(this.page === 1){
                        this.yesMoney = res.body.moneyLists[0];
                    }
                } else{
                    alert(res.body.message);
                }
            }, function(res){
                alert('接口还没写呢！');
            });
        },
        out(){
            alert('本应用暂时不支持手动提现，固定周期内系统会自动提现。');
        },
        jump(url){
            window.location.href = url;
        }
    }
});