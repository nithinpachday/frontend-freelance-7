// @ts-nocheck
import { useEffect, useState } from "react";
import { Box, Grid, Typography, Divider, CircularProgress } from "@mui/material";
import { Form, Formik } from 'formik'
import { KeyboardArrowLeft, Update } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";

import { useProfile } from "../../hooks/query";
import { TitleWidget, ProfileTemplateWidget, Loading } from "..";
import { Template } from './Template';
import { Address } from './Address'
import { Personal } from './Personal'
import { SocialMediaCmpt } from './SocialMedia'
import { More } from './More'
import { ProfileImages } from './ProfileImages'

import { Alert, Button } from '../../shared'


const INITIAL_VALUES = {
    "name": "",
    "user_name": "",
    "company_name": "",
    "email": "",
    "designation": "",
    "phone": "",
    "websites": "",
    "address": "",
    "password": "",
    "bio": "",
    "invite": "",
    "refferdBy": "",
    "profile_image": "",
    "profie_logo": "",
    "updatedAt": "",
    "createdAt": "",
    "updatedBy": "",
    "qrCode": "",
    "uniqueId": '',
    "url": ''
}


export default function ProfileUpdate() {
    const [socialMediaState, setSocialMediaState] = useState({})
    const { useUpdateProfile, useCreateSocialMedia } = useProfile()
    const [formValue, setFormValue] = useState(INITIAL_VALUES)

    const { useListProfileByUsername } = useProfile()
    const { isSuccess, data, isError, error, isLoading } = useListProfileByUsername
    const { id } = useParams()



    const handleUpdate = async (e: any) => {
        const params = {
            "name": e.name,
            "phone": e.phone,
            "email": e.email,
            "address": e.address,
            "companyName": e.company_name,
            "designation": e.designation,
            "websites": e.websites,
            "bio": e.bio,
            "invite": e.invite,
            "refferdBy": e.refferdBy,
            "userName": e.user_name,
        }
        const response = await useUpdateProfile.mutateAsync(params)

        const sParams = Object.entries(socialMediaState).reduce((acc: any, curr: any) => {
            acc['socialMedias'][curr[0]] = curr[1].map((e: any) => e.name)
            return acc
        }, { userName: e.user_name, socialMedias: {} })

        const socialMediaResponse = await useCreateSocialMedia.mutateAsync(sParams)
    }

    useEffect(() => {
        const fetchResult = async () => {
            const response = await useListProfileByUsername.mutateAsync(id)
            setFormValue(response?.[0])
        }

        if (id) {
            fetchResult().then()
        }
    }, [id])



    return (
        <Box style={{ height: '100vh', flex: 1, width: 'calc(100vw - 250px)' }}>
            <TitleWidget title={`Update Profile - ${id || 'unknown profile'}`} description={'Manage individual profile details'} />
            <Loading loading={isLoading} />
            <Alert isError={isError} error={error} />
            <Box p={2} height={'calc(100vh - 79px)'} overflow={'auto'}>

                {
                    isSuccess &&
                    <Formik initialValues={formValue} onSubmit={handleUpdate} enableReinitialize={true}>
                        <Form >
                            <Grid container style={{ maxWidth: 1000 }} spacing={3}>
                                <Grid item md={6}>
                                    <Box >
                                        <Personal />
                                    </Box>
                                    <Box sx={{ mt: 3 }}>
                                        <Address />
                                    </Box>
                                    <Box sx={{ mt: 3 }}>
                                        <SocialMediaCmpt
                                            socialMediaApiResponse={formValue.socialMedia || []}
                                            socialMediaState={socialMediaState}
                                            setSocialMediaState={setSocialMediaState}
                                        />
                                    </Box>
                                    <Divider sx={{ mt: 2 }} />
                                    <Box sx={{ py: 2 }} gap={1} display={'flex'}>
                                        <Link to={'/dashboard/profile'} style={{ color: 'inherit', textDecoration: 'none' }}>
                                            <Button variant={'contained'} startIcon={<KeyboardArrowLeft />}>
                                                Back
                                            </Button>
                                        </Link>
                                        <Button variant={'contained'}
                                            sx={{ minWidth: 100 }}
                                            startIcon={<Update />}
                                            type={'submit'}>
                                            {(useUpdateProfile.isLoading || useCreateSocialMedia.isLoading) ?
                                                <CircularProgress size={16} sx={{ color: '#fff' }} /> :
                                                "Update"
                                            }
                                        </Button>
                                    </Box>
                                    <Divider />

                                    <Alert
                                        isError={useUpdateProfile.isError || useCreateSocialMedia.isError}
                                        error={useUpdateProfile.error || useCreateSocialMedia.error}
                                        isSuccess={useCreateSocialMedia.isSuccess}
                                        successMessage={'Profile details updated'}
                                    />

                                </Grid>
                                <Grid item md={6}>
                                    <Box mt={0} sx={{ borderLeft: '1px solid #0000001f', pl: 3, height: '100%' }}>
                                        <ProfileImages data={data?.[0]} />
                                        <Box >
                                            <More profileCreatedBy={data?.[0]?.profile_created_by} />
                                        </Box>
                                        <Box sx={{ mt: 3 }}>
                                            <Typography>
                                                Profile Templates
                                            </Typography>
                                            <Divider sx={{ mt: 1 }} />
                                            <Template />

                                        </Box>
                                        <Box sx={{ mt: 3 }}>
                                            <Typography>
                                                Preview
                                            </Typography>
                                            <Divider sx={{ mt: 1, mb: 3 }} />
                                            <ProfileTemplateWidget data={data?.[0]} />
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>}
            </Box >
        </Box >
    )
}



