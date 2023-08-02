<script setup lang="ts">
import { useChannelStore } from '@/stores/channel';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { type ChannelItem, type ChannelResData } from '@/types/data'
const store = useChannelStore();
const getList = ref<ChannelItem[]>([])
onMounted(async () => {
    const res = await axios.request<ChannelResData>({
        url: 'http://geek.itheima.net/v1_0/channels',
        method: "GET"
    })
    getList.value = res.data.data.channels;
})
</script>
<template>
    <div class="channel-nav">
        <nav class="list">
            <li class="item" :class="{ active: store.channelId === item.id }" v-for="item in getList" :key="item.id"
                @click="store.changeChannel(item.id)">
                {{ item.name }}
            </li>
        </nav>
    </div>
</template>
<style lang="less" scoped>
.channel-nav {
    width: 100%;
}

.list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    li {
        list-style: none;
        flex: 1 1 auto;
        cursor: pointer;
        background: #ccc;
        text-align: center;
        border-radius: 10px;
        width: 90px;
        font-size: 16px;
        padding: 5px;
        margin: 2px;
        &:hover{
            background:#aaa;
        }
    }

}
</style>