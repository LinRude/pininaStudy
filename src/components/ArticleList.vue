<script setup lang="ts">
import axios from 'axios';
import { ref, watch } from 'vue';
import { useChannelStore } from '@/stores/channel';
import { type ArticleItem, type ArticleResData } from '@/types/data';
import imgJpg from '@/assets/img.jpg';
const imgImage = ref(imgJpg);
const store = useChannelStore();
const articles = ref<ArticleItem[]>([]);
watch(() => store.channelId, async () => {
    const res = await axios.request<ArticleResData>({
        url: 'http://geek.itheima.net/v1_0/articles',
        method: 'GET',
        params: {
            channel_id: store.channelId,
            timestamp: Date.now()
        }
    })
    articles.value = res.data.data.results;
}, {
    immediate: true
})
</script>
<template>
    <div class="article-list">
        <div class="article-item" v-for="item in articles" :key="item.art_id">
            <p class="title">
                {{ item.title }}
            </p>
            <div class="img-box">
                <img :src="item.cover.images ? item.cover.images[0] : imgImage" alt="" />
            </div>

            <div class="info">
                <span>{{ item.aut_name }}</span>
                <span>{{ item.comm_count }}评论</span>
                <span>{{ item.pubdate }}</span>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.article-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .article-item {
        width: 440px;
        height: 450px;
        margin: 2px;

        .title {
            text-align: center;
            font-weight: bold;
            
        }

        .img-box {
            img {
                width: 100%;
                height: 350px;
                object-fit: cover;
            }
        }

        .info {
            display: flex;
            justify-content:space-around;
            align-items: center;
        }
    }
}</style>