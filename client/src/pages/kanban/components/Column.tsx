import {Box, Paper, Typography} from "@mui/material";
import {Task} from "./Task/Task.tsx";

type ColumnProps = {
    tasks: {
        title: string;
        user_id: string;
        id: string;
        deadline: Date;
        status: 'open' | 'at_work' | 'review' | 'closed',
        description?: ''
    }[],
    title: string;
    color: string;
    titleColor: string
}

export const Column = ({title, color, tasks, titleColor}: ColumnProps) => {

    const hex2rgba = (hex, alpha = 1) => {
        const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
        return `rgba(${r},${g},${b},${alpha})`;
    };

    const {innerHeight: height} = window;
    console.log(height)
    return (
        <Box>
            <Paper sx={{
                backgroundColor: hex2rgba(color, 0.25),
                textAlign: 'start',
                paddingLeft: '12px',
                paddingBlock: '2px',
                marginBottom: '20px',
                width: '256px'
            }}>
                <Typography sx={{
                    color: titleColor,
                    fontSize: '14px',
                    fontWeight: '500'
                }}>{title}{`(${tasks.length})`}</Typography>
            </Paper>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                maxHeight: height-270,
                overflowY: 'auto',
                marginRight: '5px'
            }}>
                {tasks.map((task) => {
                    return <Task item={task} color={color} key={task.id}/>
                })}
            </Box>
        </Box>
    )
}