import { useNavigate } from 'react-router-dom'
import { Avatar, Menu, MenuItem, Divider } from '@mui/material'

export default function MobileUserMenu({user, anchor, closeMenu}) {
    const navigate = useNavigate()
    const open = Boolean(anchor)
    
    return (
        <Menu 
            anchorEl={anchor} open={open} onClose={closeMenu} 
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            className='mobileUserMenu'
        >
            <MenuItem>
                {user.username}
                <Avatar variant="square" src={user.avatarUrl} style={{marginLeft: "1rem"}}/>
            </MenuItem>
            <Divider/>
            <MenuItem>My Articles</MenuItem>
            <MenuItem>My Comments</MenuItem>
            <MenuItem onClick={() => {navigate("/create-article")}}>Create Article</MenuItem>
            <MenuItem>Log Out</MenuItem>
        </Menu>
    )
}