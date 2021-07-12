<template>
    <div class="wrapper">
        <div class="nav-bar jd-header-search-box">
            <i id="search-input-left-icon" class="jd-header-icon-fdj"></i>
            <div class="jd-header-search-input">
                <input v-model="value" maxlength="20" name="keyword" id="msKeyWord" type="text"
                       autocomplete="off" :placeholder="placeholder"
                >

            </div>
            <a href="javascript:void(0);" class="jd-header-icon-close"  style="display:none;"></a>
        </div>
    </div>

</template>

<script>
    export default {
        name: "SearchInput",
        props: {
            value: {
                type: String,
                default: ""
            },
            placeholder: {
                type: String,
                default: ""
            }
        }
    }
</script>

<style scoped>
    .wrapper{
        padding: 5px;
        background: #ea5e5e;
    }
    .nav-bar {

        background: #ea5e5e;
        position: relative;
        z-index: 10;

        display: flex;

        height: 35px;
        line-height: 35px;
        text-align: center;
    }
    .jd-header-search-box {
        position: relative;
    }

    .jd-header-icon-fdj {
        display: block;
        width: 18px;
        height: 15px;
        background: url(https://st.360buyimg.com/so/images/search/jd-sprites.png?__inline=) no-repeat -80px 0;
        background-size: 200px;
        margin: 10px 0 0 15px;
        position: relative;
        z-index: 1;
        float: left;
    }
    .jd-header-search-input {
        display: inline-block;
        width: 100%;
        border: none;
        border-radius: 15px;
        height: 35px;
        overflow: hidden;
        background: #f7f7f7;
        font-size: 12px;
        -webkit-box-align: center;
        line-height: 35px;
        position: absolute;
        top: 0;
        left: 0;
        padding-left: 35px;
        padding-right: 10px;
        box-sizing: border-box;
    }
    .jd-header-search-input input {
        border: 0;
        background: 0 0;
        font-size: 15px;
        color: #232326;
        padding-left: 5px;
        box-sizing: border-box;
        -webkit-box-flex: 1;
        height: auto;
        margin: 0 0 0 5px;
        vertical-align: middle;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        line-height: 16px;
    }
    .jd-header-icon-close {
        position: absolute;
        right: -5px;
        width: 35px;
        height: 35px;
        top: 2px;
    }

</style>
