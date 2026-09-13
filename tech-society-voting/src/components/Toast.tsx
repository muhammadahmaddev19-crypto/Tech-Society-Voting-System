"use client";
export default function Toast({message}:{message:string}) {
  return <div style={{position:"fixed",right:18,bottom:18,zIndex:200}} className="notice">{message}</div>;
}
