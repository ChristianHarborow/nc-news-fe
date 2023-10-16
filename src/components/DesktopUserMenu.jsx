import { Avatar, List, ListItem, ListItemText, ListItemButton, Typography } from '@mui/material'

export default function DesktopUserMenu({user}) {
    return (
        <div style={{position: "fixed", right: "2vw", top: "3rem"}} className='desktopUserMenu'>
        
        <div style={{display: "flex", alignItems: "center"}}>
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
          <ListItemButton>
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