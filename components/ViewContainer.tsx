type Props = {
  children: React.ReactNode
}

function ViewContainer({ children }: Props) {
  return <div className="view-container">{children}</div>
}

export default ViewContainer
