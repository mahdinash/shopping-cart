<template>
    <div>
        <div class="text-left">
            <button type="button" class="btn btn-primary btn-sm" @click="newProduct"> + مورد جدید </button>
        </div>

        <form>

            <div v-for="p,i in products" class="row my-2">
                <div class="col-md-4">
                    <label for="product"> نام محصول </label>
                    <input type="text" class="form-control" id="product" v-model="p.name">
                </div>

                <div class="col-md-3">
                    <label for="price"> قیمت </label>
                    <input type="number" class="form-control" id="price" v-model="p.price">
                </div>

                <div class="col-md-2">
                    <label for="discount"> درصد تخفیف </label>
                    <input type="number" class="form-control" id="discount" v-model="p.discount">
                </div>

                <div class="col-md-2">
                    <label for="count"> تعداد </label>
                    <input type="number" class="form-control" id="count" v-model="p.count">
                </div>

                <div class="col-md-1 align-self-center">
                    <button type="button" class="btn btn-danger btn-sm" @click="removeProduct(i)"> حذف </button>
                </div>
            </div>

        </form>
        <table class="table table-bordered mt-4">
            <thead>
                <tr>
                    <th> # </th>
                    <th> محصول </th>
                    <th> قیمت اولیه </th>
                    <th> قیمت با تخفیف </th>
                    <th> قابل پرداخت </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="p,i in products">
                    <td> {{i+1}} </td>
                    <td> {{p.name}} </td>
                    <td> {{p.price | toman}} </td>
                    <td> {{cost(p.price, p.discount) | toman}} </td>
                    <td> {{cost(p.price, p.discount) * p.count | toman}} </td>
                </tr>
                <tr>
                    <td align="center" colspan="3"> قابل پرداخت نهایی </td>
                    <td align="center" colspan="2"> {{totalPayable | toman}} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products : [{
                name : null,
                price : 0,
                discount : 0,
                count : 1,
            }]
        }
    },
    filters : {
        toman : function (value) {
            return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' تومان' : 0;
        }
    },
    computed : {
        totalPayable : function () {
            let products = this.products;
            let sum = 0;
            for (var i = 0; i < products.length; i++) {
                sum += this.cost(products[i].price, products[i].discount) * products[i].count;
            }
            return sum;
        }
    },
    methods : {
        newProduct : function () {
            this.products.push({
                name : null,
                price : 0,
                discount : 0,
                count : 1,
            });
        },
        removeProduct : function (index) {
            this.products.splice(index, 1);
        },
        cost : function (price, discount) {
            return price - (price * (discount/100) );
        }
    }
}
</script>

<style scoped>
</style>
