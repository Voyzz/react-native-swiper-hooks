import React, { useState, useEffect, useRef } from 'react';

export default function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  // temp code
  const tmpCode = ()=>{
    // new Promise((resolve,reject)=>{
    //     setCurrIndex(_currIndex);
    //     tmpMidIndex = _currIndex;
    //     resolve();
    // }).then(()=>{
    //     setAndroidMask(true);
    // }).then(()=>{
    //     _scrollView.current.scrollTo({
    //         y:direction!='row' ?
    //             height : 0,
    //         x:direction=='row' ?
    //             width :  0,
    //         animated: false
    //     })
    //     setChildren(rebulidChildren(_currIndex));
    // }).then(()=>{
    //     setAndroidMask(false);
    // })
  }
}