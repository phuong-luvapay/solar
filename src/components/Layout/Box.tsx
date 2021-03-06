import React from "react"
import createBoxStyle, { BoxStyles } from "./createBoxStyle"

type BoxProps = BoxStyles & {
  children: React.ReactNode
  component?: string
  onClick?: () => void
  style?: React.CSSProperties
}

const Box = ({ children, component, onClick, style, ...styleProps }: BoxProps) => {
  const inlineStyle = { ...createBoxStyle(styleProps), ...style }
  const Component = ((component || "div") as any) as React.ComponentType<any>
  return (
    <Component onClick={onClick} style={inlineStyle}>
      {children}
    </Component>
  )
}

interface BoxLayoutProps extends BoxStyles {
  children: React.ReactNode
  inline?: boolean
  style?: React.CSSProperties
}

const HorizontalLayout = ({ children, inline, style, ...styleProps }: BoxLayoutProps) => {
  const effectiveStyle: React.CSSProperties = {
    display: inline ? "inline-flex" : "flex",
    flexDirection: "row",
    width: "100%",
    ...createBoxStyle(styleProps),
    ...style
  }
  return <div style={effectiveStyle}>{children}</div>
}

const VerticalLayout = ({ children, inline, style, ...styleProps }: BoxLayoutProps) => {
  const effectiveStyle: React.CSSProperties = {
    display: inline ? "inline-flex" : "flex",
    flexDirection: "column",
    ...createBoxStyle(styleProps),
    ...style
  }
  return <div style={effectiveStyle}>{children}</div>
}

const AspectRatioBox = ({
  children,
  ratio,
  ...styleProps
}: BoxStyles & { children: React.ReactNode; ratio: string }) => {
  let heightOfWidthPercentage = 100

  try {
    const [hratio, vratio] = ratio.split(":")
    heightOfWidthPercentage = (parseFloat(vratio) / parseFloat(hratio)) * 100

    if (heightOfWidthPercentage <= 0 || isNaN(heightOfWidthPercentage)) {
      throw new Error(`Invalid ratio numbers.`)
    }
  } catch (error) {
    throw new Error(`AspectRatioBox: Bad ratio given: "${ratio}". Expected something like "1:2".`)
  }

  const outerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    ...createBoxStyle(styleProps),
    paddingTop: `${heightOfWidthPercentage}%`
  }
  const fillCompleteContainerStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
  }
  return (
    <div style={outerStyle}>
      <div style={fillCompleteContainerStyle}>{children}</div>
    </div>
  )
}

const FloatingBox = ({ children, ...styleProps }: BoxStyles & { children: React.ReactNode }) => {
  const style: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    ...createBoxStyle(styleProps)
  }
  return <div style={style}>{children}</div>
}

// To circumvent TypeScript name inference bug: <https://github.com/Microsoft/TypeScript/issues/14127>
export { AspectRatioBox, Box, FloatingBox, HorizontalLayout, VerticalLayout }
