import React from "react"
import grey from "@material-ui/core/colors/grey"

const TestnetBadge = (props: { style?: React.CSSProperties }) => {
  const style: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
    top: -4,
    padding: "0.1rem 0.3rem",
    background: grey[500],
    borderRadius: 3,
    color: "white",
    fontSize: "10px",
    lineHeight: "14px",
    textTransform: "uppercase",
    ...props.style
  }
  return <div style={style}>Testnet</div>
}

export default TestnetBadge
