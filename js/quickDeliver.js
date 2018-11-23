var app = new Vue({
    el: '#app',
    data(){
        return {
            deliver: {
                company: '',
                id: '',
                auctions: []
            },
            options1: [
                {name:'中通快递', value:'中通快递'},
                {name:'申通快递', value:'申通快递'},
                {name:'圆通快递', value:'圆通快递'},
                {name:'韵达快递', value:'韵达快递'},
                {name:'邮政快递', value:'邮政快递'},
                {name:'顺丰快递', value:'顺丰快递'},
            ],
            options2: [
                {name:'香港一二三四五六七八', id: 1001},
            ],
            success: false,
            showChoose: false
        }
    },
    mounted(){
        this.getInfo();
    },
    methods: {
        onSubmit(){
            const result = this.validate();
            if(result){
                const url = ``;
                this.$http.post(url, this.deliver, {emulateJSON:true}).then(res => {
                    if(res.body.code === 0){
                        this.success = true;
                    } else{
                        alert(res.body.message);
                    }
                }, res => {
                    alert(res.body.message);
                });
            }
        },
        validate(){
            if(this.deliver.company === ''){
                alert('请选择快递公司');
                return false;
            } else if(this.deliver.id == ''){
                alert('请输入快递单号');
                return false;
            } else if(this.deliver.auctions.length === 0){
                alert('至少选择一个拍品');
                return false;
            } else{
                return true;
            }
        },
        getInfo(){
            const url = ``;
            this.$http.get(url).then(function(res){
                if(res.body.code === 0){
                    this.options2 = res.body.auctions;
                } else{
                    alert(res.body.message);
                }
            }, function(res){
                alert('发生未知错误');
                //window.location.href = 'myDeliver.html';
            });
        },
        chooseAuctions(e){
            if(e.target.checked){
                this.deliver.auctions.push(e.target.value);
            } else{
                this.deliver.auctions.splice(this.deliver.auctions.indexOf(e.target.value), 1);
            }
        },
        reset(){
            this.deliver = {
                company: '',
                id: '',
                auctions: []
            };
            success = false;
            showChoose = false;
        },
        jump(url){
            window.location.href = url;
        }
    },
    computed: {
        editStatus(){
            if(this.showChoose === false){
                return '编辑';
            } else{
                return '完成';
            }
        }
    }
})