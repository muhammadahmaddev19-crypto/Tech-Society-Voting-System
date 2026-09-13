export default function LoadingState({text="Loading..."}:{text?:string}) {
  return <div className="panel empty"><div className="live" style={{justifyContent:"center",marginBottom:12}}>LIVE</div>{text}</div>;
}
