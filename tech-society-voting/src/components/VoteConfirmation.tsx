export default function VoteConfirmation({projectName}:{projectName:string}) {
  return <div className="notice" style={{borderColor:"rgba(38,236,174,.25)",color:"#68efbd",marginBottom:16}}>
    ✓ Vote submitted successfully for <strong>{projectName}</strong>. Your vote is permanently locked.
  </div>;
}
