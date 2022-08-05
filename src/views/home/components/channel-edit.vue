<template>
    <div class="channel-edit">
        <!-- My Channel -->
        <van-cell :border="false">
            <div slot="title" class="title-text">我的频道</div>
            <van-button class="edit-btn" type="danger" size="mini" round plain @click="isEdit = !isEdit">{{ isEdit ?
                    '完成' : '编辑'
            }}
            </van-button>
        </van-cell>
        <van-grid :gutter="10" class="my-grid">
            <van-grid-item class="grid-item" v-for="(channel, index) in myChannels" :key="channel.id"
                @click="onMyChannelClick(channel, index)">
                <van-icon slot="icon" name="clear" v-show="isEdit && !fixedChannels.includes(channel.id)"></van-icon>
                <span slot="text" class="text" :class="{ active: index === active }">{{ channel.name }}</span>
            </van-grid-item>
        </van-grid>
        <!-- /My Channel -->

        <!-- Channel Recomang -->
        <van-cell :border="false">
            <div slot="title" class="title-text">频道推荐</div>
        </van-cell>
        <van-grid :gutter="10" class="recomand-grid">
            <van-grid-item v-for="channel in recomandChannels" :key="channel.id" :text="channel.name" class="grid-item"
                @click="onAddChannel(channel)" icon="plus" />
        </van-grid>
        <!-- /Channel Recomang -->
    </div>
</template>

<script>
import { mapState } from 'vuex'

import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { setItem } from '@/utils/storage'

export default {
    data() {
        return {
            allChannels: [],  // All Channel Lits
            isEdit: false,    // Is Edit Mode
            fixedChannels: [0] // Not of Edit Object
        }
    },
    computed: {
        ...mapState(['user']),
        recomandChannels() {
            const recomandList = this.allChannels.filter((channel) => {
                return !this.myChannels.find((myChannel) => {
                    return myChannel.id === channel.id
                })
            })

            return recomandList
        }
    },
    props: {
        myChannels: {
            type: Array,
            required: true
        },
        active: {
            type: Number,
            required: true
        }
    },

    created() {
        this.loadAllChannels()
    },
    methods: {
        // Get All of Channel List
        async loadAllChannels() {
            try {
                const { data } = await getAllChannels()
                this.allChannels = data.data.channels
            } catch (err) {
                this.$toast('Fail to Get Channel List')
            }
        },

        async onAddChannel(channel) {
            this.myChannels.push(channel)
            // Login Ok
            if (this.user) {

                try {
                    const { data } = await addUserChannel({
                        id: channel.id,
                        seq: this.myChannels.length
                    })
                } catch (err) {
                    console.log('456', err);
                }
            } else { // Before Login 
                // Reserve in Local
                setItem('News_title', this.myChannels)
            }

        },
        async deleteChannel(channel) {

            try {
                // Login 
                if (this.user) {
                    const res = deleteUserChannel(channel.id)
                    console.log(123, res)
                } else { //Before Login
                    setItem('News_title', this.myChannels)
                }
            } catch (err) {
                this.$toast("Do again")
            }


        },

        // Delete Or Turn to 
        onMyChannelClick(channel, index) {

            // Edit Mode
            if (this.isEdit === true) {
                if (this.fixedChannels.includes(channel.id)) {
                    return this.$toast('No Delete Please')
                }

                this.myChannels.splice(index, 1)

                if (index <= this.active) {
                    this.$emit('update-active', this.active - 1, true)
                }
                // Delete Mode
                this.deleteChannel(channel)
            } else {
                this.$emit('update-active', index, false)
            }
        }
    }
}
</script>

<style scoped lang="less">
.channel-edit {
    padding: 85px 0;

    .edit-btn {
        width: 104px;
        height: 48px;
        font-size: 26px;
        color: #f85959;
        border: 1px solid #f85959;
    }

    .title-text {
        font-size: 32px;
        color: #333;
    }

    /deep/.grid-item {
        width: 160px;
        height: 86px;

        .van-grid-item__content {
            background-color: #f4f5f6;
            white-space: nowrap;

            .van-grid-item__text,
            .text {
                font-size: 28px;
                color: #222;
                margin-top: 0;
            }

            .van-grid-item__icon-wrapper {
                position: unset;
            }
        }
    }

    /deep/.my-grid {
        .grid-item {
            .van-icon-clear {
                position: absolute;
                right: -10px;
                top: -10px;
                font-size: 30px;
                color: #cacaca;
                z-index: 2;
            }

            .active {
                color: red;
            }
        }

    }

    /deep/.recomand-grid {
        .grid-item {
            .van-grid-item__content {
                flex-direction: row;

                .van-icon-plus {
                    font-size: 28px;
                    margin-right: 6px;
                }
            }

        }


    }
}
</style>>