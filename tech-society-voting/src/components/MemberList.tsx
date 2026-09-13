export default function MemberList({members}:{members:{name:string;rollNo:string}[]}) {
  return <div className="member-list">{members.map((m,i)=><div className="member" key={i}><div className="avatar">{m.name.slice(0,2).toUpperCase()}</div><div><div style={{fontSize:12}}>{m.name}</div><small>{m.rollNo}</small></div></div>)}</div>;
}
