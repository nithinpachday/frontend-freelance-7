import { Box, Divider, Paper, Typography } from "@mui/material";
import { Button } from "../../../shared";
import { EmailOutlined, LocalPhoneOutlined, LocationOnOutlined } from "@mui/icons-material";

//@ts-ignore
import noImage from '../../../assets/images/no-image.jpg'

export default function Mars(props: any) {
    const { data = {} }: { data?: any } = { ...props }
    return (
        <Box
            display={'flex'}
            height={'100%'}
            flexDirection={'column'}
            alignItems={'center'}
            sx={{
                p: 3,
                background: 'url("https://i.pinimg.com/originals/bb/97/83/bb97835a27950cce02af362ca1aaad66.jpg")',
                backgroundSize: 'cover',
            }}
        >
            <Box display={'flex'} justifyContent={'space-between'}>
                <Paper variant="outlined" sx={{ borderRadius: '10%', height: 100, width: 100, overflow: 'hidden' }}>
                    <img src={data.profile_image || noImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Paper>
            </Box>
            <Box mt={2}>
                <Typography variant="h6" sx={{ fontWeight: 600 }} align={'center'} color={'white'}>
                    {data.name || 'Unknown'}
                </Typography>
                <Typography sx={{ ml: '-2px' }} align={'center'} color={'white'}>
                    {data.designation || 'Unknown'} @ {data.company_name || 'Unknown'}
                </Typography>
            </Box>
            <Box mt={2} >
                <Button sx={{ borderRadius: 30, background: '#e65c2a' }} variant={'contained'} >
                    Share
                </Button>
                <Button sx={{ borderRadius: 30, ml: 1, background: '#e65c2a' }} variant={'contained'} >
                    Download
                </Button>
            </Box>

            <Box mt={2} width={'100%'} >
                <Divider sx={{ mb: 2, background: 'white' }} />
                <Property name={'Email'} icon={EmailOutlined} value={data.email || 'Unknown'} />
                <Property name={'Phone'} icon={LocalPhoneOutlined} value={data.phone || 'Unknown'} />
                <Property name={'Address'} icon={LocationOnOutlined} value={data.address || 'Unknown'} />
            </Box>
        </Box>
    )
}


function Property(props: any) {
    const { name, value, icon: Icon }: { name: string, value: any, icon: any } = { ...props }
    return (
        <Box display={'flex'} gap={0.5} mb={1} sx={{ color: 'white' }}>
            <Icon sx={{ mt: 0.5 }} color={'white'} />
            <Typography sx={{ whiteSpace: 'pre-line' }} color={'white'}>
                {value}
            </Typography>
        </Box>
    )
}

const imageLink = "https://top10tale.com/wp-content/uploads/2017/03/beautiful-face-1-1.jpg"