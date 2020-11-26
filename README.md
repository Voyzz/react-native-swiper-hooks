<div align=center><img align="center" src="https://i.loli.net/2020/09/19/LYfW67IyjgZoNKq.png" width="250px"/></div>

[![](https://img.shields.io/badge/Wechat--informational?style=social&logo=wechat)](https://i.loli.net/2020/09/19/jHmZskwtUTF9oOh.png)
[![](https://img.shields.io/badge/Github--informational?style=social&logo=github)](https://github.com/Voyzz)
[![](https://img.shields.io/badge/Gmail--informational?style=social&logo=gmail)](voyzshen@gmail.com)
[![](https://img.shields.io/badge/Blog--informational?style=social&logo=micro.blog)](http://blog.voyz.vip/)
[![](https://img.shields.io/badge/ReactNative--informational?style=social&logo=react)](https://reactnative.cn/)

![](https://img.shields.io/npm/v/react-native-swiper-hooks?style=for-the-badge)
![](https://img.shields.io/npm/dt/react-native-swiper-hooks?style=for-the-badge)
![](https://img.shields.io/github/last-commit/Voyzz/react-native-swiper-hooks?style=for-the-badge)
![](https://img.shields.io/npm/l/react-native-swiper-hooks?style=for-the-badge)
![](https://img.shields.io/github/languages/top/Voyzz/react-native-swiper-hooks?style=for-the-badge)

# Hello, folks! <img src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" width="30px"> 


> 🦄 **This is a powerful Swiper hooks component for React Native**    
>> ✨ 为React Native开发的Swiper Hooks组件     
>    
> 📚 **Welcomes to provide your valuable comments or suggestions by 'Issues' or my contact information**    
>> ✨ 欢迎通过”issues“或我的联系方式，为我提供宝贵意见   
>  
> 👨🏻‍💻 **Powered by Voyz Shen**    
> ✨ Shanghai Jiao Tong University, Ctrip   

## Catalog
> - [How to use](#howtouse)
> - [Demo](#demo)
> - [Properties](#properties)
> - [Functions](#functions)
> - [Versions](#versions)  

---

<span id='howtouse'><span>
## How to use

- installation   
```
npm i react-native-swiper-hooks --save
```

- import  
```
import Swiper from 'react-native-swiper-hooks'
```

- use it

```
...
const _renderList = ()=>{
  let listData = [
      {
        title:'1',
        bgColor:'#f00'
      },
      {
        title:'2',
        bgColor:'#0f0'
      },
      {
        title:'3',
        bgColor:'#00f'
      },
    ]
    return (
      listData.map((item,idx)=>{
        return (
          <View style={{width:WIDTH,height:300,backgroundColor:item.bgColor,justifyContent: 'center',alignItems: 'center'}} key={idx}>
              <Text>{item.title}</Text>
          </View>
        )
      })
    )
}

...

<Swiper height={300}
        autoplay={true}
        loop={true}
        showPagination={true}
        >
  {_renderList()}
</Swiper>

...
```

- update   
```
npm update react-native-swiper-hooks
```   

---


<span id='demo'><span>
## Demo
### autoplay ↓
![autoplay](https://i.loli.net/2020/09/21/nMUlKg74HGNZvLA.gif)  
```
height={300}
paginationSelectedColor={'#CCFF66'}
autoplay={true}
loop={true}
showPagination={true}
direction={'row'}
```
  
### non-autoplay ↓
![non_autoplay.gif](https://i.loli.net/2020/09/21/4TLBZhYnAXatsbI.gif)  
```
height={300}
paginationSelectedColor={'#CCFF66'}
autoplay={false}
loop={true}
showPagination={true}
direction={'row'}
```
  
### non-loop ↓
![non_loop.gif](https://i.loli.net/2020/09/21/YuJKb8o2HpFkaqv.gif)  
```
height={300}
paginationSelectedColor={'#CCFF66'}
autoplay={false}
loop={false}
showPagination={true}
direction={'row'}
```
  
### vertical scrolling ↓
![vertical_scrolling.gif](https://i.loli.net/2020/09/21/jT5hrXuE84Nlzc3.gif)  
```
height={300}
paginationPosition={'left'}
paginationSelectedColor={'#CCFF66'}
autoplay={true}
loop={true}
showPagination={true}
direction={'column'}
```
 
### diff Size ↓
![swiper5.gif](https://i.loli.net/2020/09/21/65pIUGaq8xOJD2C.gif)
```
height={300}
childWidth={WIDTH-100}
paginationSelectedColor={'#CCFF66'}
autoplay={true}
loop={true}
showPagination={true}
direction={'row'}

(child:{width=WIDTH-100})
```  

### init Index ↓
![swipe6.gif](https://i.loli.net/2020/09/21/cvTPy31z6YgLXmE.gif)  

```
height={300}
initIndex={1}
showPagination={false}
```
---

<span id='properties'><span>
## Properties
![pagination-shower.jpg](https://i.loli.net/2020/09/17/uMnIVfo1KgrslcB.jpg)


### - Basic -
|Prop|Default|Options|Type|Description|
|:---|:--:|:--:|:--:|:---|
|width|[width of screen]|/|Number|Width of the Swiper container|
|||||容器宽度|
|height|[height of screen]|/| Number |Height of the Swiper container|
|||||容器高度|
|childWidth|/|/|Number|Width of the child component（when width of container and child component）|
|||||子元素宽度（当子元素宽度与容器宽度不同时传此参数）|
|childHeight|/|/|Number|Width of the child component（when height of container and child component）|
|||||子元素高度（当子元素宽度与容器高度不同时传此参数）|
|boxBackgroundColor|/|/|Color|Background color of the Swiper container|
|||||容器背景颜色|
|initIndex|0|/|Number|Index of the init child|
|||||初始页|
|scrollToIndex|0|/|Number|scroll to the child|
|||||参数控制滚动至某子元素|
|direction|'row'|'row' / 'column'|String|Direction of the scrolling  |
|||||滚动方向|
|minOffset|10|/|Number| Threshold of scroll distance for page turning|
|||||翻页的滚动阈值|
|autoplay|true|true / false|Boolean|Enable autoplay |
|||||是否自动播放|
|loop|true|true / false|Boolean|Enable loop mode |
|||||是否循环滚动|
|autoplayGapTime|3|/|Number|second between autoplay transitions|
|||||自动播放时间间隔|
|autoplayDirection|true|true / false|Boolean| Enable forward direction when autoplay|
|||||是否正向自动播放|
|scrollEnabled|true|true / false|Boolean|Enable hand-rolling |
|||||是否可以手动滚动|
|animated|true|true / false|Boolean|Enable smooth scrolling animation|
|||||是否开启滚动动画|
|bounces|true|true / false|Boolean|Enable pull flexibly when you scroll to the head and tail|
|||||到达首尾时是否可以弹性拉动一截|

### - Pagination -
|Prop|Default|Options|Type|Description|
|:---|:--:|:--:|:--:|:---|
|showPagination|true|true / false|Boolean|Enable pagination shower |
|||||是否显示页码器|
|paginationDirection|'bottom'|'bottom' / 'top' / 'left' / 'right' |String|Position of the pagination|
|||||页码器位置|
|paginationOffset|5|/|Number|Distance between pagination shower and side|
|||||页码器距边距离|
|paginationUnselectedSize|6|/|Number|Size of the point (non-current)|
|||||提示点大小（非当前页）|
|paginationSelectedSize|10|/|Number|Size of the point (current)|
|||||提示点大小（当前页）|
|paginationUnselectedColor|'#FFFFFF'|/|Color|Color of the point (non-current)|
|||||提示点颜色（非当前页）|
|paginationSelectedSize|'#000000'|/|Color|Color of the point (current)|
|||||提示点颜色（当前页）|


## Functions
<span id='functions'><span>
### - callback -
|Func|Params|Type| Description |
|:---|:--:|:--:|:---|
|onPaginationChange|index|Number|Retrun the index of current page when it changes|
||||页码改变时返回当前页码索引|
|onScrollBeginDrag|nativeEvent|Object|Callback on scroll begin drag|
||||开始拖动时的回调函数|
|onScrollEndDrag| nativeEvent | Object |Callback on scroll end drag|
||||结束拖动时的回调函数|
|getScrollDistance| / | int |get distance on scrolling|
||||获取手动滚动距离|
|getChildrenOnPageinationChange| / | int |get JSX Array of Children|
||||获取JSX数组|


<span id='versions'><span>
## Versions
> - **v1.2.5**   
>> [性能优化] 手动滚动时暂停自动滚动的计时器
>
> - **v1.2.4**   
>> [性能优化] 避免scrollToIndex与自动播放的冲突
>
> - **v1.2.3**   
>> [添加新方法] getChildrenOnPageinationChange获取JSX数组    
>
> - **v1.2.2**   
>> [添加新参数] scrollToIndex参数控制滚动至某子元素    
>
> - **v1.2.1**   
>> [添加新方法] 获取手动滚动距离   
>> [性能优化] 优化手动滚动时与自动滚动的冲突   
>
> - **v1.2.0**   
>> [添加新功能] 允许swiper内子元素尺寸与容器尺寸不同   
>
> - v1.1.3   
>> [性能优化] 修复页码器更新延迟  
>> [bug修复] 修复循环模式下翻页至页尾时的bug 
>
> - v1.1.2 
>> 更新文档  
>   
> - v1.1.1 
>> [bug修复] 修复安卓循环模式下翻页闪屏问题  
>   
> - **v1.1.0** 
>> 组件项目迁移
