import { Box, Divider, Grid } from "@mui/material";
import { Formik, Form } from "formik";

import { useProfile } from '../../hooks/query'
import { Alert, Button, TextField } from "../../shared";
import { SocialMediaCmpt } from './SocialMedia'
import { useState } from "react";

const socialMediaInitialValues = {
    Websites: [],
    Twitter: [],
    Instagram: [],
    Facebook: [],
    LinkedIn: [],
    Skype: [],
}


export function BasicForm(props: any) {
    const { onClose }: { onClose: any } = { ...props }
    const { useCreateProfile, useCreateSocialMedia, useCreateProfileUpload } = useProfile()
    const [socialMedia, setSocialMedia] = useState(socialMediaInitialValues)
    const [logoImage, setLogoImage] = useState(new Blob())
    const [profileImage, setProfileImage] = useState(new Blob())



    const INITIAL_VALUES = {
        "name": "",
        "phone": "",
        "email": "",
        "address": "",
        "companyName": "",
        "designation": "",
        "websites": "",
        "bio": "",
        "invite": "",
        "refferdBy": "",
        "activeTheme": "Earth"
    }


    const handleImageStateUpdate = (e: any) => {
        console.log(e.currentTarget.files, e.currentTarget.id, e.currentTarget.name)
        if (e.target.id === 'Logo') {
            setLogoImage(e.target.files[0])
        }

        if (e.target.id === 'Picture') {
            setProfileImage(e.target.files[0])
        }
    }

    const handleFormSubmit = async (e: any) => {
        const params = { ...e, invite: '', refferdBy: 'test' }
        const response = await useCreateProfile.mutateAsync(params)

        const sParams = Object.entries(socialMedia).reduce((acc: any, curr: any) => {
            acc['socialMedias'][curr[0]] = curr[1].map((e: any) => e.name)
            return acc
        }, { userName: response.userName, socialMedias: {} })
        const socialMediaResponse = await useCreateSocialMedia.mutateAsync(sParams)

        for (const item of ['logo', 'image']) {
            const formData = new FormData()
            formData.append('files', item === 'logo' ? logoImage : profileImage)
            formData.append('userName', response.userName)
            formData.append('imageType', item === 'logo' ? 'Logo' : 'Image')
            const imageUploadResult = await useCreateProfileUpload.mutateAsync(formData)
        }
    }


    return (
        <Box>
            <Formik
                validateOnChange={true}
                validateOnBlur={true}
                initialValues={INITIAL_VALUES}
                onSubmit={handleFormSubmit}>
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField name={'name'} label={'Name'} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name={'companyName'} label={'Company Name'} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name={'designation'} label={'Designation'} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider sx={{ my: 1 }} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField name={'phone'} label={'Phone'} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField name={'email'} label={'Email'} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name={'address'} label={'Address'} multiline rows={3} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider sx={{ my: 1 }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name={'bio'} label={'Bio'} multiline rows={3} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name={'logo'} label={'Logo'} type={'file'} ignoreFormik onChange={handleImageStateUpdate} />
                                </Grid>
                                <Grid item xs={12}>

                                    <TextField name={'profilePic'} label={'Picture'} type={'file'} ignoreFormik onChange={handleImageStateUpdate} />
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item xs={6} >
                            <Box sx={{ borderLeft: '1px solid var(--border-color)', ml: 1, pl: 2, height: '100%' }}>
                                <SocialMediaCmpt
                                    socialMediaState={socialMedia}
                                    setSocialMediaState={setSocialMedia}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ ml: -2, mr: -2, mt: 2 }} />
                            <Box mt={2} display={'flex'} justifyContent={'flex-end'} gap={1}>
                                <Button variant={'contained'} type={'submit'}>
                                    {useCreateProfile.isLoading ? 'Creating...' : 'Create Profile'}
                                </Button>
                                <Button variant={'outlined'} onClick={onClose} >
                                    Cancel
                                </Button>
                            </Box>
                            <Alert
                                successMessage={'Profile Created'}
                                isSuccess={useCreateProfile.isSuccess}
                                isError={useCreateProfile.isError}
                                error={useCreateProfile?.error} />
                        </Grid>
                    </Grid>

                </Form>
            </Formik>
        </Box>
    )
}