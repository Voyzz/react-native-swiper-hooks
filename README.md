# react-native-swiper-hooks
## Catalog
- [Description](#description)
- [Demo](#demo)
- [How to use](#use)
- [Properties](#properties)
- [Functions](#functions)

## Description
<span id='description'><span>
> A powerful Swiper hooks component for React Native  
>  
> 为React Native开发的Swiper Hooks组件  
> 
>> Powered by Voyz Shen  
> [Email](18217501371@163.com) /
> [Blog](http://blog.voyz.vip/) /
> [Github](https://github.com/Voyzz) /
> WeChat : voyz_shen1227

---
<span id='demo'><span>
## Demo
### autoplay ↓
![autoplay](https://i.loli.net/2020/09/17/eL7ZEa9VUdSOIRl.gif)
### non-autoplay ↓
![no_autoplay.gif](https://i.loli.net/2020/09/17/Z6B5AtbpCMcIxsq.gif)
### non-loop ↓
![non-loop.gif](https://i.loli.net/2020/09/17/HuBKTni8gXt7eps.gif)

---

## How to use
<span id='use'><span>
- install   
```
npm i react-native-hooks-swiper --save
```

- import  
```
import Swiper from 'react-native-hooks-swiper'
```

- Demo

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
        bounces={false}>
  {_renderList()}
</Swiper>

...
```

---

## Properties
<span id='properties'><span>
![pagination-shower.jpg](https://i.loli.net/2020/09/17/uMnIVfo1KgrslcB.jpg)


### - Basic -
|Prop|Default|Options|Type|Description|
|:---|:--:|:--:|:--:|:---|
|width|[width of screen]|/|Number|Width of the Swiper container|
|||||容器宽度|
|height|[height of screen]|/| Number |Height of the Swiper container|
|||||容器高度|
|boxBackgroundColor|/|/|Color|Background color of the Swiper container|
|||||容器背景颜色|
|initIndex|0|/|Number|Index of the init child|
|||||初始页|
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