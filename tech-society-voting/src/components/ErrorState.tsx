export default function ErrorState({message="Something went wrong."}:{message?:string}) {
  return <div className="panel empty" style={{color:"#ff8298"}}>{message}</div>;
}
