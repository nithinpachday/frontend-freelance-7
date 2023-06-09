import { Box, Divider, Grid, Typography } from "@mui/material";
import { TextField } from "../../shared";

export function More(props: any) {
    //@ts-ignore
    const { profileCreatedBy, profileRefferedyBy: profileRefereedBy } = { ...props }
    return (
        <Box>
            <Typography>
                Profile Info
            </Typography>
            <Divider sx={{ mt: 1 }} />
            <Grid container spacing={3} sx={{ mt: 0.5 }}>
                <Grid item xs={12}>
                    <TextField label={'Bio'} multiline minRows={5} name={"bio"} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label={'Username'} name={"user_name"} disabled />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label={'Password'}
                        disabled value={"********************"}
                        name={"password"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField label={'Unique Id'} name={"uniqueId"} disabled />
                </Grid>
                <Grid item xs={12}>
                    <TextField label={'URL'} name={"url"} disabled />
                </Grid>
                <Grid item xs={12}>
                    <TextField label={'Invite'} name={"invite"} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label={'Profile Referred By'} name={"refferdBy"} />

                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'body2'} color={'text.secondary'}>
                        Profile Created By
                    </Typography>
                    {
                        profileCreatedBy ?
                            <Typography sx={{ fontWeight: 600 }} color={'text.secondary'}>
                                {profileCreatedBy}
                            </Typography> :
                            <Typography variant="body1" color={'text.secondary'}>
                                -
                            </Typography>
                    }

                </Grid>
            </Grid>
        </Box>
    )
}