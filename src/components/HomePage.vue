<script setup>
import { defineComponent, h,ref } from "vue";
import { NIcon, useMessage } from "naive-ui";
import { RouterLink,useRoute,useRouter } from "vue-router";
import { BasketOutline, BeerOutline, BookmarkOutline, BugOutline, CaretDownOutline, CubeOutline, FastFoodOutline, GridOutline, IceCreamOutline, PeopleOutline, SettingsOutline, SettingsSharp, WalkOutline, WatchOutline } from "@vicons/ionicons5";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  HomeOutline as HomeIcon,
  FastFoodOutline as FastFoodIcon,
  PhoneLandscapeOutline as PhoneLandscapeIcon,
} from "@vicons/ionicons5";
import isMounted from "vooks/lib/life-cycle/use-is-mounted";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const routes = useRoute();
const message = useMessage();
const collapsed=ref(false);
const userinfo = JSON.parse(localStorage.login);
const menuOptions = [
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: "mystate",
          params: {
            lang: "zh-CN"
          }
        }
      },
      { default: () => "回家" }
    ),
    key: "go-back-home",
    icon: renderIcon(HomeIcon)
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: "dinning",
          params: {
            lang: "zh-CN"
          }
        }
      },
      { default: () => "吃饭" }
    ),
    key: "eating",
    icon: renderIcon(BeerOutline),
    children:[
      {
        type: "group",
        label: "吃点儿什么呢？",
        key: "whattoeat",
        children:[
          {
            label: () => h(
            RouterLink,
            {
              to: {
              name: "dinning",
              params: {
              lang: "zh-CN"
              }
              }
            }, { default: () => "食堂" }),
            key: "dinning",
            icon: renderIcon(IceCreamOutline)
          },
          {
            label: () => h(
            RouterLink,
            {
              to: {
              name: "market",
              params: {
              lang: "zh-CN"
              }
              }
            },{ default: () => "超市" }),
            key: "market",
            icon: renderIcon(BasketOutline)
          },
        ]
      }
    ]
  },  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: "takeaway",
          params: {
            lang: "zh-CN"
          }
        }
      },
      { default: () => "代取" }
    ),
    key: "proxypick",
    icon: renderIcon(WalkOutline),
    children:[
      {
        type: "group",
        label: "贵重物品请勿代取",
        key: "whattotake",
        children:[
          {
            label: () => h(
            RouterLink,
            {
              to: {
              name: "proxypick",
              params: {
              lang: "zh-CN"
              }
              }
            }, { default: () => "外卖" }),
            key: "takeaway",
            icon: renderIcon(FastFoodOutline)
          },
          {
            label: () => h(
            RouterLink,
            {
              to: {
              name: "express",
              params: {
              lang: "zh-CN"
              }
              }
            },{ default: () => "快递" }),
            key: "express",
            icon: renderIcon(CubeOutline)
          },
        ]
      }
    ]
  },  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: "dinning",
          params: {
            lang: "zh-CN"
          }
        }
      },
      { default: () => "卖二手" }
    ),
    key: "second-hand",
    disabled: true,
    icon: renderIcon(WatchOutline)
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: "settings",
          params: {
            lang: "zh-CN"
          }
        }
      },
      { default: () => "设置" }
    ),
    key: "second-hand",
    icon: renderIcon(SettingsOutline)
  },

];
const options=[
        {
          label:  () => h(
      RouterLink,
      {
        to: {
          name: "admin",
          params: {
            lang: "zh-CN"
          }
        }
      },
      { default: () => "进入管理员页面" }
    ),
          key: "1"
        },
];




function handleBack() {
        message.info("[onBack]");
      };

function  getParam(){
        message.info(
          routes.params.id,
          {
            keepAliveOnHover: true
          }
        );
      };



const  defaultExpandedKeys= ['eating','proxypick'];
defineComponent({
  setup() {
    return {

      activeKey: ref<string | null>(null),

      menuOptions,
      renderMenuLabel(option) {
        if ("href" in option) {
          return h(
            "a",
            { href: option.href, target: "_blank" },
            option.label
          );
        }
        return option.label;
      },
      renderMenuIcon(option) {
        if (option.key === "sheep-man")
          return true;
        if (option.key === "food")
          return null;
        return h(NIcon, null, { default: () => h(BookmarkOutline) });
      },
       expandIcon() {
        return h(NIcon, null, { default: () => h(CaretDownOutline) });
      },
      
  }}
});

</script>  
  
  <template>
    <n-message-provider>
        <n-page-header subtitle="给你带来更便捷的校园生活" @back="handleBack">
    <n-grid :cols="5">
      <n-gi>
        <n-statistic label="我的订单" value="125 集" />
      </n-gi>
      <n-gi>
        <n-statistic label="我的代取" value="22 位" />
      </n-gi>
      <n-gi>
        <n-statistic label="正在进行中的订单" value="36 次" />
      </n-gi>
      <n-gi>
        <n-statistic label="正在进行中的代取" value="83 个" />
      </n-gi>
      <n-gi>
        <n-statistic label="当前总代取数" value="2,346 个" />
      </n-gi>
    </n-grid>
    <template #title >
      <a
        href="https://github.com/seydlitz2185/"
        style="text-decoration: none; color: inherit"
      >你好，{{userinfo.name}}</a>
    </template>

    <template #avatar>
      <img alt="logo" class="logo"
        src="../assets/images/hamburger-48.png"
      />
    </template>
    <template #extra>
      <n-space>
        <n-button>刷新</n-button>
        <n-dropdown :options="options" placement="bottom-start">
          <n-button :bordered="false" style="padding: 0 4px">
            ···
          </n-button>
        </n-dropdown>
      </n-space>
    </template>
    <template #footer>
    </template>
  </n-page-header>

  <n-space vertical>
    <n-switch v-model:value="collapsed" />
    <n-layout has-sider="true" embedded >
      <n-layout-sider       
      bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
        content-style="padding: 10px;">
      <n-menu 
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :default-expanded-keys="defaultExpandedKeys"
        :render-label="renderMenuLabel"
        :render-icon="renderMenuIcon"
        :expand-icon="expandIcon"
        class="menu" 
        @update:value="handleUpdateValue" />
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;">
        <routerView></routerView>
    </n-layout-content>
  </n-layout>
  </n-space>
</n-message-provider>
      

  </template>
  


  <style>
@media (min-width : 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  .menu{
    height: 600px;
  }




}
  </style>