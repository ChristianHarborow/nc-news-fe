import { useNavigate } from 'react-router-dom'
import { Avatar, List, ListItem, ListItemText, ListItemButton, Typography } from '@mui/material'

export default function DesktopUserMenu({user}) {
    const navigate = useNavigate()

    return (
        <div style={{position: "fixed", right: "2vw", top: "3rem"}} className='desktopUserMenu'>
        
        <div style={{display: "flex", alignItems: "center", justifyContent: "end"}}>
          <Typography>
            {user.username}
          </Typography>
          <Avatar variant="square" src={user.avatarUrl} style={{marginLeft: "1rem"}}/>
        </div>
        
        <List style={{marginTop: "2rem", backgroundColor: "#465062", color: "white", borderRadius: 10}} disablePadding>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="My Articles"/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
          <ListItemButton>
              <ListItemText primary="My Comments"/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
          <ListItemButton onClick={() => {navigate("/create-article")}}>
              <ListItemText primary="Create Article"/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Log Out"/>
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    )
}