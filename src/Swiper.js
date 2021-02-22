/*
react-native-hooks-swiper
a powerful Swiper hooks component for React Native
powered by Voyz Shen
*/

'use strict';

import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
// import { Event } from '@ctrip/crn';

// ----- static variables -----
const { height:HEIGHT,width:WIDTH } = Dimensions.get('window');
const _isAndroid = Platform.OS == 'android';
// ------ temp props -------
let tmpMidIndex = 0;                                                                        //存储当前页码
let inScroll = false;                                                                       //手动滚动中
let currScrollDistance = 0;                                                                 //当前滚动位置

export default function Swiper(props) {
    // ----------------- input props -----------------
    const {
        width=WIDTH,                                                                        //[参数]容器宽度
        height=HEIGHT,                                                                      //[参数]容器高度
        childWidth=null,                                                                    //[参数]子元素宽度
        childHeight=null,                                                                   //[参数]子元素宽度
        boxBackgroundColor='#ffffff00',                                                     //[参数]容器背景色
        direction='row',                                                                    //[参数]滚动方向
        scrollEnabled=true,                                                                 //[参数]是否可以手动滚动
        bounces=true,                                                                       //[参数]弹性拉动(IOS)
        loop=true,                                                                          //[参数]是否循环
        autoplay=true,                                                                      //[参数]是否自动播放
        autoplayGapTime=3,                                                                  //[参数]自动播放间隔时间
        autoplayDirection=true,                                                             //[参数]自动播放方向
        children=[],                                                                        //[参数]子元素
        animated=true,                                                                      //[参数]翻页动画
        minOffset = 10,                                                                     //[参数]翻页最小偏移量
        initIndex=0,                                                                        //[参数]初始页
        scrollToIndex=null,                                                                 //[参数]滚动至某页
        scrollToIndexWithAnimate=false,                                                     //[参数]参数控制滚动至某页时是否开启动画
        scrollDuration=null,                                                                //[参数]翻页滚动持续时间(Android)
        showPagination=true,                                                                //[参数]是否显示页码器
        paginationPosition='bottom',                                                        //[参数]页码器位置
        paginationOffset=5,                                                                 //[参数]页码器偏移量
        paginationUnselectedSize=6,                                                         //[参数]页码点未选中态大小
        paginationSelectedSize=10,                                                          //[参数]页码点选中态大小
        paginationUnselectedColor='#fff',                                                   //[参数]页码点未选中态颜色
        paginationSelectedColor='#000',                                                     //[参数]页码点选中态颜色
        onPaginationChange,                                                                 //[回调函数]页码改变
        onScrollBeginDrag,                                                                  //[回调函数]开始滚动
        onScrollEndDrag,                                                                    //[回调函数]结束滚动
        getScrollDistance,                                                                  //[回调函数]滚动距离
        getChildrenOnPageinationChange,
        // paramsControlScroll=false,
        transformMode=false,                                                                //[参数]尺寸变化模式
        transformModeMinSize=HEIGHT,                                                        //[参数]变换小尺寸参数
        transformModeMaxSize=HEIGHT,                                                        //[参数]变换大尺寸参数
        getTransformModeCurrSize                                                            //[回调函数]获取当前尺寸
    } = props ;
    // -------------------- props ---------------------
    const childrenLength = children.length,                                                 //子元素数量
          contentOffsetList = new Array(childrenLength).fill(1).map((child,index)=>{        //偏移量列表
            return direction == 'row' ?
                  (!!childWidth ? childWidth : width)*index
                : (!!childHeight ? childHeight : height)*index;
          });

    // rebuild children Array
    const rebulidChildren = (midIndex) => {
        let newChildrenArr = [];
        let preIndex =  midIndex==0 ? childrenLength-1 : midIndex-1,
            nextIndex = midIndex==childrenLength-1 ? 0 : midIndex+1,
            supIndex = nextIndex==childrenLength-1 ? 0 : nextIndex+1;

        newChildrenArr.push(children[preIndex]);
        newChildrenArr.push(children[midIndex]);
        newChildrenArr.push(children[nextIndex]);
        if((direction == 'row' && !!childWidth)||(direction == 'column' && !!childHeight)){
            !!children[supIndex] && newChildrenArr.push(children[supIndex]);
        }

        return newChildrenArr;
    }

    // -------------------- States --------------------
    const [currIndex, setCurrIndex] = useState(initIndex)                         //current index
    const [currChildren, setChildren] = useState(rebulidChildren(initIndex))      //current children
    const [androidMask, setAndroidMask] = useState(false)                         //mask for avoiding flash
    const [intervalPause, setIntervalPause] = useState(false)                     //stop useInterval

    // -------------------- Refs ----------------------
    const _scrollView = useRef(null);
    const _container = useRef(null);


    // ------------------- Effects --------------------
    useEffect(() => {
        if(transformMode){
            _container.current.setNativeProps({height:transformModeMinSize})
        }

        const _oneStep = direction == 'row' ?
            (!!childWidth ? childWidth : width)
            : (!!childHeight ? childHeight : height);
        // scroll to init child
        setTimeout(() => {
            let _scrollConfig = {
                y:direction!='row' ?
                    (loop ? _oneStep : contentOffsetList[initIndex])
                    : 0,
                x:direction=='row' ?
                    (loop ? _oneStep :  contentOffsetList[initIndex])
                    : 0,
                animated: false
            }
            if(!!scrollDuration) _scrollConfig.duration = scrollDuration
            _scrollView.current && _scrollView.current.scrollTo && _scrollView.current.scrollTo(_scrollConfig)
        }, 0);
    }, []);

    // custom hook: useInterval
    function useInterval(callback, delay) {
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        });

        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    // useInterval
    useInterval(()=>{
        if(autoplay && !intervalPause){
            onAutoplay();
        }
    },intervalPause ? null : autoplayGapTime*1000)

    // scroll to the page by param
    useEffect(() => {
        if(typeof scrollToIndex == 'number'){
            // loop
            if(loop){
                inScroll = true;
                setIntervalPause(true);
                setChildren(rebulidChildren(scrollToIndex));
                setCurrIndex(scrollToIndex)
                setTimeout(() => {
                    inScroll = false;
                    setIntervalPause(false);
                }, autoplayGapTime*1000);
            }
            // without loop
            else{
                inScroll = true;
                setIntervalPause(true);
                setCurrIndex(scrollToIndex);

                let _scrollConfig = {
                    x:direction == 'row' ? contentOffsetList[scrollToIndex] : 0,
                    y:direction != 'row' ? contentOffsetList[scrollToIndex] : 0,
                    animated:scrollToIndexWithAnimate
                }
                if(!!scrollDuration) _scrollConfig.duration = scrollDuration;
                _scrollView.current && _scrollView.current.scrollTo && _scrollView.current.scrollTo(_scrollConfig);
                setTimeout(() => {
                    inScroll = false;
                    setIntervalPause(false);
                }, autoplayGapTime*1000);
            }
        }
    }, [scrollToIndex])


    // ------------------ functions -------------------

    // on scroll begin
    const _onScrollBeginDrag = (event) => {
        !!onScrollBeginDrag && onScrollBeginDrag(event);
        inScroll = true;
        setIntervalPause(true);

        // 【安卓】防止滑动停止未触发_onScrollEndDrag
        // _isAndroid && setTimeout(() => {
        //     if(true){
        //         inScroll = false;
        //         _onScrollEndDrag(null,currScrollDistance)
        //     }
        // }, 3500);
    }

    // on scroll end
    const _onScrollEndDrag = (event,autoplayOffset) => {
        !!onScrollEndDrag && !!event && onScrollEndDrag(event)
        if(!autoplayOffset) {
            inScroll = false;
            setIntervalPause(false);
        }
        const _offset = (!!autoplayOffset || autoplayOffset == 0)  ?
                autoplayOffset
                : event.nativeEvent.contentOffset[direction == 'row' ? 'x' : 'y'];
        const _oneStep = direction == 'row' ?
                (!!childWidth ? childWidth : width)
                : (!!childHeight ? childHeight : height);
        let _currIndex = currIndex;

        if(!inScroll){
            // without loop
            if(!loop){
                const _diffVal = direction == 'row' ?
                  width - (!!childWidth ? childWidth : width)
                : height - (!!childHeight ? childHeight : height);

                if(_currIndex == childrenLength-1){
                    if(_offset <= _currIndex*_oneStep-minOffset-_diffVal) _currIndex -= 1;
                }else{
                    if(_offset<=0) _currIndex = 0;
                    else if(_offset >= contentOffsetList[childrenLength-1]) _currIndex = childrenLength-1;
                    else if(_offset >= _currIndex*_oneStep+minOffset) _currIndex += 1;
                    else if(_offset <= _currIndex*_oneStep-minOffset) _currIndex -= 1;
                }

                let _scrollConfig = {
                    x:direction == 'row' ? contentOffsetList[_currIndex] : 0,
                    y:direction != 'row' ? contentOffsetList[_currIndex] : 0,
                    animated
                }
                if(!!scrollDuration) _scrollConfig.duration = scrollDuration;
                _scrollView.current && _scrollView.current.scrollTo && _scrollView.current.scrollTo(_scrollConfig);

                setCurrIndex(_currIndex);
            }
            // loop
            else{
                if(_offset >= _oneStep + minOffset){
                    if(_currIndex == childrenLength-1) _currIndex = 0;
                    else _currIndex += 1;

                    let _scrollConfig = {
                        x:direction == 'row' ? _oneStep*2 : 0,
                        y:direction != 'row' ? _oneStep*2 : 0,
                        animated
                    }
                    if(!!scrollDuration) _scrollConfig.duration = scrollDuration;
                    _scrollView.current && _scrollView.current.scrollTo && _scrollView.current.scrollTo(_scrollConfig);
                    setCurrIndex(_currIndex);
                }else if(_offset <= _oneStep - minOffset){
                    if(_currIndex == 0) _currIndex = childrenLength-1;
                    else _currIndex -= 1;

                    let _scrollConfig = {
                        x:0,
                        y:0,
                        animated
                    }
                    if(!!scrollDuration) _scrollConfig.duration = scrollDuration;
                    _scrollView.current && _scrollView.current.scrollTo && _scrollView.current.scrollTo(_scrollConfig);
                    setCurrIndex(_currIndex);
                }
                // updata children
                setTimeout(() => {
                    tmpMidIndex = _currIndex;
                    _isAndroid && setAndroidMask(true);

                    let _scrollConfig = {
                        y:direction!='row' ?
                            _oneStep : 0,
                        x:direction=='row' ?
                            _oneStep :  0,
                        animated: false
                    }
                    if(!!scrollDuration) _scrollConfig.duration = scrollDuration;
                    _scrollView.current && _scrollView.current.scrollTo && _scrollView.current.scrollTo(_scrollConfig);

                    setChildren(rebulidChildren(_currIndex));
                    _isAndroid && setTimeout(() => {
                        setAndroidMask(false);
                    }, 100);
                }, 500);
            }

            // callback
            !!onPaginationChange && onPaginationChange(_currIndex);
            !!getChildrenOnPageinationChange && getChildrenOnPageinationChange(currChildren);
        }
    }

    const _onScroll = (event)=>{
        const scrollDistance = event.nativeEvent.contentOffset.x + event.nativeEvent.contentOffset.y;
        currScrollDistance = scrollDistance;
        !!getScrollDistance && getScrollDistance(scrollDistance)
        if(!!transformMode) {
            const _currContainerSize = (scrollDistance / width) * (transformModeMaxSize - transformModeMinSize) + transformModeMinSize;
            !!getTransformModeCurrSize && getTransformModeCurrSize(parseInt(_currContainerSize))
            _container.current.setNativeProps({
                style:{
                    height:_currContainerSize
                }
            })
        }
    }

    // on autoplay
    const onAutoplay = () => {
        const _oneStep = direction == 'row' ?
            (!!childWidth ? childWidth : width)
            : (!!childHeight ? childHeight : height);
        let _autoplayOffset,_currIndex = currIndex;

        // without loop
        if(!loop){
            if(_currIndex == 0 && !autoplayDirection) return;
            if(_currIndex == childrenLength-1 && autoplayDirection) return;
            _autoplayOffset = autoplayDirection ?
                contentOffsetList[_currIndex]+minOffset*2
                : contentOffsetList[_currIndex]-minOffset*2
            _onScrollEndDrag(null,_autoplayOffset)
        }
        // loop
        else{
            _autoplayOffset = autoplayDirection ? _oneStep+minOffset*2 : _oneStep-minOffset*2;
            _onScrollEndDrag(null,_autoplayOffset)
        }
    }

    // -------------------- render ---------------------
    const styles = createStyle();

    // pagination shower
    const paginationShower = () => {
        let posStyle = {};
        switch (paginationPosition) {
            case 'bottom':
                posStyle = {
                    bottom:0+paginationOffset,left:0,right:0,
                    height:paginationSelectedSize,
                    flexDirection: 'row'
                };
                break;
            case 'left':
                posStyle = {
                    left:0+paginationOffset,bottom:0,top:0,
                    width:paginationSelectedSize,
                    flexDirection: 'column'
                };
                break;
            case 'top':
                posStyle = {
                    top:0+paginationOffset,left:0,right:0,
                    height:paginationSelectedSize,
                    flexDirection: 'row'
                };
                break;
            case 'right':
                posStyle = {
                    right:0+paginationOffset,bottom:0,top:0,
                    width:paginationSelectedSize,
                    flexDirection: 'column'
                };
                break;
            default:
                break;
        }
        return (
            <View style={[styles.paginationContainer,posStyle]}>
                {
                    new Array(childrenLength).fill(1).map((e,i)=>{
                        return (
                            <View style={{
                                width:i==currIndex ?
                                    paginationSelectedSize : paginationUnselectedSize,
                                height:i==currIndex ?
                                    paginationSelectedSize : paginationUnselectedSize,
                                borderRadius:i==currIndex ?
                                    paginationSelectedSize : paginationUnselectedSize,
                                backgroundColor:i==currIndex ?
                                    paginationSelectedColor : paginationUnselectedColor,
                                marginLeft:paginationPosition == 'top' || paginationPosition == 'bottom' ?
                                    (i!=0 ? 5 : 0) : 0,
                                marginTop: paginationPosition == 'left' || paginationPosition == 'right' ?
                                    (i!=0 ? 5 : 0) : 0,
                                }} key={i}/>
                        )
                    })
                }
            </View>
        )
    }

    return (
        <View style={[styles.outermostContainer,{backgroundColor:boxBackgroundColor}]} ref={_container}>
            {/* scroll view */}
            <ScrollView style={{
                            width:width,
                            height:transformMode ? transformModeMaxSize : height
                        }}
                        horizontal={direction == 'row' ? true : false}
                        scrollEnabled={scrollEnabled}
                        bounces={bounces}
                        onScrollBeginDrag={_onScrollBeginDrag}
                        onScrollEndDrag={_onScrollEndDrag}
                        // onMomentumScrollEnd={_onScrollEndDrag}
                        onScroll={_onScroll}
                        ref = {_scrollView}
                        scrollEventThrottle = {1}
                        showsHorizontalScrollIndicator={false}>
                { loop ? currChildren : children}
            </ScrollView>
            {/* mask (android) */}
            { _isAndroid && !!androidMask && <View style={styles.androidMask}>{children[tmpMidIndex]}</View> }
            {/* pagination shower */}
            { !!showPagination && paginationShower() }
        </View>
    )
}

const createStyle = ()=>{
    return StyleSheet.create({
        outermostContainer:{
            position: 'relative',
            overflow: 'hidden',
        },
        androidMask:{
            position: 'absolute',
            top:0,
            left:0,
            bottom:0,
            right:0,
        },
        paginationContainer:{
            justifyContent: 'center',
            alignItems: 'center',
            position:'absolute',
            zIndex:99
        }
    })
}