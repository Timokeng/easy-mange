var app = new Vue({
    el: "#app",
    data() {
        return {
            auction: {
                title: '',
                price: 100,
                time: '',
                description: '',
            },
            options1: [
                {name: '今天', value: 1},
                {name: '明天', value: 2},
                {name: '后天', value: 3}
            ],
            options2: [
                {name: '10:00', value:'10:00:00'},
                {name: '11:00', value:'11:00:00'},
                {name: '12:00', value:'12:00:00'},
                {name: '13:00', value:'13:00:00'},
                {name: '14:00', value:'14:00:00'},
                {name: '15:00', value:'15:00:00'},
                {name: '16:00', value:'16:00:00'},
                {name: '17:00', value:'17:00:00'},
                {name: '18:00', value:'18:00:00'},
                {name: '19:00', value:'19:00:00'},
                {name: '20:00', value:'20:00:00'},
                {name: '21:00', value:'21:00:00'},
                {name: '22:00', value:'22:00:00'},
                {name: '23:00', value:'23:00:00'},
                {name: '24:00', value:'24:00:00'},
            ],
            day: 0,
            hour: '',
            url: '',
            auction_id: '',
            success: false,
            fileList: []
        }
    },
    methods: {
        onSubmit: function(){
            const result = this.validate();
            if(result){
                this.commitAuction();
            }
        },
        validate: function(){
            if(this.auction.title == 0){
                alert('请输入拍品标题');
                return false;
            } else if(this.auction.title.length > 30){
                alert('起修改标题内容，标题长度不能超过30字');
                return false;
            } else if(this.auction.price <= 0){
                alert('请输入有效价格');
                return false;
            } else if(this.day == 0){
                alert('请选择截拍日');
                return false;
            } else if(this.hour == 0){
                alert('请选择截拍点');
                return false;
            } else if(this.auction.description == 0){
                alert('请输入拍品描述');
                return false;
            } else{
                const date = new Date();
                const month = date.getMonth() + 1;
                const day = date.getDate() + this.day - 1;
                const endDate = date.getFullYear() + '-' + month + '-' + day;
                this.auction.time = endDate + ' ' + this.hour;
                return true;
            }
        },
        commitAuction: function(){
            if(this.auction_id){
                this.url = `https://private-anon-7e2c2a2bc1-auction17.apiary-mock.com/auctions/${this.auction_id}`;
            } else{
                this.url = `https://private-anon-7e2c2a2bc1-auction17.apiary-mock.com/auctions`;
            }
            console.log(this.auction);
            this.$http.post(this.url, this.auction, {emulateJSON:true}).then(function(res){
                this.success = true;
            }, function(res){
                alert('上传数据时出现错误，请重试');
            });
        },
        reset: function(){
            this.auction = {
                title: '',
                price: '',
                time: '',
                description: '',
            };
            this.day = 0;
            this.hour = '';
            this.success = false;
            this.auction_id = '';
        },
        jump: function(url){
            window.location.href = url;
        }
    }
});
