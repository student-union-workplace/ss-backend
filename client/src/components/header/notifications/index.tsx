import {Box, Popover} from "@mui/material";
import {useMemo} from "react";
import {NotificationItem} from "./components/NotificationItem.tsx";

type NotificationsProps = {
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: (anchorEl: HTMLButtonElement | null) => void;
    open: boolean
}
export const Notifications = ({setAnchorEl, open, anchorEl}: NotificationsProps) => {
    const id = open ? 'simple-popover' : undefined;
    const handleClose = () => {
        setAnchorEl(null);
    };

    const notificationsData = useMemo(() => {
        return [
            {title: "Козырный втуз", type: "event", created_at: new Date()},
            {title: "Сделать презентацию", type: "deadline", created_at: new Date()},
            {title: "Общая планерка ПБ", type: "activity", created_at: new Date()},
            {title: "Придумать 1000 названий для меро", type: "task", created_at: new Date()},
            {title: "Козырный втуз", type: "event", created_at: new Date()},
            {title: "Сделать презентацию", type: "deadline", created_at: new Date()},
        ]
    }, [])

    return (<Popover
            id={id}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            anchorEl={anchorEl}
            /*sx={{position: 'absolute', top: "-10rem", left: "120px"}}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 245, left: 1050 }}*/
        >
            <Box sx={{paddingBlock: '10px', width: '450px', maxHeight: '270px', overflowY: 'auto'}}>
                {notificationsData.map((item) => {
                    return <NotificationItem item={item} key={item.title}/>
                })}
            </Box>
        </Popover>

    )
}