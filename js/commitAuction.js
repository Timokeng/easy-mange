var app = new Vue({
    el: "#app",
    data() {
        return {
            auction: {
                title: '',
                price: 100,
                time: '',
                description: '',
                url_list: []
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
            day: 1,
            hour: '10:00:00',
            auction_id: '',
            showNav: 1,
            dialogImageUrl: '',
            dialogVisible: false,
            url: '',
            success: false,
            fileList: []
        }
    },
    mounted(){
        this.judgeOperation();
    },
    methods: {
        judgeOperation: function(){
            const str = location.search.substr(1);
            if(str != ''){
                this.auction_id = str.split('=')[1];
                this.getInfo();
            }
        },
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
            } else if(this.auction.url_list.length == 0){
                alert('至少上传一张图片');
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
            this.$http.post(this.url, this.auction, {emulateJSON:true}).then(function(res){
                if(res.body.code === 0){
                    this.auction_id = res.body.auction_id;
                    this.success = true;
                } else{
                    alert(res.body.message);
                }
            }, function(res){
                alert('发生未知错误');
            });
        },
        getInfo: function(){
            const url = `https://private-anon-7e2c2a2bc1-auction17.apiary-mock.com/auctions/${this.auction_id}`;
            this.$http.get(url, {auction_id:this.auction_id}).then(function(res){
                if(res.body.code === 0){
                    const currentAuction = res.body.auction;
                    this.auction.title = currentAuction.title;
                    this.auction.price = currentAuction.price;
                    this.auction.description = currentAuction.description;
                }
            }, function(res){
                alert('出现未知错误');
                jump('myCommit.html');
            });
        },
        handleExceed(){
            alert('每件拍品最多附带十张图片，请仔细考虑');
        },
        handleRemove(file) {
            this.auction.url_list.splice(this.auction.url_list.indexOf(file.url), 1);
        },
        handleSuccess(res) {
            if(res.body.code === 0){
                this.auction.url_list.push(res.body.url);
            } else{
                alert('上传图片失败请重传');
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        reset: function(){
            this.auction = {
                title: '',
                price: 100,
                time: '',
                description: '',
            };
            this.day = 1;
            this.hour = '10:00:00';
            this.url = '';
            this.success = false;
            this.auction_id = '';
        },
        jump: function(url){
            window.location.href = url;
        }
    }
});
