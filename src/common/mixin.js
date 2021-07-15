import {deBounce} from "./utils";

export const itemLoadListenerMixin = {
    data() {
        return {
            itemLoadListener: null,
            newRefresh: null
        }
    },
    mounted() {

        this.newRefresh = deBounce(this.$refs.scroll.refresh, 100);
        this.itemLoadListener = () => {
            this.newRefresh()
        };
        this.$bus.$on('imgLoad', this.itemLoadListener)
    }
};
export const backTopMixin = {
    data() {
        return {}
    },
    methods: {
        backTop() {
            this.$refs.scroll.scrollTo(0, 0, 500)
        }
    }
};

export const SkuElMixin = {
    data() {
        return {}
    },
    methods: {
        genSkuTree(skuList, productItemVos, initPrice) {
            let totalStock = 0
            let tree = []
            for (let sku of skuList) {
                let k = sku.name
                let k_s = 's' + sku.id
                let v = []
                for (let item of sku.items) {
                    let tempV = {id: item.id, name: item.value}
                    v.push(tempV)
                }
                tree.push({k, k_s, v,largeImageMode: false})
            }
            let list = []
            for (let productItem of productItemVos) {
                totalStock += productItem.stock
                let temp = {id: productItem.productItemId, price: productItem.price * 100, stock_num: productItem.stock}
                for(let sku of productItem.items){
                    temp['s'+sku.skuId] = sku.id
                }
                list.push(temp)
            }
            let result =  {
                tree, list, price: initPrice, stock_num: totalStock, none_sku: false, messages: [
                    {
                        // 商品留言
                        datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
                        multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
                        name: '留言', // 留言名称
                        type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                        required: '0', // 是否必填 '1' 表示必填
                        placeholder: '' // 可选值，占位文本
                    }
                ],
                hide_stock: false
            }
            this.sku = result

        }
    }
}
