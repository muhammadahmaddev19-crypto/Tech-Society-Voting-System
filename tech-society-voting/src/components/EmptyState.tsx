export default function EmptyState({text="No projects found."}:{text?:string}) {
  return <div className="panel empty">{text}</div>;
}
