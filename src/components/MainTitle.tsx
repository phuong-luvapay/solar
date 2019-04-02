import React from "react"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import { useIsMobile } from "../hooks"
import { Box, HorizontalLayout } from "./Layout/Box"
import { PropTypes } from "@material-ui/core"

interface BackButtonProps {
  onClick: () => void
  style?: React.CSSProperties
}

const BackButton = (props: BackButtonProps) => {
  const style = {
    padding: 6,
    fontSize: 32,
    ...props.style
  }
  return (
    <IconButton color="inherit" onClick={props.onClick} style={style}>
      <ArrowBackIcon style={{ fontSize: "inherit" }} />
    </IconButton>
  )
}

interface Props {
  actions?: React.ReactNode
  badges?: React.ReactNode
  hideBackButton?: boolean
  onBack: () => void
  style?: React.CSSProperties
  title: React.ReactNode
  titleColor?: PropTypes.Color
  titleStyle?: React.CSSProperties
}

function MainTitle(props: Props) {
  const isSmallScreen = useIsMobile()
  return (
    <HorizontalLayout alignItems="center" wrap="wrap" style={props.style}>
      <HorizontalLayout alignItems="center" grow={isSmallScreen ? 1 : undefined} maxWidth="100%">
        {props.hideBackButton ? null : <BackButton onClick={props.onBack} style={{ marginLeft: -8, marginRight: 8 }} />}
        <Typography
          variant="h5"
          color={props.titleColor}
          style={{
            flexGrow: 1,
            flexShrink: 1,
            marginRight: 12,
            minWidth: "40%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            ...props.titleStyle
          }}
        >
          {props.title}
        </Typography>
        {props.badges}
      </HorizontalLayout>
      <Box grow style={{ textAlign: "right" }}>
        {props.actions}
      </Box>
    </HorizontalLayout>
  )
}

export default MainTitle